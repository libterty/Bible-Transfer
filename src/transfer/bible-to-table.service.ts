export interface BibleVerse {
  id: number;
  name: string;
  chapter: number;
  verse: number;
  text: string;
  info: string | null;
}

export interface BibleToTableService {
  transfer(texts: string[]): {
    header: string;
    footer: string;
    verses: BibleVerse[];
  };
}
