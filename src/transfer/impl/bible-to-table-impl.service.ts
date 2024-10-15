import { BibleToTableService, BibleVerse } from "../bible-to-table.service";
import { BibleBook } from "../../types/bible-book.enum";
import { BibleBookAbbreviation } from "../../types/bible-book-abbreviation.enum";

export class BibleToTableServiceImpl implements BibleToTableService {
  private splitOnFirstSpace(str: string): [string, string] {
    const index = str.indexOf(' ');
    if (index === -1) {
        return [str, ''];
    }
    return [str.substring(0, index), str.substring(index + 1)];
  }

  transfer(texts: string[]): {
    header: string;
    footer: string;
    verses: BibleVerse[];
  } {
    const verses = texts.reduce((result: BibleVerse[], item, index, arr) => {
      const [indexes, content] = this.splitOnFirstSpace(item);
      if (!indexes || !content) {
        return result;
      }

      const [bookAbbreviation, bookChapter, bookVerse] = indexes.split(":");
      const bookIndex = BibleBookAbbreviation[bookAbbreviation];
      result.push({
        id: Number(bookIndex) + 1,
        name: BibleBook[bookIndex],
        chapter: Number(bookChapter),
        verse: Number(bookVerse),
        text: content,
        info: null,
      });

      return result;
    }, []);
    return {
      header: "",
      footer: "",
      verses,
    };
  }
}
