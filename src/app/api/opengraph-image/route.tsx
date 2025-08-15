import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { getUrlHits } from "~/lib/kv";

export const dynamic = 'force-dynamic';

function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
    return urlObj.hostname.replace('www.', '');
  } catch {
    return url;
  }
}

function formatHitCount(hits: number): string {
  if (hits >= 1000000) return `${(hits / 1000000).toFixed(1)}M`;
  if (hits >= 1000) return `${(hits / 1000).toFixed(1)}K`;
  return hits.toString();
}

function getMilestoneEmoji(hits: number): string {
  if (hits >= 1000000) return "🚀";
  if (hits >= 100000) return "🔥";
  if (hits >= 10000) return "⭐";
  if (hits >= 1000) return "🎉";
  if (hits >= 100) return "✨";
  return "🌟";
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return new ImageResponse(
      (
        <div tw="flex h-full w-full flex-col justify-center items-center bg-gradient-to-br from-purple-600 to-blue-600">
          <h1 tw="text-6xl text-white">Missing URL</h1>
          <p tw="text-3xl mt-4 text-white opacity-80">Please provide a URL parameter</p>
        </div>
      ),
      { width: 1200, height: 800 }
    );
  }

  const hits = await getUrlHits(url);
  const domain = extractDomain(url);
  
  // Show "TRY NOW" if no cache hit
  if (hits === null || hits === 0) {
    return new ImageResponse(
      (
        <div tw="flex h-full w-full flex-col justify-center items-center relative" style={{ background: 'linear-gradient(135deg, #002195 0%, #CF58FA 50%, #00FDFE 100%)' }}>
          <div tw="absolute top-8 left-8 opacity-80 text-2xl" style={{ color: '#ffffff' }}>
            Farcaster Stats
          </div>
          
          <div tw="flex flex-col items-center justify-center">
            <div tw="text-9xl mb-4">
              🌟
            </div>
            
            <div tw="flex flex-col items-center mb-8">
              <h1 tw="text-7xl font-bold mb-2 text-center" style={{ color: '#ffffff' }}>
                TRY NOW
              </h1>
              <p tw="text-4xl mb-4" style={{ color: '#ffffff', opacity: 0.9 }}>
                Be the first to share
              </p>
            </div>
            
            <div tw="flex flex-col items-center">
              <h2 tw="text-5xl font-semibold text-center max-w-4xl" style={{ color: '#ffffff' }}>
                {domain}
              </h2>
            </div>
          </div>
          
          <div tw="absolute bottom-8 right-8 opacity-60 text-2xl" style={{ color: '#ffffff' }}>
            🦅 Powered by dTech.vision
          </div>
        </div>
      ),
      { width: 1200, height: 800 }
    );
  }

  const formattedHits = formatHitCount(hits);
  const emoji = getMilestoneEmoji(hits);

  return new ImageResponse(
    (
      <div tw="flex h-full w-full flex-col justify-center items-center relative" style={{ background: 'linear-gradient(135deg, #002195 0%, #CF58FA 50%, #7b61ff 100%)' }}>
        <div tw="absolute top-8 left-8 opacity-80 text-2xl" style={{ color: '#ffffff' }}>
          Farcaster Stats
        </div>
        
        <div tw="flex flex-col items-center justify-center">
          <div tw="text-9xl mb-4">
            {emoji}
          </div>
          
          <div tw="flex flex-col items-center mb-8">
            <h1 tw="text-7xl font-bold mb-2 text-center" style={{ color: '#ffffff' }}>
              {formattedHits}
            </h1>
            <p tw="text-4xl mb-4" style={{ color: '#ffffff', opacity: 0.9 }}>
              {hits === 1 ? 'view' : 'views'}
            </p>
          </div>
          
          <div tw="flex flex-col items-center">
            <p tw="text-3xl mb-2" style={{ color: '#ffffff', opacity: 0.7 }}>
              on
            </p>
            <h2 tw="text-5xl font-semibold text-center max-w-4xl" style={{ color: '#ffffff' }}>
              {domain}
            </h2>
          </div>
        </div>
        
        <div tw="absolute bottom-8 right-8 opacity-60 text-2xl" style={{ color: '#ffffff' }}>
          🦅 Powered by dTech.vision
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 800,
    }
  );
}
