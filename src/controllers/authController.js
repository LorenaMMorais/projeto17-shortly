import {v4 as uuid} from 'uuid';
import bcrypt from 'bcrypt';

import db from '..db.js';

export async function signUp(req, res){
    const {name, email} = req.body;
    
    try{
        const password = bcrypt.hashSync(req.body.password, 10);
        
        await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, password]);
        
        res.sendStatus(201);
    }catch(error){
        res.sendStatus(500).send(error.message);
    }
}

export async function signIn(req, res){
    const {email, password} = req.body;
    try{
        const user = await db.query('SELECT * FROM users WERE "email" = $1', [email]);
        
        if (!user.rows[0] || !bcrypt.compareSync(password, user.rows[0])) return res.sendStatus(401);

        await db.query('INSERT INTO sessions (token, "userId") VALUES ($1, $2)', [uuid(), user.rows[0].id]);
        
        res.status(200).send(uuid());
    }catch(error){
        res.sendStatus(500).send(error.message);
    }
}