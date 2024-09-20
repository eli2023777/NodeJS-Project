import jwt, { decode } from 'jsonwebtoken';
import { JWT_SECRET } from './config.mjs';

// Guard middleware to check if the user is logged in
export const guard = (req, res, next) => {
    jwt.verify(req.headers.authorization, JWT_SECRET, (err, data) => {
        if (err) {
            res.status(401).send('User not logged in');
        } else {
            req.user = data;
            next();
        }
    });
}


export const isSameUser = (req, res, next) => {
    const userReq = jwt.decode(req.headers.authorization);
    if (userReq._id === req.params.id) {
        return next();
    } else {
        return res.status(403).send('Access denied');
    }
};


export const isSameUserOrAdmin = (req, res, next) => {
    const userReq = jwt.decode(req.headers.authorization);
    if (userReq._id === req.params.id || userReq.isAdmin) {
        return next();
    } else {
        return res.status(403).send('Access denied');
    }
};

// Guard middleware to check if the user is admin
export const isAdmin = (req, res, next) => {
    const user = jwt.verify(req.headers.authorization, JWT_SECRET);

    if (!user.isAdmin) {
        res.status(403).send('Unauthorized');
    } else {
        next();
    }

}

// Guard middleware to check if the user is business user

export const isBusinessUser = (req, res, next) => {
    const user = jwt.verify(req.headers.authorization, JWT_SECRET);

    if (!user.isBusiness) {
        res.status(403).send('Unauthorized');
    } else {
        next();
    }

}