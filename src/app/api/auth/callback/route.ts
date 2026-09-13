import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  
  // Create the new URL
  const destination = new URL('/auth-callback', origin)
  
  // Copy all search params (like ?code=... or ?error=...)
  searchParams.forEach((value, key) => {
    destination.searchParams.append(key, value)
  })

  // Redirect to the client-side callback handler
  // Note: Browsers automatically preserve the URL hash (e.g. #access_token=...) across 302 redirects!
  return NextResponse.redirect(destination)
}

