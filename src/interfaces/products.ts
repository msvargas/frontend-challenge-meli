export interface IProducts {
  categories: string[];
  items: Array<{
    id: string;
    title: string;
    price: {
      currency: string;
      amount: number;
      decimals: number;
    };
    picture: string;
    condition: string;
    free_shipping: boolean;
    address: {
      city_name: string;
    };
  }>;
}
