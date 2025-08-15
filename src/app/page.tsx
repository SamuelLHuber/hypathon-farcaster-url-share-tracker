import { Metadata } from "next";
import App from "./app";
import { APP_URL, APP_NAME, APP_DESCRIPTION, APP_OG_IMAGE_URL } from "~/lib/constants";
import { getFrameEmbedMetadata } from "~/lib/utils";

export const revalidate = 300;

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ url?: string }> }): Promise<Metadata> {
  const { url } = await searchParams;
  const ogImageUrl = url 
    ? `${APP_URL}/api/opengraph-image?url=${encodeURIComponent(url)}`
    : APP_OG_IMAGE_URL;

  return {
    title: APP_NAME,
    openGraph: {
      title: APP_NAME,
      description: APP_DESCRIPTION,
      images: [ogImageUrl],
    },
    other: {
      "fc:frame": JSON.stringify(getFrameEmbedMetadata(ogImageUrl)),
      "fc:miniapp": JSON.stringify(getFrameEmbedMetadata(ogImageUrl)),
    },
  };
}

export default function Home() {
  return (<App />);
}
