const jwt = require('jsonwebtoken');


let authToken = (req, res, next) => {
    let token = req.get('token');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                error: err
            });
        };

        req.users = decoded.users;
        next();
    });
};


module.exports = {
    authToken
}