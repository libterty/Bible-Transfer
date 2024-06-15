
import { BibleToTableServiceImpl } from "./transfer/impl/bible-to-table-impl.service"
import { WriteToFileServiceImpl } from "./file/impl/write-file-impl.service"
import { bookContents } from './data/bible'

function main() {
  const result = new BibleToTableServiceImpl().transfer(bookContents);
  new WriteToFileServiceImpl().handle('book.json', result);
}



main()