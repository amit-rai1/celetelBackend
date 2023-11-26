
import  jwt  from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Assuming the token is in the Authorization header

  if (token) {
      jwt.verify(token, 'secretkey', (err, decoded) => {
          if (err) {
              // Token is invalid or expired
              return res.status(401).json({ message: 'Unauthorized' });
          } else {
              // Token is valid, store user details (including role) in req.user
              req.user = decoded; // decoded contains user details, including the role
              console.log(req.user,"user1")
              next(); // Proceed to the next middleware or route handler
          }
      });
  } else {
      // No token provided
      res.status(401).json({ message: 'No token provided' });
  }
};
