export interface Item {
  id: number;
  no: string;
  name: string;
  description: string;
  price: number;
  selected?: boolean; // Add selected property
}
