const { Router } = require('express');
const controller = require('../controller/controller');

router = Router()
router.get('/login', controller.login_get);
router.get('/signup', controller.signup_get);
router.get('/admin', controller.admin);
router.get('/adminHelp', controller.adminHelp);
router.get('/superAdmin', controller.superAdmin);
router.get('/logout', controller.logout);
router.post('/addShoe', controller.addShoe);
router.post('/signup', controller.addUser);
router.post('/login', controller.login_post);
router.post('/roleSwitch', controller.roleSwitch);
router.delete('/:id',controller.kicks_delete)

module.exports = router