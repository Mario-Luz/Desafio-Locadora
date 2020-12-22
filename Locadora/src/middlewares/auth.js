import jwt from 'jsonwebtoken'
import HttpStatus from 'http-status'


export default app => {
    return (req, res, next) => {
        const token = req.headers['authorization']
        if (!token) {
            return res.status(HttpStatus.UNAUTHORIZED).send({ auth: false, message: 'No token provided.' });
        }    
    
        jwt.verify(token, app.config.jwtSecret, (err, decoded) => {
          if (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ auth: false, message: err.message });
          }
          req.userId = decoded.id;
          next();
        })
      }
}
