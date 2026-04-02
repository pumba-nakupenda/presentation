import { NextResponse } from 'next/server'

const COOKIE = 'prime_auth'
const PASSWORD = 'PRIMEXLOLLY'

export function proxy(request) {
  const { pathname } = request.nextUrl

  // Allow login page and static assets
  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico' ||
    pathname.startsWith('/docs/')
  ) {
    return NextResponse.next()
  }

  const auth = request.cookies.get(COOKIE)?.value
  if (auth === PASSWORD) return NextResponse.next()

  const loginUrl = request.nextUrl.clone()
  loginUrl.pathname = '/login'
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
