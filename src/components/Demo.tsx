"use client";

import { useEffect, useState } from "react";
import { useMiniApp } from "@neynar/react";
import { Header } from "~/components/ui/Header";
import { URLHitsTracker } from "~/components/URLHitsTracker";

interface NeynarUser {
  fid: number;
  score: number;
}

export default function Demo() {
  const { isSDKLoaded, context } = useMiniApp();
  const [neynarUser, setNeynarUser] = useState<NeynarUser | null>(null);

  useEffect(() => {
    console.log("isSDKLoaded", isSDKLoaded);
    console.log("context", context);
  }, [context, isSDKLoaded]);

  // Fetch Neynar user object when context is available
  useEffect(() => {
    const fetchNeynarUserObject = async () => {
      if (context?.user?.fid) {
        try {
          const response = await fetch(`/api/users?fids=${context.user.fid}`);
          const data = await response.json();
          if (data.users?.[0]) {
            setNeynarUser(data.users[0]);
          }
        } catch (error) {
          console.error("Failed to fetch Neynar user object:", error);
        }
      }
    };

    fetchNeynarUserObject();
  }, [context?.user?.fid]);


  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        paddingTop: context?.client.safeAreaInsets?.top ?? 0,
        paddingBottom: context?.client.safeAreaInsets?.bottom ?? 0,
        paddingLeft: context?.client.safeAreaInsets?.left ?? 0,
        paddingRight: context?.client.safeAreaInsets?.right ?? 0,
      }}
    >
      <div className="mx-auto py-2 px-4">
        <Header neynarUser={neynarUser} />
        <URLHitsTracker />
      </div>
    </div>
  );
}

