export interface Author {
  id_author: number;
  name: string;
}

export interface createAuthorDTO extends Pick<Author, 'name'> { }
