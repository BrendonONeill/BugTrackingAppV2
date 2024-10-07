import { jwtVerify, SignJWT } from "jose"

export const verifyAuthJWT = async (token, type) => {
    try {
        const {payload} = await jwtVerify(token, new TextEncoder().encode(getJWTKey(type)))    
        return payload;
    } catch (error) {
        return null;
    }
}

export const getJWTKey = (type) => {
 let secret;
 if(type === "Refresh")
 {
    secret = process.env.REFRESH_PASSWORD
 }
 if(type === "Access")
 {
    secret = process.env.ACCESS_PASSWORD
 }

 if(!secret || secret.length === 0 )
 {
    throw new Error("Interesting no secret to find")
 }

 return secret
}

export const createRefreshToken = async (user, type) => {
    console.log("creating RefreshToken")
    const secret = new TextEncoder().encode( getJWTKey(type))
    const alg = 'HS256'
    const jwt = await new SignJWT({user : user})
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime('2d')
      .sign(secret)
    return jwt
  };

  export const createAccessToken = async (user, type) => {
    console.log("creating AccessToken")
    const secret = new TextEncoder().encode( getJWTKey(type))
    const alg = 'HS256'
    const jwt = await new SignJWT({user : user})
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(secret)
    return jwt
  };