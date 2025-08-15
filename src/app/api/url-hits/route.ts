import { NextResponse } from 'next/server';
import { db } from '@/db';
import { sql } from 'drizzle-orm';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  
  if (!url) {
    return NextResponse.json(
      { error: 'URL parameter is required' },
      { status: 400 }
    );
  }

  try {
    const result = await db.execute(
      sql`
        SELECT COUNT(DISTINCT hash) AS unique_hits
        FROM casts
        WHERE
          text ILIKE ${'%' + url + '%'}
          OR EXISTS (
            SELECT 1
            FROM unnest(embeds) AS embed
            WHERE embed->>'url' ILIKE ${'%' + url + '%'}
          )
      `
    );

    const uniqueHits = result.rows[0]?.unique_hits || 0;

    return NextResponse.json({ 
      url,
      unique_hits: parseInt(uniqueHits as string)
    });
  } catch (error) {
    console.error('Failed to query casts:', error);
    return NextResponse.json(
      { error: 'Failed to query database' },
      { status: 500 }
    );
  }
}