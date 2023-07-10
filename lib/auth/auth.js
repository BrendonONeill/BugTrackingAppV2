import { jwtVerify, SignJWT } from "jose"

export const verifyAuthJWT = async (token) => {
    try {
        const verify = await jwtVerify(token, new TextEncoder().encode(getJWTKey()))
        return verify.payload 
    } catch (error) {
        
    }
}

export const getJWTKey = () => {
 const secret = process.env.JWT_PASSWORD

 if(!secret || secret.length === 0 )
 {
    throw new Error("Interesting no secret to find")
 }

 return secret
}

export const createCookieToken = async (user) => {
    const secret = new TextEncoder().encode( getJWTKey())
    const alg = 'HS256'
    const jwt = await new SignJWT({user : user._id})
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime('2d')
      .sign(secret)
    return jwt
  };