
export interface CoverSpider {
    author:         string;
    category:       string;
    description:    string;
    image:          string;
    latest:         string;
    latest_title:   string;
    latest_url:     string;
    status:         string;
    title:          string;
}
export interface CatalogSpider {
    title:          string;
    url:            string;
}
export interface ChapterSpider {
    content:        string;
    title:          string;
    url:            string;
}

export interface Spider {
    id:                                 number;
    name:                               string;
    origin:                             string;
    headers:                            string;
    search_url:                         string;
    search_method:                      boolean;
    search_data:                        string;
    search_content_type:                string;
    search_cover_parent:                string;
    search_cover_url:                   string;
    search_cover_title:                 string;
    search_cover_title_regular:         string;
    search_cover_category:              string;
    search_cover_category_regular:      string;
    search_cover_author:                string;
    search_cover_author_regular:        string;
    search_cover_image:                 string;
    search_cover_description:           string;
    search_cover_description_regular:   string;
    search_cover_latest:                string;
    search_cover_latest_regular:        string;
    search_cover_latest_title:          string;
    search_cover_latest_title_regular:  string;
    search_cover_latest_url:            string;
    search_cover_status:                string;
    search_cover_status_regular:        string;
    cover_title:                        string;
    cover_title_regular:                string;
    cover_author:                       string;
    cover_author_regular:               string;
    cover_image:                        string;
    cover_image_regular:                string;
    cover_description:                  string;
    cover_description_regular:          string;
    cover_category:                     string;
    cover_category_regular:             string;
    cover_latest:                       string;
    cover_latest_regular:               string;
    cover_latest_title:                 string;
    cover_latest_title_regular:         string;
    cover_latest_url:                   string;
    cover_status:                       string;
    cover_status_regular:               string;
    catalog_parent:                     string;
    catalog_url:                        string;
    catalog_title:                      string;
    catalog_title_regular:              string;
    catalog_next_url:                   string;
    chapter_title:                      string;
    chapter_title_regular:              string;
    chapter_content:                    string;
    chapter_content_regular:            string;
    status:                             boolean;
    created_at:                         Date;
    updated_at:                         Date | null;
    deleted_at:                         Date | null;
}

export interface Book {
    id:             number;
    name:           string;
    author:         string;
    image:          string;
    description:    string;
    category:       string;
    status:         string;
    origin:         string;
    reading:        boolean;
    reading_position:   string;
    created_at:     Date;
    updated_at:     Date | null;
    deleted_at:     Date | null;
}
export interface Chapter {
    id:             number;
    book_id:        number;
    title:          string;
    content:        string;
    description:    string;
    origin:         string;
    created_at:     Date;
    readed:         boolean;
    audio:          boolean;
    updated_at:     Date | null;
    deleted_at:     Date | null;
}



export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]
export interface Database {
  public: {
    Tables: {
      novel_spiders: {
        Row: Partial<Spider>
        Insert: Partial<Spider>
        Update: Partial<Spider>
      },
      novel_books: {
        Row: Partial<Book>
        Insert: Partial<Book>
        Update: Partial<Book>
      },
      novel_chapters: {
        Row: Partial<Chapter>
        Insert: Partial<Chapter>
        Update: Partial<Chapter>
      },
    }
  }
}