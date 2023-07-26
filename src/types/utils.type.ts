export interface SuccessResponse<Data> {
  success: boolean;
  message: string;
  data: Data;
}
export interface ErrorResponse<Data> {
  message: string;
  errorCode?: number;
  data?: Data;
}

// cú pháp `-?` sẽ loại bỏ undefiend của key optional

export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>;
};
