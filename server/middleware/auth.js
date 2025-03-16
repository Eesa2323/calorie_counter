function auth (req, res, next) {

        try {
            const token = req.headers["x-auth-token"]
            if (!token) throw new Erro("No token provided")

            const decoded = jwt.verify(token, JWT_SECRET)
            req.user = decoded
            next()
            
        } catch (err) { 
        }
}