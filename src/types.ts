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
    readed:         boolean;
    audio:          boolean;
    created_at:     Date;
    updated_at:     Date | null;
    deleted_at:     Date | null;
}

export interface Voice {
    Name: string;
    ShortName: string;
    Gender: string;
    Locale: string;
    SuggestedCodec: string;
    FriendlyName: string;
    Status: string;
    VoiceTag: {
        ContentCategories: string[];
        VoicePersonalities: string[];
    };
    Language: string;
}

export interface Audio {
    subtitle: { offset: number; duration: number; text: string; }[];
    audio: string;
}