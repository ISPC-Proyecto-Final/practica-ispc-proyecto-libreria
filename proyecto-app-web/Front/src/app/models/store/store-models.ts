export interface Store {
  id_store: number;
  street_number: string;
  province: string;
  locality: string;
  telephone: string;
}

export interface CreateStoreDto extends Omit<Store, 'id_store'> { }
