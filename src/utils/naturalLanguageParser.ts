import { FilterOptions } from '../types';

export class NaturalLanguageParser {
    static parse(query: string): FilterOptions {
        const lowerQuery = query.toLowerCase();
        const filters: FilterOptions = {};

        if (lowerQuery.includes('palindrom')) {
            filters.is_palindrome = true;
        }

        if (lowerQuery.includes('single word')) {
            filters.word_count = 1;
        } else {
            const wordCountMatch = lowerQuery.match(/(\d+)\s+words?/);
            if (wordCountMatch) {
                filters.word_count = parseInt(wordCountMatch[1]);
            }
        }

        const longerThanMatch = lowerQuery.match(/longer than (\d+)/);
        if (longerThanMatch) {
            filters.min_length = parseInt(longerThanMatch[1]) + 1;
        }

        const shorterThanMatch = lowerQuery.match(/shorter than (\d+)/);
        if (shorterThanMatch) {
            filters.max_length = parseInt(shorterThanMatch[1]) - 1;
        }

        const atLeastMatch = lowerQuery.match(/at least (\d+) characters?/);
        if (atLeastMatch) {
            filters.min_length = parseInt(atLeastMatch[1]);
        }

        const atMostMatch = lowerQuery.match(/at most (\d+) characters?/);
        if (atMostMatch) {
            filters.max_length = parseInt(atMostMatch[1]);
        }

        const containsLetterMatch = lowerQuery.match(/contain(?:s|ing)? (?:the )?letter ([a-z])/);
        if (containsLetterMatch) {
            filters.contains_character = containsLetterMatch[1];
        }

        if (lowerQuery.includes('first vowel')) {
            filters.contains_character = 'a';
        } else if (lowerQuery.includes('vowel')) {
            filters.contains_character = 'a';
        }

        return filters;
    }

    static validateFilters(filters: FilterOptions): { valid: boolean; error?: string } {
        if (filters.min_length && filters.max_length && filters.min_length > filters.max_length) {
            return {
                valid: false,
                error: 'Conflicting filters: min_length cannot be greater than max_length',
            };
        }

        return { valid: true };
    }
}