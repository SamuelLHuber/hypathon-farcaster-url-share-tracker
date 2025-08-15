"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/input";
import { ShareButton } from "~/components/ui/Share";

interface URLHitsResult {
  url: string;
  unique_hits: number;
}

type LoadingStage = "idle" | "initiating" | "searching" | "analyzing" | "finalizing";

export function URLHitsTracker() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState<LoadingStage>("idle");
  const [result, setResult] = useState<URLHitsResult | null>(null);
  const [error, setError] = useState("");
  const [elapsedTime, setElapsedTime] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSubmit = useCallback(async () => {
    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    abortControllerRef.current = new AbortController();
    setIsLoading(true);
    setLoadingStage("initiating");
    setError("");
    setResult(null);
    setElapsedTime(0);

    try {
      const response = await fetch(`/api/url-hits?url=${encodeURIComponent(url.trim())}`, {
        signal: abortControllerRef.current.signal
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch data");
      }

      const data: URLHitsResult = await response.json();
      setResult(data);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        setError("Search was cancelled");
      } else {
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
      setLoadingStage("idle");
      setElapsedTime(0);
      abortControllerRef.current = null;
    }
  }, [url]);

  const handleCancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  const handleClear = useCallback(() => {
    setUrl("");
    setResult(null);
    setError("");
  }, []);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleSubmit();
    }
  }, [handleSubmit, isLoading]);

  // Progressive loading stage management
  useEffect(() => {
    if (!isLoading) return;

    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 100);
    }, 100);

    return () => clearInterval(timer);
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) return;

    const stageTimers: NodeJS.Timeout[] = [
      setTimeout(() => setLoadingStage("searching"), 500),
      setTimeout(() => setLoadingStage("analyzing"), 3000),
      setTimeout(() => setLoadingStage("finalizing"), 8000),
    ];

    return () => stageTimers.forEach(clearTimeout);
  }, [isLoading]);

  const getLoadingMessage = () => {
    const dots = ".".repeat((Math.floor(elapsedTime / 500) % 3) + 1);
    switch (loadingStage) {
      case "initiating": return `Initiating search${dots}`;
      case "searching": return `Searching through casts${dots}`;
      case "analyzing": return `Analyzing embeddings${dots}`;
      case "finalizing": return `Finalizing results${dots}`;
      default: return "Loading...";
    }
  };

  const getEstimatedTime = () => {
    if (elapsedTime < 3000) return "This should take just a moment, we're looking in cache";
    if (elapsedTime < 8000) return "Still working... this might take >5 minutes";
    if (elapsedTime < 15000) return "Complex query detected, please wait a bit longer";
    return "Almost there, thank you for your patience";
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] px-6">
      <div className="w-full max-w-md mx-auto space-y-4">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold mb-2">URL Hits Tracker</h2>
          <p className="text-sm text-muted-foreground">
            Enter a URL to see how many unique casts mention it
          </p>
        </div>

        <div className="space-y-3">
          <Input
            type="text"
            placeholder="Enter URL (e.g., morpho.dtech.vision)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="w-full"
          />

          <div className="flex gap-2">
            <Button
              onClick={handleSubmit}
              disabled={isLoading || !url.trim()}
              isLoading={isLoading}
              className="flex-1"
            >
              {isLoading ? getLoadingMessage() : "Search"}
            </Button>
            
            {isLoading && (
              <Button
                onClick={handleCancel}
                className="px-4 bg-orange hover:bg-orange/80"
              >
                Cancel
              </Button>
            )}
            
            {!isLoading && (result || error) && (
              <Button
                onClick={handleClear}
                className="px-4 bg-sophisticated-gray hover:bg-medium-gray"
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        {isLoading && (
          <div className="p-4 bg-accent-low border border-accent-low-light rounded-lg animate-pulse">
            <div className="flex items-center justify-center mb-3">
              <div className="animate-spin h-6 w-6 border-2 border-brand-purple border-t-transparent rounded-full mr-3" />
              <p className="text-accent-high font-medium">{getLoadingMessage()}</p>
            </div>
            <p className="text-accent-high text-sm text-center">{getEstimatedTime()}</p>
            <div className="mt-3 bg-card rounded p-3 border border-border">
              <div className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="p-4 bg-card border border-border rounded-lg transform transition-all duration-300 animate-in fade-in slide-in-from-bottom-2">
            <h3 className="font-medium text-brand-purple mb-2">Results</h3>
            <div className="space-y-1 text-sm">
              <p className="text-foreground">
                <span className="font-medium">URL:</span> {result.url}
              </p>
              <p className="text-foreground">
                <span className="font-medium">Unique Hits:</span> 
                <span className="text-lg font-bold text-brand-purple ml-1 animate-pulse">
                  {result.unique_hits.toLocaleString()}
                </span>
              </p>
            </div>
            
            <div className="mt-3 pt-3 border-t border-border">
              <ShareButton
                buttonText="📢 Share Discovery"
                cast={{
                  text: `🔍 Just discovered https://${result.url} has gone viral with ${result.unique_hits.toLocaleString()} unique mentions on Farcaster and Base! Check your domain! 👇 ${process.env.NEXT_PUBLIC_APPURL || window.location.origin}`,
                  embeds: [
                    `${process.env.NEXT_PUBLIC_APPURL || window.location.origin}`,
                  ],
                }}
                className="w-full bg-corporate-navy hover:bg-corporate-navy/80"
              />
            </div>
          </div>
        )}

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Powered by dTech.vision
          </p>
        </div>
      </div>
    </div>
  );
}
