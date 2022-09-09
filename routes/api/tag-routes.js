const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include: [ { model: Product, through: ProductTag} ]}
  ).then((tagData) => {
    res.json(tagData);
  });
});


router.get('/:id', (req, res) => {
    Tag.findAll({
      where: {
        id: req.params.id
      },
      include: [ { model: Product, through: ProductTag} ]}
    ).then((tagData) => {
      res.json(tagData);
    });
  });

router.post('/', (req, res) => {
  Tag.create(req.body)
  .then((tag) => {
      if (req.body.tagIds.length) {
        const tagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            tag_id: tag.id,
            tag_id,
          };
        });
        return Tag.bulkCreate(tagIdArr);
      }
      res.status(200).json(tag);
    })
    .then((tagIds) => res.status(200).json(tagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  });

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;

