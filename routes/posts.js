const express = require('express');
const router = express.Router();
const { asyncErrorHandler } = require('../middlewear');
const multer = require('multer');
const upload = multer({ 'dest': 'uploads/' })
const {
    postIndex,
    postNew,
    postCreate,
    postShow,
    postEdit,
    postUpdate,
    postDelete
} = require('../controllers/post');

/* GET posts listing. */
router.get('/', asyncErrorHandler(postIndex));

/* GET posts new */
router.get('/new', postNew);

/* POST create post /posts */
router.post('/', upload.array('images', 4), asyncErrorHandler(postCreate));

/* GET posts show  /posts/:id */
router.get('/:id', asyncErrorHandler(postShow));

/* GET posts edit  /posts/:id/edit */
router.get('/:id/edit', asyncErrorHandler(postEdit));

/* PUT posts update /posts/:id */
router.put('/:id', upload.array('images', 4), asyncErrorHandler(postUpdate));

/* DELETE posts destroy /posts/:id */
router.delete('/:id', asyncErrorHandler(postDelete));

module.exports = router;
