import { NextResponse, NextRequest } from 'next/server'
import { verifyAuthJWT } from './lib/auth/auth'
 
export async function middleware(request) {
try {
    console.log("MW ran")
    console.log('request', request.nextUrl.pathname)
    const checkAccessCookie = request.cookies.get('cookie-access')
    if(checkAccessCookie){
      const accessToken = request.cookies.get('accessToken')
      const refreshToken = request.cookies.get('refreshToken')
      if(accessToken)
      {
        let user = await verifyAuthJWT(accessToken.value, "Access")
        routes(request.nextUrl.pathname, user)
      }
      else if(refreshToken && !accessToken)
      {
        console.log("no access token found")
        const res = NextResponse.next()
        res.headers.set('x-noaccesstoken','true')
        return res;
        // CANT ACCESS MONGODB FROM HERE NEED A DIFFERENT IDEA 
        //let user = await verifyAuthJWT(accessToken.value, "Refresh")
        // check if 
        // create access key
        //routes(request.nextUrl.pathname, user)
      }
      else
      {
        console.log("no refresh token was found please login")
        return NextResponse.redirect(new URL('/login', request.url))
      }
      
      return NextResponse.next()
    }
    else
    {
      console.log("didn't accept cookies")
      return NextResponse.redirect(new URL('/login', request.url))
    }
} catch (error) {
  console.log("there was an error", error)
}
}


function routes(pathName, user)
{
  if(pathName === "/")
  {
    console.log("redirected to /bugs")
    return NextResponse.redirect(new URL('/bugs', request.url))
  }
  if(pathName.startsWith("/users"))
  {
      if(user.role === "User")
      {
        return NextResponse.redirect(new URL('/bugs', request.url))
      }
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/bugs/:path*','/users/:path*', '/']
}


