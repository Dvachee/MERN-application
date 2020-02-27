const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CONFIG = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../models/User')

const router = Router();

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов')
      .isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      console.log('Body:', req.body)
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации'
        })
      }

      const { email, password } = req.body;
      
      await connection.query("SELECT * FROM пользователи WHERE Email=?", [email], function (err, rows) {
        if (err) return console.log(err);
        if (rows.length > 0) {
          res.status(400).json({ message: 'Такой пользователь уже существует!' })
        }
      });

      const hashedPassword = await bcrypt.hash(password, 12);

      await connection.query("INSERT INTO пользователи (Email, Пароль) VALUES (?,?)", [email, hashedPassword], function (err) {
        if (err) {
          return console.log(err)
        } else {
          res.status(201).json({ message: 'Пользователь создан' })
        };
       
      });

    }
    catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так' })
    }
  })

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при входе в систему'
        })
      }
      const { email, password } = req.body;

      connection.query("SELECT * FROM пользователи WHERE Email=?", [email], function (err, rows) {
        if (err) return console.log(err);
        if (rows.length < 1) {
          res.status(400).json({ message: 'Пользователь не найден' })
        }

        const user = rows[0];
        const isMatch = bcrypt.compare(password, rows[0]['Пароль']);

        if (!isMatch) {
          return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
        }

        const token = jwt.sign(
          { userId: user['Номер телефона'] },
          CONFIG.get('jwtSecret'),
          { expiresIn: '1h' }
        )

        res.json({ token, userId: user['Номер телефона'] })
        res.json({message: 'qwdqwd'})
      });

    }
    catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так' })
    }
  })

module.exports = router;