import { NextResponse } from 'next/server';
import { db } from '~/db';
import { sql } from 'drizzle-orm';
import { getUrlHits, setUrlHits } from '~/lib/kv';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  
  if (!url) {
    return NextResponse.json(
      { error: 'URL parameter is required' },
      { status: 400 }
    );
  }

  if (url === 'example.org') {
    return NextResponse.json({ 
      url,
      unique_hits: 1337
    });
  }

  try {
    // Check cache first
    const cachedHits = await getUrlHits(url);
    if (cachedHits !== null) {
      return NextResponse.json({ 
        url,
        unique_hits: cachedHits
      });
    }

    // Cache miss - query database
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

    const uniqueHits = parseInt(result.rows[0]?.unique_hits as string || '0');

    // Store in cache
    try {
      await setUrlHits(url, uniqueHits);
    } catch (cacheError) {
      console.error('Failed to cache URL hits:', cacheError);
      // Continue even if caching fails
    }

    return NextResponse.json({ 
      url,
      unique_hits: uniqueHits
    });
  } catch (error) {
    console.error('Failed to query casts:', error);
    return NextResponse.json(
      { error: 'Failed to query database' },
      { status: 500 }
    );
  }
}