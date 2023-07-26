export interface User {
  _id?: string;
  email: string;
  password?: string;
  fullname?: string;
  phone?: string;
  birthday?: string;
  address?: string;
  gender?: 'male' | 'female' | 'other';
  deleted?: boolean;
  role?: 'admin' | 'user';
  avatar?: string;
}
