const AuthConfig = {
  JWTsecretKey: process.env.JWT_SECRET_KEY || "vxace",
  expiresIn: process.env.JWT_EXPIRES_IN || "1h"
}

export default AuthConfig;
