export interface Publisher {
  id_publisher: number;
  name: string;
}

export interface createPublisherDTO extends Pick<Publisher, 'name'> { }
