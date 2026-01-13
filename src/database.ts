import { createClient, type PostgrestSingleResponse } from '@supabase/supabase-js';
import type { Database, Spider } from './models';

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]
export default class Model {
    static readonly client = createClient<Database>(import.meta.env.VITE_SUPABASE_URL as string, import.meta.env.VITE_SUPABASE_KEY as string);
    static storage = this.client.storage.from('app_novels');
}
export class SpiderModel extends Model {
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
export class BookModel extends Model {
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
export class ChapterModel extends Model {
    static table() {
        return this.client.from('novel_chapters');
    }
    static async find(id: number) {
        const result = await this.table().select().eq('id', id).single()
        return result.data;
    }
    static async page(id: number, page: number = 0, limit: number = 10, columns: string = '*') {
        const result = await this.table().select(columns).eq('book_id', id).order('id').range(page * limit, (page + 1) * limit - 1);
        return result.data || [];
    }
    static async count(id: number): Promise<number> {
        const result = await this.table().select('id', { count: 'exact' }).eq('book_id', id).order('id');
        return result.count || 0;
    }
    static async next(id: number) {
        const result = await this.table().select().gt('id', id).order('id').limit(1).single()
        return result.data;
    }
    static async catalog(book_id: number) {
        const count = await this.count(book_id);
        const page = Math.ceil(count / 1000);
        const chapters = await Promise.all(Array.from({ length: page }, (_, i) => this.page(book_id, i, 1000, 'id, title, audio, readed')));
        return chapters.flat();
    }
    static async all(book_id: number) {
        const result = await this.table().select('id, title').eq('book_id', book_id).order('id')
        return result.data || [];
    }
}