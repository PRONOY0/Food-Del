const jwt = require('jsonwebtoken');


exports.authMiddleware = async (req,res,next) => {
        const {token} = req.headers;

        if(!token){
            return res.status(401).json({
                "success": false,
                "message": "Token invalid or Not authorized"
            });
        }
        try{
            const token_decode = jwt.verify(token,process.env.JWT_SECRET);
            req.body.userId = token_decode.id;
            next();
    } catch (error) {
        res.status(500).json({
            "success": false,
            "message": `Failed to authorize due to: ${error}`
        });
    }
}