import { NextResponse, NextRequest } from 'next/server'
import { verifyAuthJWT } from './lib/auth/auth'
 
export async function middleware(request) {
try {
  console.log("MW ran")
  console.log('request', request.nextUrl.pathname)
  if(!request.cookies.has('user'))
  {
    console.log("no Cookies found under that name")
    return NextResponse.rewrite(new URL('/login', request.url))
  }
  const token = request.cookies.get('user')
  let accessGranted = await verifyAuthJWT(token.value)
  if(!accessGranted)
  {
    console.log("NO Access was granted please login")
    return NextResponse.rewrite(new URL('/login', request.url)) 
  }
  return NextResponse.next()
} catch (error) {
  console.log("there was an error", error)
}
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/bugs/:path*','/users/:path*']
}


