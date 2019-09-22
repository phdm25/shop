const Post = require('../models/post');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'phdm',
    api_key: '833557874939933',
    api_secret: process.env.CLOUDINARY_SECRET,
})

module.exports = {
    async postIndex(req, res, next) {
        let posts = await Post.find({})
        res.render('posts/index', { posts })
    },

    postNew(req, res, next) {
        res.render('posts/new')
    },

    async postCreate(req, res, next) {
        req.body.post.images = []
        for (const file of req.files) {

            let image = await cloudinary.v2.uploader.upload(file.path);

            req.body.post.images.push({
                url: image.secure_url,
                public_id: image.public_id
            })
        }
        let post = await Post.create(req.body.post)
        res.redirect(`/posts/${post.id}`)
    },

    async postShow(req, res, next) {
        let post = await Post.findById(req.params.id)
        res.render('posts/show', { post })
    },

    async postEdit(req, res, next) {
        let post = await Post.findById(req.params.id)
        res.render('posts/edit', { post })
    },

    async postUpdate(req, res, next) {
        let post = await Post.findById(req.params.id)
        if (req.body.deleteImages && req.body.deleteImages.length) {
            for (const public_id of req.body.deleteImages) {
                await cloudinary.v2.uploader.destroy(public_id)
                post.images = post.images.filter((images) => images.public_id !== public_id)
            }
        }
        if (req.files) {
            for (const file of req.files) {
                let image = await cloudinary.v2.uploader.upload(file.path);
                post.images.push({
                    url: image.secure_url,
                    public_id: image.public_id
                })
            }
        }

        post.title = req.body.post.title
        post.description = req.body.post.description
        post.price = req.body.post.price
        post.location = req.body.post.location

        await post.save()
        res.redirect(`/posts/${post.id}`)
    },

    async postDelete(req, res, next) {
        let post = await Post.findById(req.params.id)
        for (const public_id of post.images) {
            await cloudinary.v2.uploader.destroy(public_id)
        }
        await post.remove();
        res.redirect('/posts')
    }
}
