import { Book } from "../book/book-model"

export interface Purchase {
  orderNumber: number,
  date: string,
  price: number,
  totalQuantity: number,
  totalCost: number,
  book: Book
}


