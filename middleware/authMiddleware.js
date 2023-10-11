const authMiddleware = (req, res, next) => {
    const isAdmin = req.user && req.user.role === 'admin';
  
    if (!isAdmin) {
      return res.status(403).send('Access denied. Only admins can perform this action.');
    }
  
    next();
  };
  
  module.exports = authMiddleware;
  