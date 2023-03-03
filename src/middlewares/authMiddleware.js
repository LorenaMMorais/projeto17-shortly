import userSchema from '../schemas/userSchema.js';
import db from "../db.js";

export async function validateUser(req, res, next){
    const {error} = userSchema.validate(req.body, {abortEarly: false});

    if(error) return res.status(422).send(error.details.map(detail => detail.message));

    next();
}

export async function validateAuth(req, res, next){
    const {email} = req.body;

    try{
        const emailExist = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);

        if(emailExist.rowCount > 0) return res.status(409).send('Este email já está em uso!');

        next();
    }catch(error){
        res.status(500).send(error.message);
    }
}