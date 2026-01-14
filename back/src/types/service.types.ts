export interface ApartmentFilters {
  search?: string;
  city?: string;
  type?: string;
  rooms?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  premium?: boolean;
}

export interface EmbeddingDocument {
  _id: string;
  embedding: number[];
  [key: string]: any;
}
