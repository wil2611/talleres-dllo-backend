"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const authorize = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user.roles.includes(requiredRole)) {
            return res.status(403).send({ error: 'No autorizado' });
        }
        next();
    };
};
exports.authorize = authorize;
