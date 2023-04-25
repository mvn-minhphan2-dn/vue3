export interface TodoInfo {
  todos: {
    id: number;
    name: string;
    age?: number;
  }[];
  idUpdate: number | null;
}
