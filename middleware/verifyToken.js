
import  jwt  from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try {
      const token = req.headers['authorization'];
      console.log('Token from frontend:', token);
      if (!token) {
        console.log("token",token)
        return res.status(401).send({ message: 'Unauthorized' });
      }
    
      jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err) {
          return res.status(403).send({ message: 'Invalid Token' });
        }
    
        req.user = decoded;
        console.log(req.user,"req.user");
        next();
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  };
