import axios from "axios";

class API {
  static client = axios.create({
    baseURL: "https://api.mercadolibre.com",
  });

  static fetchProductsByQuery = async (query) => {
    try {
      const { data: response } = await this.client.get("sites/MLA/search", {
        params: {
          q: query,
        },
      });
      return { success: true, response };
    } catch (error) {
      console.error(error);
      return { success: false, error };
    }
  };

  static fetchProductDetailsById = async (id) => {
    try {
      const { data: response } = await this.client.get(`items/${id}`);
      return { success: true, response };
    } catch (error) {
      console.error(error);
      return { success: false, error };
    }
  };

  static fetchProductDescriptionById = async (id) => {
    try {
      const { data: response } = await this.client.get(
        `items/${id}/description`
      );
      return { success: true, response };
    } catch (error) {
      console.error(error);
      return { success: false, error };
    }
  };

  static fetchProductCategoryById = async (id) => {
    try {
      const { data: response } = await this.client.get(`categories/${id}`);
      return { success: true, response };
    } catch (error) {
      return { success: false, error };
    }
  };
}

export default API;
