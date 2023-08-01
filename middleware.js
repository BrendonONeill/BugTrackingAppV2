import { NextResponse, NextRequest } from 'next/server'
import { verifyAuthJWT } from './lib/auth/auth'
 
export async function middleware(request) {
try {
  console.log("MW ran")
  console.log('request', request.nextUrl.pathname)
  const test = request.cookies.get('cookie-access')
  if(test)
  {
  if(request.nextUrl.pathname === "/")
  {
    console.log("redirected to /bugs")
    return NextResponse.redirect(new URL('/bugs', request.url))
  }
  if(!request.cookies.has('user'))
  {
    console.log("no Cookies found under that name")
    return NextResponse.redirect(new URL('/login', request.url))
  }
  const token = request.cookies.get('user')
  let accessGranted = await verifyAuthJWT(token.value, "Auth")
  if(!accessGranted.user.sessionId)
  {
    console.log("NO Access was granted please login")
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if(request.nextUrl.pathname === "/users/profile")
  {
    console.log("users are allowed")
  }
  else if(request.nextUrl.pathname.startsWith("/users"))
  {
    if(accessGranted.user.role === "User")
    {
      return NextResponse.redirect(new URL('/bugs', request.url))
    }
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
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/bugs/:path*','/users/:path*', '/']
}


