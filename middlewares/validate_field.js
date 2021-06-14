const { validationResult } = require("express-validator");

const validateField = (req, res, next) => {

    const err = validationResult(req);
    
    if(!err.isEmpty()){
        return res.status(400).json({
            ok: false,
            error: err.mapped()
        });
    }

    next();
}

module.exports = {
    validateField
}