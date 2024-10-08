import { NextResponse } from 'next/server'
import { verifyAuthJWT } from './lib/auth/auth'
 
export async function middleware(request) {
try {
    console.log("MW ran")
    const checkAccessCookie = request.cookies.get('cookie-access')
    if(checkAccessCookie){
      const accessToken = request.cookies.get('accessToken')
      const refreshToken = request.cookies.get('refreshToken')
      if(accessToken)
      {
        let {user} = await verifyAuthJWT(accessToken.value, "Access")
        let res = routes(request, user)
        return res
      }
      else if(refreshToken && !accessToken)
      {
        console.log("no access token found")
        const res = NextResponse.next()
        res.headers.set('x-noaccesstoken','true')
        return res;
      }
      else
      {
        console.log("no refresh token was found please login")
        return NextResponse.redirect(new URL('/login', request.url))
      }
      
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


function routes(req, user)
{
  const pathName = req.nextUrl.pathname
  if(pathName.startsWith("/users"))
  {
        if(pathName === "/users/profile")
        {
          return NextResponse.next()
        }      
        if(user.role == "User")
        {
          return NextResponse.redirect(new URL('/bugs', req.url))
        }
  }
  if(pathName === "/")
  {
    console.log("redirected to /bugs")
    return NextResponse.redirect(new URL('/bugs', req.url))
  }
  
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/bugs/:path*','/users/:path*', '/']
}


