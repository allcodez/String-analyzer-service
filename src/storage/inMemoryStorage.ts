import { StringRecord } from '../types';

export class InMemoryStorage {
    private records: Map<string, StringRecord> = new Map();

    add(record: StringRecord): void {
        this.records.set(record.value, record);
    }

    get(value: string): StringRecord | undefined {
        return this.records.get(value);
    }

    exists(value: string): boolean {
        return this.records.has(value);
    }

    delete(value: string): boolean {
        return this.records.delete(value);
    }

    getAll(): StringRecord[] {
        return Array.from(this.records.values());
    }

    clear(): void {
        this.records.clear();
    }
}