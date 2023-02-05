import * as jwt from "jsonwebtoken";

import {Request, Response, NextFunction} from "express";

export function ensureToken(req: Request, res: Response, next: NextFunction): void {
    const bearerHeader = req.headers.authorization;

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, 'secretkey', (err, result) => {
            if (err) {
                res.sendStatus(403);
            } else {
                next();
            }
        })
    } else {
        res.sendStatus(403);
    }
}
