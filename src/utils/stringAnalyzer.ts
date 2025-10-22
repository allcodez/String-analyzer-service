import { createHash } from 'crypto';
import { StringProperties } from '../types';

export class StringAnalyzer {
    static analyze(value: string): StringProperties {
        const sha256_hash = this.computeSHA256(value);
        const length = value.length;
        const is_palindrome = this.isPalindrome(value);
        const unique_characters = this.countUniqueCharacters(value);
        const word_count = this.countWords(value);
        const character_frequency_map = this.buildCharacterFrequencyMap(value);

        return {
            length,
            is_palindrome,
            unique_characters,
            word_count,
            sha256_hash,
            character_frequency_map,
        };
    }

    static computeSHA256(value: string): string {
        return createHash('sha256').update(value).digest('hex');
    }

    static isPalindrome(value: string): boolean {
        const normalized = value.toLowerCase().replace(/\s/g, '');
        return normalized === normalized.split('').reverse().join('');
    }

    static countUniqueCharacters(value: string): number {
        return new Set(value).size;
    }

    static countWords(value: string): number {
        const trimmed = value.trim();
        if (trimmed.length === 0) return 0;
        return trimmed.split(/\s+/).length;
    }

    static buildCharacterFrequencyMap(value: string): Record<string, number> {
        const map: Record<string, number> = {};
        for (const char of value) {
            map[char] = (map[char] || 0) + 1;
        }
        return map;
    }
}