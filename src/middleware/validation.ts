import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';

export const validateCreateString = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { value } = req.body;

    if (!req.body || typeof req.body !== 'object') {
        throw new AppError(400, 'Invalid request body');
    }

    if (!('value' in req.body)) {
        throw new AppError(400, 'Missing required field: value');
    }

    if (typeof value !== 'string') {
        throw new AppError(422, 'Invalid data type for "value" (must be string)');
    }

    next();
};

export const validateQueryParams = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { is_palindrome, min_length, max_length, word_count, contains_character } = req.query;

    if (is_palindrome !== undefined) {
        if (is_palindrome !== 'true' && is_palindrome !== 'false') {
            throw new AppError(400, 'Invalid value for is_palindrome (must be true or false)');
        }
    }

    if (min_length !== undefined) {
        const val = parseInt(min_length as string);
        if (isNaN(val) || val < 0) {
            throw new AppError(400, 'Invalid value for min_length (must be non-negative integer)');
        }
    }

    if (max_length !== undefined) {
        const val = parseInt(max_length as string);
        if (isNaN(val) || val < 0) {
            throw new AppError(400, 'Invalid value for max_length (must be non-negative integer)');
        }
    }

    if (word_count !== undefined) {
        const val = parseInt(word_count as string);
        if (isNaN(val) || val < 0) {
            throw new AppError(400, 'Invalid value for word_count (must be non-negative integer)');
        }
    }

    if (contains_character !== undefined) {
        if (typeof contains_character !== 'string' || contains_character.length !== 1) {
            throw new AppError(400, 'Invalid value for contains_character (must be single character)');
        }
    }

    next();
};