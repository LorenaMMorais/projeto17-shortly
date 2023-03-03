import {v4 as uuid} from 'uuid';
import bcrypt from 'bcrypt';

import connection from '..db.js';

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
    try{
        res.sendStatus(501);
    }catch(error){
        res.sendStatus(500).send(error.message);
    }
}