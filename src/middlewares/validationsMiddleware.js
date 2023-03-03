import userSchema from '../schemas/userSchema.js';
import urlSchema from '../schemas/urlSchema.js';
import db from '../db.js';

export async function validateUser (req, res, next) {
    const {error} = userSchema.validate(req.body, {abortEarly:false});

    if(error) return res.status(422).send(error.details.map(detail => detail.message));

    next();
}

export async function validateUrl (req, res, next) {
    const {error} = urlSchema.validate(req.body, {abortEarly: false});

    if(error) return res.status(422).send(error.details.map(detail => detail.message));

    next();
}

export async function validateHeader (req, res, next) {
    const {authorization} = req.headers;
    const token = authorization ? authorization.replace('Bearer ', '') : '';
    const isValid = await db.query('SELECT * FROM sessions WERE token = $1', [token]);

    if(!authorization || !isValid.rows[0]) return res.sendStatus(401);

    next();
}