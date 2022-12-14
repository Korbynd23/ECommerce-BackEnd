const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');



// GET all products
router.get('/', (req, res) => {
  Product.findAll({
    include: [ Category, {model: Tag , through: ProductTag} ]}
  ).then((productData) => {
    res.json(productData);
  });
});


// GET one product
router.get('/:id', (req, res) => {
  Product.findOne({
    where: {
      id: req.params.id
    }, 
    include: [ Category, {model: Tag , through: ProductTag} ]}
  ).then((productData) => {
    res.json(productData);
  });
});


// Create new product
// (Example req.body at bottom of page)
router.post('/', (req, res) => {
  Product.create(req.body)
  .then((product) => {
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  });
  
// update product info by its `id` value
// (Example req.body at bottom of page)
router.put('/:id', (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });

        const productTagRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      return Promise.all([
        ProductTag.destroy({ where: { id: productTagRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      res.status(400).json(err);
    });
});

// delete one product by its `id` value
router.delete('/:id', (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id
    },
  })
    .then(productData => {
      if (!productData) {
        res.status(404).json({ message: 'The specified product was not found' });
        return;
      }
      res.json(productData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});

module.exports = router;

/* Example req.body for should look like this...
  {
    product_name: "Basketball",
    price: 200.00,
    stock: 3,
    tagIds: [1, 2, 3, 4]
  }
*/