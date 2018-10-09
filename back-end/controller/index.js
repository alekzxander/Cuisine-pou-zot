const Menu = require('../models/menu');
const Cooker = require('../models/cooker');
const Calendar = require('../models/calendar');
const User = require('../models/user');
const Transaction = require('../models/transaction');
const Comment = require('../models/comment');
const Type_has_menu = require('../models/type_has_menu');
const Type = require('../models/type');
const index = (app) => {
    app.get('/menus', async (req, res) => {
        const menus = await Menu.findAll({
            where: {
                draft: false
            },
            include: [
                {
                    model: Cooker
                }
            ]
        });
        try {
            res.json({ menus });
        } catch (err) {
            res.sendStatus(401);
        }
    });
    app.get('/menu/:id', async (req, res) => {
        const menu = await Menu.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Cooker,
                    model: Comment,
                    model: Type_has_menu,
                    include: [
                        {
                            model: Type
                        }
                    ]
                }
            ]
        });
        const calendar = await Calendar.findAll({
            where: {
                cooker_id: menu.cooker_id
            }
        });
        try {
            res.json({ calendar, menu });
        } catch (err) {
            res.sendStatus(401);
        }
    });
    app.get('/profil-user/:id', async (req, res) => {
        /// condition pour accéder à cette page avec un middleware
        /// verification que l'id correspond bien à celle de l'utilisateur connecté
        const user = await User.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Transaction,
                    include: [
                        {
                            model: Menu
                        }
                    ]
                }
            ]
        });
        try {
            res.json({ user });
        } catch (err) {
            res.sendStatus(401);
        }
    });
    app.get('/profil-cooker/:id', async (req, res) => {
        const cooker = await Cooker.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Menu
                }
            ]
        });
        try {
            res.json({ cooker });
        } catch (err) {
            res.sendStatus(401);
        }
    });
    app.get('/comments', async (req, res) => {
        const comments = await Comment.findAll({
            include: [
                {
                    model: Menu
                }
            ]
        });
        try {
            res.json({ comments });
        } catch (err) {
            res.sendStatus(401);
        }
    });
};

module.exports = index;