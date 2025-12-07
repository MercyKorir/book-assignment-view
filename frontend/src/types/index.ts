export interface Book {
  title: string;
  author: string;
  coverPhotoURL: string;
  readingLevel: string;
}

export interface GetBooksData {
  books: Book[];
}
