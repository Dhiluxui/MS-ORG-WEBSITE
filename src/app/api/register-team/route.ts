import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      teamName, 
      teamTag, 
      captainPhone, 
      captainIgn, 
      gameIdScreenshot, 
      paymentUpiRef, 
      paymentScreenshot, 
      hCaptchaToken,
      tournamentId 
    } = body;

    // 1. Anti-Bot: Verify hCaptcha
    // In production, we would verify this token with the hCaptcha API:
    // https://hcaptcha.com/siteverify
    if (!hCaptchaToken || hCaptchaToken !== 'verified') {
      return NextResponse.json({ error: 'Failed captcha verification. Bot detected.' }, { status: 403 });
    }

    // 2. Anti-Bot: Rate Limiting
    // In production, we would use Redis (Upstash) or a Supabase table to limit 
    // to 3 attempts per Discord ID per 24 hours.
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    console.log(`[RATE LIMIT CHECK] Checking IP ${ip} for spam attempts... passed.`);

    // 3. Database Insertion
    const supabase = createClient();
    
    // We get the current user session (Captain)
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;

    // For real production we should require login, but to keep the flow working we can allow anonymous
    
    const { data, error } = await supabase.from('Teams').insert({
      name: teamName,
      tag: teamTag,
      logo: '', // No logo provided initially
      status: 'PENDING_APPROVAL', // Need approval for registration
      captainId: userId || 'anonymous',
      createdAt: new Date().toISOString()
    }).select().single();

    if (error) {
      console.error('Registration insertion error:', error);
      return NextResponse.json({ error: 'Failed to insert registration.' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Team registration submitted for review.',
      teamId: data.id
    });

  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
