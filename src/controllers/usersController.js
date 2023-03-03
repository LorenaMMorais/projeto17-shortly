import db from '../db.js';

export async function getUser(req, res){
    const {id} = req.params;

    try{
        const user = await db.query(`
            SELECT us.id, us.name, SUM(ur."visitCount") as "visitCount"
            FROM users us JOIN urls ur ON us.id = ur."userId"
            WHERE us.id = $1 GROUP BY us.id;
        `, [id]);

        if (!user.rows[0]) return res.sendStatus(404);

        const urls = await db.query(`
            SELECT id, "shortUrl", url, "visitCount"
            FROM urls WHERE urls."userId" = $1
        `, [id]);
        const {id: userId, name, visitCount} = user.rows[0];
        const body = {
            id: userId,
            name, 
            visitCount,
            shortenedUrls: urls.rows.map(_mapUrls)
        }
        res.send(body).status(200);
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

function _mapUrls(rowUrls) {
    const {id, shortUrl, url, visitCount} = rowUrls;
    return {
        id,
        shortUrl,
        url,
        visitCount
    }
}