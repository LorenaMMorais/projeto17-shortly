import { nanoid } from 'nanoid';
import db from '../db.js';

export async function postUrl(req, res){
    const {url} = req.body;
    const shortUrl = nanoid(8);

    try{
        await db.query('INSERT INTO urls (url, "shortUrl") VALUES ($1, $2)', [url, shortUrl]);
    
        res.status(201).send({shortUrl});
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}

export async function urlById(req, res){
    const {id} = req.params;
    try{
        const url = await db.query('SELECT id, "shortUrl", url FROM urls WHERE "shortUrl" = $1', [id]);

        if(!url.rows[0]) return res.sendStatus(404);

        res.status(200).send(url.rows[0]);
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}

export async function openUrl(req, res){
    try{
        res.sendStatus(501);
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}

export async function deleteUrl(req, res){
    try{
        res.sendStatus(501);
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}