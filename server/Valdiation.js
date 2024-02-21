const {body} = require('express-validator');

const registerValidation = [
    body('name','Name Arleady Used!').isEmail(),
    body('password','Password has ben 3+ character').isLength({min:3}).isString(),
    body('avatar').optional().isURL()
];

module.exports = {
    registerValidation
}