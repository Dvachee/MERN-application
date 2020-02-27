const {Router} = require('express');

const router = Router();

router.get(
    '/find',
    async (req, res) => {
      try {
        connection.query("SELECT * FROM electrocars", function(err, rows, fields) {
          if(err) return console.log(err);
          res.status(201).json({ rows: rows, fields: fields})
        });
  
      }
      catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
      }
    })

module.exports = router;