import { ROLE } from "src/app/utils/enums/user.enum";

export interface User {
  id_user: number;
  password: string;
  last_login: Date;
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: Date;
  email: string;
  telephone_number: string;
  telephone_area_code: string;
  document: number;
  address_province: string;
  address_location: string;
  address_street: string;
  postal_code: string;
  groups: any[];
  user_permissions: any[];
  token: any;
}

export interface CreateUserDTO extends Omit<User,
  'id_user' |  'last_login' | 'is_superuser' |
  'first_name' | 'last_name' | 'is_staff' | 'is_active' |
  'date_joined' | 'groups' | 'user_permissions' | 'token'> { }

export interface UserBasicInfoDTO extends Pick<User, 'username' | 'email' | 'telephone_area_code' | 'telephone_number' | 'token'> { }
