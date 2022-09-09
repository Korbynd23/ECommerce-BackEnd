const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
  router.get("/", (req, res) => {
    Category.findAll({
      include: [{
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    })
      .then((categoryData) => res.json(categoryData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// GET a single category  
router.get('/:id', async (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
    .then(dbCatData => {
      if(!dbCatData) {
        res.status(404).json({message: 'The specified category was not found'});
        return;
      }
      res.json(dbCatData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
