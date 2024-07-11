const { registerSchema } = require('./schemas');


// Validation middleware
function validateBody(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            console.log('Validation Error:', error);
            const errors = error.details.map(detail => detail.message);
            return res.render('register', { errors, ...req.body });
        }
        next();
    };
} 

// function validateUser(req, res, next) {
//     const { error } = userSchema.validate(req.body);
//     if (error) {
//         return res.status(400).json({ error: error.details[0].message });
//     }
//     next();
// }


module.exports = { validateBody };