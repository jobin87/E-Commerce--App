
export interface CartItem {
    objectID: string
    title: string
    price: number
    quantity: number
}

export interface CartState {
    items: CartItem[],
}

export interface  AddwithObjectID {
    objectID: string
}
export interface CartGetItem {
  _id: string;
  objectID: string;
  name: string;
  image: string;
  salePrice: number;
  quantity: number;
  categories: string[];
  createdAt: string; // or Date, if you parse it
  updatedAt: string; // or Date
  __v: number;
}

export interface UpdateItem {
  objectID: string;
  quantity: number;
}

