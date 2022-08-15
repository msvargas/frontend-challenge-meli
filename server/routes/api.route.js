import { Router } from "express";
import API from "../services/API.js";
import authorMiddleware from "../middlewares/author.middleware.js";

const router = Router();

router.use(authorMiddleware);

router.get("/items", async (req, res, next) => {
  if (req.query.q) {
    const { success, response, error } = await API.fetchProductsByQuery(
      req.query.q
    );
    if (success) {
      const categories = (
        response.filters.find((item) => item.id === "category")?.values || []
      )
        .map((item) => item.path_from_root)
        .flat()
        .map((item) => item.name);

      const items = response.results.map((item) => {
        const price = item.prices?.prices?.slice(-1)[0] || {};
        return {
          id: item.id,
          title: item.title,
          price: {
            currency: price.currency_id,
            amount: price.amount,
            decimals: 2,
          },
          picture: item.thumbnail,
          condition: item.condition,
          free_shipping: !!item.shipping?.free_shipping,
        };
      });
      const payload = {
        categories,
        items,
      };
      res.json(payload);
    } else {
      res.status(500).json({
        message: "Internal Server Error",
        error,
      });
    }
  }
});

router.get("/items/:id", async (req, res) => {
  const productId = req.params.id;
  const results = await Promise.all([
    API.fetchProductDetailsById(productId),
    API.fetchProductDescriptionById(productId),
  ]);
  if (results.some((result) => result.success === false)) {
    res.status(500).json({
      message: "Internal Server Error",
      errors: results.map((result) => result.error),
    });
    return;
  }
  const product = results[0].response;
  const description = results[1].response;

  const resultCategories = await API.fetchProductCategoryById(
    product.category_id
  );
  if (!resultCategories.success) {
    res.status(500).json({
      message: "Internal Server Error",
      errors: resultCategories.error,
    });
    return;
  }
  const categories = (resultCategories.response?.path_from_root || []).map(
    (item) => item.name
  );
  const itemCondition = product.attributes.find(
    (item) => item.id === "ITEM_CONDITION"
  );
  res.json({
    item: {
      id: productId,
      title: product.title,
      price: {
        currency: product.currency_id,
        amount: product.price,
        decimals: 2,
      },
      picture: product.pictures?.slice(-1)[0]?.secure_url,
      condition: itemCondition?.value_name,
      free_shipping: !!product.shipping?.free_shipping,
      sold_quantity: product.sold_quantity,
      description: description.plain_text,
      categories,
    },
  });
});

export default router;
