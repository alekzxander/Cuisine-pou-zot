const Cooker = require('../models/cooker');
const Menu = require('../models/menu');
const Type_has_menu = require('../models/type_has_menu');
const Calendar = require('../models/calendar');

const cooker = (app) => {
    app.post('/profil-cooker', async (req, res) => {
        const cooker = {
            last_name: req.body.last_name,
            first_name: req.body.first_name,
            email: req.body.email
        };
        const createCooker = await Cooker.create(cooker);
        try {
            res.json({ createCooker });
        } catch (err) {
            res.sendStatus(401)
        }
    });
    app.put('/profil-cooker', async (req, res) => {
        const cooker = await Cooker.findOne({
            where: {
                id: 2
            }
        });
        const updateCooker = {
            last_name: req.body.last_name,
            first_name: req.body.first_name,
            email: req.body.email,
            picture: req.body.picture,
            presentation: req.body.presentation
        }
        const cookerUpdated = await cooker.update(updateCooker);
        try {
            res.sendStatus(200);
        } catch (err) {
            res.sendStatus(401);
        }
    });
    app.post('/menu', async (req, res) => {
        const cooker = await Cooker.findOne({
            where: {
                id: 3
            }
        });
        const menu = {
            title: req.body.title,
            start: req.body.start,
            dish: req.body.dish,
            dessert: req.body.dessert,
            picture: req.body.picture,
            nb_guest: req.body.guest,
            price: req.body.price,
            cooker_id: cooker.id,
            draft: false
        };
        const createMenu = await Menu.create(menu);
        req.body.type.map(async (type) => {
            await Type_has_menu.create({ type_id: type, menu_id: createMenu.id })
        });

        try {
            res.json({ createMenu });
        } catch (err) {
            res.sendStatus(401);
        }
    });
    app.put('/menu/:id', async (req, res) => {

        //condition a rajouter avec le token pour vérifier si le menu correspont bien à cooker
        const menu = await Menu.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: Cooker
            }
            ]
        });
        const updateMenu = {
            title: req.body.title,
            start: req.body.start,
            dish: req.body.dish,
            dessert: req.body.dessert,
            picture: req.body.picture,
            nb_guest: req.body.guest,
            price: req.body.price,
            cooker_id: menu.cooker_id,
            draft: false
        };
        const menuUpdated = await menu.update(updateMenu);
        try {
            res.sendStatus(200);
        } catch (err) {
            res.sendStatus(401);
        }
    })
    app.post('/calendar', async (req, res) => {
        const cooker = await Cooker.findOne({
            where: {
                id: 3
            }
        });
        req.body.date.forEach(async (date) => {
            await Calendar.create({ cooker_id: cooker.id, date })
        });
        try {
            res.sendStatus(200);
        } catch (err) {
            res.sendStatus(401);
        }
    });

}

module.exports = cooker;