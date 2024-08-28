import * as fs from "fs";
import * as path from "path";
import { WriteToFileService } from "../write-file.service";

export interface BibleVerse {
  id: number;
  name: string;
  chapter: number;
  verse: number;
  text: string;
  info: string | null;
}

interface ChapterVerse {
  id: number;
  text: string;
}

interface Book {
  id: number;
  name: string;
  chapter: {
    id: number;
    verses: ChapterVerse[];
  }[];
}

interface InputData {
  verses: BibleVerse[];
}

interface OutputData {
  books: Book[];
}

export class WriteToFileServiceImpl implements WriteToFileService {
  handle(fileName: string, data: {
    header: string;
    footer: string;
    verses: BibleVerse[];
  }): void {
    const conversion = this.convertStructure({
      verses: data.verses
    });
    const target = path.join(path.dirname(require.main.filename), fileName);
    fs.writeFile(target, JSON.stringify(conversion), "utf8", function (err) {
      if (err) {
        throw err;
      } else {
        console.log("complete");
      }
    });
  }

  private convertStructure(inputData: InputData): OutputData {
    const verses = inputData.verses;
    const result: OutputData = { books: [] };
    const booksMap = new Map<string, Map<number, ChapterVerse[]>>();
  
    verses.forEach(verse => {
      if (!booksMap.has(verse.name)) {
        booksMap.set(verse.name, new Map<number, ChapterVerse[]>());
      }
  
      const bookChapters = booksMap.get(verse.name)!;
      if (!bookChapters.has(verse.chapter)) {
        bookChapters.set(verse.chapter, []);
      }
  
      bookChapters.get(verse.chapter)!.push({
        id: verse.verse,
        text: verse.text
      });
    });
  
    booksMap.forEach((bookChapters, bookName) => {
      const book: Book = {
        id: verses.find(v => v.name === bookName)!.id,
        name: bookName,
        chapter: []
      };
  
      bookChapters.forEach((verseList, chapterNum) => {
        book.chapter.push({
          id: chapterNum,
          verses: verseList
        });
      });
  
      result.books.push(book);
    });
  
    return result;
  }
}
