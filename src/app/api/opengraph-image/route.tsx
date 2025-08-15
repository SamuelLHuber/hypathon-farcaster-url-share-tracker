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

  const hits = await getUrlHits(url) || 0;
  const domain = extractDomain(url);
  const formattedHits = formatHitCount(hits);
  const emoji = getMilestoneEmoji(hits);

  return new ImageResponse(
    (
      <div tw="flex h-full w-full flex-col justify-center items-center relative bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
        <div tw="absolute top-8 left-8 text-white opacity-60 text-2xl">
          Farcaster Stats
        </div>
        
        <div tw="flex flex-col items-center justify-center">
          <div tw="text-9xl mb-4">
            {emoji}
          </div>
          
          <div tw="flex flex-col items-center mb-8">
            <h1 tw="text-7xl font-bold text-white mb-2 text-center">
              {formattedHits}
            </h1>
            <p tw="text-4xl text-white opacity-90 mb-4">
              {hits === 1 ? 'view' : 'views'}
            </p>
          </div>
          
          <div tw="flex flex-col items-center">
            <p tw="text-3xl text-white opacity-70 mb-2">
              on
            </p>
            <h2 tw="text-5xl font-semibold text-white text-center max-w-4xl">
              {domain}
            </h2>
          </div>
        </div>
        
        <div tw="absolute bottom-8 right-8 text-white opacity-60 text-2xl">
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
