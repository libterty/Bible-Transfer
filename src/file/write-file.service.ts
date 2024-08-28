import { BibleVerse } from "@/transfer/bible-to-table.service"

export interface WriteToFileService {
  handle(fileName: string, data: {
    header: string;
    footer: string;
    verses: BibleVerse[];
  }): void;
}
