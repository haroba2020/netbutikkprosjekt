const { Router } = require('express');
const controller = require('../controller/controller');

router = Router()
router.get('/login', controller.login_get);
router.get('/signup', controller.signup_get);
router.get('/admin', controller.admin);
router.get('/logout', controller.logout);
router.post('/addShoe', controller.addShoe);
router.post('/signup', controller.addUser);
router.post('/login', controller.login_post);

module.exports = router