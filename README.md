# Bible Book Transfer

## Data Location
- src/data/bible.ts

**Important: data must follow `<BookAbbreviation>:<BookChapter>:<BookVersus><WhiteSpace><BookContent>`**

## Transform Output
- src/book.json

### Generate Book Transform Output

```bash
nvm use v16.20.0

npm i

npm run build
```