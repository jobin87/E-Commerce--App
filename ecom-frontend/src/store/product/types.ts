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
