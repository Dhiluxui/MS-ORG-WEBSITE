import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { session }, error: sessionError } = await supabase.auth.getSession()
  const user = session?.user || null
  const { pathname } = request.nextUrl

  // Protect all /admin routes
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const hasAuthCookie = request.cookies.getAll().some(c => c.name.includes('-auth-token'));
    
    if (!hasAuthCookie && !user) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Redirect logged-in admins away from login page
  if (pathname === '/admin/login') {
    const hasAuthCookie = request.cookies.getAll().some(c => c.name.includes('-auth-token'));
    if (hasAuthCookie || user) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  // Protect portal routes
  const protectedRoutes = ['/home', '/org', '/profile', '/team', '/compete', '/community', '/leaderboards', '/apply-org', '/invite'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    // Loose check: just see if the browser sent the auth cookie. 
    // The client-side AuthContext will do the strict validation, and Supabase RLS protects the actual data.
    const hasAuthCookie = request.cookies.getAll().some(c => c.name.includes('-auth-token'));
    
    if (!hasAuthCookie && !user) {
      return NextResponse.redirect(new URL('/?error=middleware_no_auth_cookie', request.url));
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*', '/home/:path*', '/org/:path*', '/profile/:path*', '/team/:path*', '/compete/:path*', '/community/:path*', '/leaderboards/:path*', '/apply-org/:path*', '/invite/:path*'],
}
