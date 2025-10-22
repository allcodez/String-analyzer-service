export interface StringProperties {
    length: number;
    is_palindrome: boolean;
    unique_characters: number;
    word_count: number;
    sha256_hash: string;
    character_frequency_map: Record<string, number>;
}

export interface StringRecord {
    id: string;
    value: string;
    properties: StringProperties;
    created_at: string;
}

export interface FilterOptions {
    is_palindrome?: boolean;
    min_length?: number;
    max_length?: number;
    word_count?: number;
    contains_character?: string;
}

export interface NaturalLanguageResponse {
    data: StringRecord[];
    count: number;
    interpreted_query: {
        original: string;
        parsed_filters: FilterOptions;
    };
}