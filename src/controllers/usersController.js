import db from '../db.js';

export async function getUser(req, res){
    try{
        res.sendStatus(501);
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getRanking(req, res){
    try{
        const ranking = await db.query(`
            SELECT users.id, users.name, COUNT(url) as "linksCount",
            COALESCE(SUM(urls."visitCount"), 0) as "visitCount"
            FROM users LEFT JOIN urls ON users.id = urls."userId"
            GROUP BY users.id ORDER BY "visitCount" DESC LIMIT 10;
        `);
        res.send(ranking.rows).status(200);
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}