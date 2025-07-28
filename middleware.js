import { NextResponse } from 'next/server';

export function middleware(request) {
  const { country } = request.geo?.country || 'XX';

  if (country !== 'BR') {
    return new Response(
      'This website is only available in Brazil',{
      status: 403,
    });
  }

    return NextResponse.next();
}

export const config = {
  matcher: ['/', '/(.*)'],
};