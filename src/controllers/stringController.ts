import { Request, Response } from 'express';
import { StringAnalyzer } from '../utils/stringAnalyzer';
import { NaturalLanguageParser } from '../utils/naturalLanguageParser';
import { InMemoryStorage } from '../storage/inMemoryStorage';
import { AppError } from '../middleware/errorHandler';
import { StringRecord, FilterOptions } from '../types';

const storage = new InMemoryStorage();

export class StringController {
    static async createString(req: Request, res: Response) {
        const { value } = req.body;

        if (storage.exists(value)) {
            throw new AppError(409, 'String already exists in the system');
        }

        const properties = StringAnalyzer.analyze(value);
        const record: StringRecord = {
            id: properties.sha256_hash,
            value,
            properties,
            created_at: new Date().toISOString(),
        };

        storage.add(record);
        res.status(201).json(record);
    }

    static async getString(req: Request, res: Response) {
        const { string_value } = req.params;
        const decodedValue = decodeURIComponent(string_value);

        const record = storage.get(decodedValue);
        if (!record) {
            throw new AppError(404, 'String does not exist in the system');
        }

        res.status(200).json(record);
    }

    static async getAllStrings(req: Request, res: Response) {
        const filters: FilterOptions = {};

        if (req.query.is_palindrome !== undefined) {
            filters.is_palindrome = req.query.is_palindrome === 'true';
        }
        if (req.query.min_length !== undefined) {
            filters.min_length = parseInt(req.query.min_length as string);
        }
        if (req.query.max_length !== undefined) {
            filters.max_length = parseInt(req.query.max_length as string);
        }
        if (req.query.word_count !== undefined) {
            filters.word_count = parseInt(req.query.word_count as string);
        }
        if (req.query.contains_character !== undefined) {
            filters.contains_character = req.query.contains_character as string;
        }

        const allRecords = storage.getAll();
        const filteredRecords = StringController.applyFilters(allRecords, filters);

        res.status(200).json({
            data: filteredRecords,
            count: filteredRecords.length,
            filters_applied: filters,
        });
    }

    static async filterByNaturalLanguage(req: Request, res: Response) {
        const query = req.query.query as string;

        if (!query || typeof query !== 'string') {
            throw new AppError(400, 'Missing or invalid query parameter');
        }

        const filters = NaturalLanguageParser.parse(query);
        const validation = NaturalLanguageParser.validateFilters(filters);

        if (!validation.valid) {
            throw new AppError(422, validation.error!);
        }

        const allRecords = storage.getAll();
        const filteredRecords = StringController.applyFilters(allRecords, filters);
        
        res.status(200).json({
            data: filteredRecords,
            count: filteredRecords.length,
            interpreted_query: {
                original: query,
                parsed_filters: filters,
            },
        });
    }

    static async deleteString(req: Request, res: Response) {
        const { string_value } = req.params;
        const decodedValue = decodeURIComponent(string_value);

        const deleted = storage.delete(decodedValue);
        if (!deleted) {
            throw new AppError(404, 'String does not exist in the system');
        }

        res.status(204).send();
    }

    private static applyFilters(records: StringRecord[], filters: FilterOptions): StringRecord[] {
        return records.filter((record) => {
            if (filters.is_palindrome !== undefined && record.properties.is_palindrome !== filters.is_palindrome) {
                return false;
            }
            if (filters.min_length !== undefined && record.properties.length < filters.min_length) {
                return false;
            }
            if (filters.max_length !== undefined && record.properties.length > filters.max_length) {
                return false;
            }
            if (filters.word_count !== undefined && record.properties.word_count !== filters.word_count) {
                return false;
            }
            if (filters.contains_character !== undefined && !record.value.includes(filters.contains_character)) {
                return false;
            }
            return true;
        });
    }
}