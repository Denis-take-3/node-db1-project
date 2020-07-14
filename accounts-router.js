const router = require('express').Router();

const db = require('./data/dbConfig');

router.get('/', (req, res) => {
  db.select('*')
    .from('accounts')
    .catch((err) => handleError(err, res));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  db.select('*')
    .from('accounts')
    .where({ id })
    .first()
    .then((account) => res.status(200).json({ data: account }))
    .catch((err) => handleError(err, res));
});

router.post('/', (req, res) => {
  const postData = req.body;
  db('accounts')
    .insert(postData, 'id')
    .then((postId) => {
      db('accounts')
        .where({ id: postId[0] })
        .first()
        .then((account) => {
          res.status(200).json({ Created: account });
        });
    })
    .catch((err) => handleError(err, res));
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.select('*')
    .from('accounts')
    .where({ id })
    .update(changes)
    .then((ammountDeleted) => {
      if (count > 0) {
        res.status(200).json({ data: ammountDeleted });
      } else {
        res.status(404).json({ message: 'there was no record to update' });
      }
    })
    .catch((err) => handleError(err, res));
});

router.del('/:id', (req, res) => {
  const { id } = req.params;

  db.select('*')
    .from('accounts')
    .where({ id })
    .del()
    .then((ammountDeleted) => {
      if (count > 0) {
        res.status(200).json({ data: ammountDeleted });
      } else {
        res.status(404).json({ message: 'there was no record to delete' });
      }
    })
    .catch((err) => handleError(err, res));
});

function handleError(error, res) {
  console.log('error', error);
  res.status(500).json({ message: error.message });
}
module.exports = router;
