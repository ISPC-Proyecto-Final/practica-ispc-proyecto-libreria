import { Author } from '../author/author-model';
import { Genre } from '../genre/genre-model';
import { Publisher } from '../publisher/publisher-model';

export interface Book {
  id_book: number;
  isbn: string;
  author: Author;
  publisher: Publisher;
  genres: number[];
  title: string;
  page_amount: number;
  book_cover: string;
  stock: number;
  release_year: number;
  synopsis: string;
  price: string;
  tags: string;
  subscription: boolean;
}

export interface SelectedBookDto
  extends Pick<Book, 'id_book' | 'isbn' | 'title' | 'author' | 'book_cover' | 'price'> {
  selectedAmount: number;
}

export interface CreateBookDto
  extends Omit<Book, 'id_book' | 'author' | 'publisher' | 'genres'> {
  author_id: number;
  publisher_id: number;
  genre_ids: number[];
}
