import { createClient, type PostgrestSingleResponse } from '@supabase/supabase-js';
import type { Database, Spider } from './models';

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]
export default class BaseModel {
    static readonly client = createClient<Database>(import.meta.env.VITE_SUPABASE_URL as string, import.meta.env.VITE_SUPABASE_KEY as string);
}
export class SpiderModel extends BaseModel {
    static table() {
        return this.client.from('novel_spiders');
    }
    static async find(id: number) {
        const result = await this.table().select().eq('id', id).single()
        return result.data;
    }
    static async all() {
        const result: PostgrestSingleResponse<Spider[]> = await this.table().select()
        return result.data || [];
    }
}
export class BookModel extends BaseModel {
    static table() {
        return this.client.from('novel_books');
    }
    static async find(id: number) {
        const result = await this.table().select().eq('id', id).single()
        return result.data;
    }
    static async all() {
        const result = await this.table().select()
        return result.data || [];
    }
}
export class ChapterModel extends BaseModel {
    static table() {
        return this.client.from('novel_chapters');
    }
    static async find(id: number) {
        const result = await this.table().select().eq('id', id).single()
        return result.data;
    }
    static async all(book_id: number) {
        const result = await this.table().select('id, title').eq('book_id', book_id).order('id')
        return result.data || [];
    }
}