import { User } from './user.type';

export type AuthResponse = {
  accessToken: string;
  user: User;
};
