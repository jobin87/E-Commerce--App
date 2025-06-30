export interface productTypes {
  objectID: string;
  name: string;
  image: string;
  thumbnailImage?: string;
  description?: string;
  shortDescription?: string;
  manufacturer?: string;
  price?: number;
  salePrice: number;
  salePrice_range?: string;
  categories?: string[];
  bestSellingRank?: number;
  customerReviewCount?: number;
  shipping?: string;
  url?: string;
  type?: string;
}

export interface productObjectId {
  objectID: string;

}
export interface ProductCreated {
  id: string; // uuid from backend
  title: string;
  price: number;
  description: string;
  categoryId: number | string; // depends on backend: numeric or MongoDB ObjectId
  imageUrl: string | null;
}

export interface CreateProduct {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[]; // or File[]
}


