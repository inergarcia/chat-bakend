const { Router, response } = require('express');
const { check } = require('express-validator');
const router = Router();
const {createUser, login, renewToken} = require('../controller/auth');
const { validateField } = require('../middlewares/validate_field');
const { validateJWT } = require('../middlewares/validate_jwt');

router.post('/new', [
    check('name', 'name is required').not().isEmpty(),
    check('password', 'password is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    validateField
] ,createUser);

router.post('/', [
    check('password', 'password is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    validateField
], login);

router.get('/renew', validateJWT ,renewToken);

module.exports = router;