import { jwtVerify, SignJWT } from "jose"

export const verifyAuthJWT = async (token, type) => {
    try {
        const {payload} = await jwtVerify(token, new TextEncoder().encode(getJWTKey(type)))     
        return payload 
    } catch (error) {
        console.log(error)
    }
}


export const getJWTKey = (type) => {
 let secret;
 if(type === "Session")
 {
    secret = process.env.SESSION_PASSWORD
 }
 if(type === "Auth")
 {
    secret = process.env.AUTH_PASSWORD
 }

 if(!secret || secret.length === 0 )
 {
    throw new Error("Interesting no secret to find")
 }

 return secret
}

export const createSessionToken = async (user, type) => {
    console.log("creating SessionToken")
    const secret = new TextEncoder().encode( getJWTKey(type))
    const alg = 'HS256'
    const jwt = await new SignJWT({user : user._id})
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime('2d')
      .sign(secret)
    return jwt
  };

  export const createAuthToken = async (sessionId, type) => {
    console.log("creating AuthToken")
    const secret = new TextEncoder().encode( getJWTKey(type))
    const alg = 'HS256'
    const jwt = await new SignJWT({user : sessionId})
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime('2d')
      .sign(secret)
    return jwt
  };