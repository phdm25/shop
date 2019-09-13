var express = require('express');
var router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Surf shop' });
});

/* GET register */
router.get('/register', (req, res, next) => {
  res.send('GET /register')
});

/* GET register */
router.post('/register', (req, res, next) => {
  res.send('POST /register')
});

/* GET login */
router.get('/login', (req, res, next) => {
  res.send('GET /login')
});

/* POST login */
router.post('/login', (req, res, next) => {
  res.send('POST /login')
});

/* GET profile  */
router.get('/profile', (req, res, next) => {
  res.send('GET /profile')
});

/* PUT profile */
router.put('/profile/:user_id', (req, res, next) => {
  res.send('PUT /profile/:user_id')
});

/* GET /forgot-pwd  */
router.get('/forgot', (req, res, next) => {
  res.send('GET /forgot-password')
});

/* PUT /forgot  */
router.put('/forgot', (req, res, next) => {
  res.send('PUT /forgot-password')
});

/* GET /reset  */
router.get('/reset/:token', (req, res, next) => {
  res.send('GET /reset-password')
});

/* PUT /reset  */
router.put('/reset/:token', (req, res, next) => {
  res.send('PUT /reset-password')
});

module.exports = router;
