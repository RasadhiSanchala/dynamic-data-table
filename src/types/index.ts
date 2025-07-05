export interface TableRow {
  id: string;
  name: string;
  email: string;
  age: number;
  role: string;
  [key: string]: string | number;
}