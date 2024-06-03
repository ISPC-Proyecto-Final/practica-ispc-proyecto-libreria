export interface Auth {
    id?: number;
    access_token: string;
    user: { id: number };
  }