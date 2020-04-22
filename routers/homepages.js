const { Router } = require("express");
const auth = require("../auth/middleware");
const Homepage = require("../models").homepage;

const Product = require("../models").product;

const router = new Router();

router.patch("/:id", auth, async (req, res) => {
  const homepage = await Homepage.findByPk(req.params.id);
  if (!homepage.userId === req.user.id) {
    return res
      .status(403)
      .send({ message: "You are not authorized to update this homepage" });
  }

  const { title, description, imageUrl } = req.body;

  await homepage.update({ title, description, imageUrl });

  return res.status(200).send({ homepage });
});

//----- test products

router.post("/:id/products", auth, async (req, res) => {
  const homepage = await Homepage.findByPk(req.params.id);
  console.log(homepage);

  if (homepage === null) {
    return res.status(404).send({ message: "This homepage does not exist" });
  }

  if (!homepage.userId === req.user.id) {
    return res
      .status(403)
      .send({ message: "You are not authorized to update this homepage" });
  }

  const { description, imageUrl, price, productInfo, city } = req.body;

  if (!description) {
    return res.status(400).send({ message: "A product need a description" });
  }

  const product = await Product.create({
    description,
    imageUrl,
    price,
    productInfo,
    city,
    homepageId: homepage.id,
  });

  return res.status(201).send({ message: "Product created", product });
});

router.get("/:id/products/:id", (req, res, next) => {
  console.log("TEST ID endpoint", req.params.id);
  Product.findByPk(req.params.id)
    .then((product) => {
      res.send(product);
    })
    .catch(next);
});

router.get("/", async (req, res) => {
  const limit = req.query.limit || 10;
  const offset = req.query.offset || 0;
  const homepages = await Homepage.findAndCountAll({
    limit,
    offset,
    include: [Product],
    order: [[Product, "createdAt", "DESC"]],
  });
  res.status(200).send({ message: "ok", homepages });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  console.log(id);
  if (isNaN(parseInt(id))) {
    return res.status(400).send({ message: "Homepage id is not a number" });
  }

  const homepage = await Homepage.findByPk(id, {
    include: [Product],
    order: [[Product, "createdAt", "DESC"]],
  });

  if (homepage === null) {
    return res.status(404).send({ message: "Homepage not found" });
  }

  res.status(200).send({ message: "ok", homepage });
});

module.exports = router;
