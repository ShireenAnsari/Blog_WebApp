export const extractToken = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        return res.status(401).json('Not authenticated');
    }

    const token = authorizationHeader.split(' ')[1];
    req.token = token;
    next();
};