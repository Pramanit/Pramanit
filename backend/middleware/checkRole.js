const { auth } = require('express-openid-connect');
const dotenv = require('dotenv');

dotenv.config();

// Middleware to check user roles
const checkRole = (role) => {
    return (req, res, next) => {
        // Check if the user is authenticated
        if (!req.oidc.isAuthenticated()) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Get user roles from app_metadata
        const userRoles = req.oidc.user[`https://${process.env.AUTH0_DOMAIN}/roles`]; // Adjusted to use proper namespace 
        console.log("User Roles:", userRoles);
        // Check if the user has the required role
        if (userRoles && userRoles.includes(role)) {
            return next(); // User has the required role, proceed to the route
        } else {
            return res.status(403).json({ message: 'Forbidden: You do not have access to this resource.' });
        }
    };
};

module.exports = checkRole;