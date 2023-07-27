export interface Post {
  _id?: string;
  title: string;
  thumbnail?: string;
  description?: string;
  shortDescription?: string;
  censored: boolean;
  author: string;
  views?: number;
  updatedAt?: string;
}
