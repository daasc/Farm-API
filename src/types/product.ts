export interface Product {
  id: string;
  name: string;
  category: string;
  consumptionLevel: number;
  feedBunkSpacing: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductInput {
  name: string;
  category: string;
  consumptionLevel: number;
  feedBunkSpacing: number;
}
