import userSchema from '../schemas/userSchema,js';
import db from "../db.js";
export async function validateUser(req, res, next){
    const {error} = userSchema.validate(req.body, {abortEarly: false});
    if(error) return res.status(422).send(error.details.map(detail => detail.message));
    next();
}

export async function validateSignup(req, res, next){
    const {name, email, password, confirmPassword} = req.body;

    const signupValidation = userSchema.validate({name, email, password, confirmPassword});

    if(signupValidation.error) return res.status(422).send(signupValidation.error.message);

    const emailExist = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);

    if(emailExist.rows.length > 0) return res.status(409).send('Este email já está em uso!');

    next();
}
