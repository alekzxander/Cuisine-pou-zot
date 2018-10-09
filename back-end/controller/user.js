const User = require('../models/user');
const Comment = require('../models/comment');


const user = (app) => {
    app.post('/profil-user', async (req, res) => {
        const user = {
            last_name: req.body.last_name,
            first_name: req.body.first_name,
            email: req.body.email,
            adresse: req.body.adresse,
            phone: req.body.phone,
            picture: req.body.picture
        };
        const createUser = await User.create(user);
        try {
            res.json({ createUser })
        } catch (err) {
            res.json({ err })
        }
    });
    app.put('/profil-user', async (req, res) => {
        const user = await User.findOne({
            where: {
                id: 1
            }
        });
        const updateUser = {
            last_name: req.body.last_name,
            first_name: req.body.first_name,
            email: req.body.email,
            adresse: req.body.adresse,
            phone: req.body.phone,
            picture: req.body.picture
        }
        const userUpdated = await user.update(updateUser);
        try {
            res.json({ userUpdated })
        } catch (err) {
            res.json({ err })
        }
    });
    app.post('/comment/:menu_id', async (req, res) => {
        // Recuperer l'id utilisateur avec le middleware du token
        const comment = {
            body: req.body.body,
            score: req.body.score,
            user_id: 2,
            menu_id: req.params.menu_id
        };
        const createComment = await Comment.create(comment);
        try {
            res.json({ createComment });
        } catch (err) {
            res.sendStatus(401);
        }
    })
};

module.exports = user;