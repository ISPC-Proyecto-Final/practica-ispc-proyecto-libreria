import { Book } from "../book/book-model";

export interface Genre {
  id_genre: number;
  name: string;
  books: Book[];
}
