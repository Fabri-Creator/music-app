/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { RootObject } from "../types";

const STORAGE_PODCAST_DATA = 'podcastData';
const CACHE_EXPIRATION_TIME_MS = 24 * 60 * 60 * 1000;

const usePodcasterData = (): [RootObject | undefined, boolean, boolean] => {
    const [podcastData, setPodcastData] = useState<RootObject | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchPodcastData = async () => {
            setIsLoading(true);
            setHasError(false);

            try {
                const storedData = localStorage.getItem(STORAGE_PODCAST_DATA);

                if (storedData) {
                    const { timestamp, value } = JSON.parse(storedData);

                    if (Date.now() - timestamp < CACHE_EXPIRATION_TIME_MS) {
                        setPodcastData(value);
                        setIsLoading(false);
                        return;
                    }
                }

                const response = await fetch(`https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`);

                if (!response.ok) {
                    throw new Error(`Error ${response.status}`);
                }

                const jsonData = await response.json();

                setPodcastData(jsonData);
                localStorage.setItem(STORAGE_PODCAST_DATA, JSON.stringify({ timestamp: Date.now(), value: jsonData }));
            } catch (error) {
                console.error("Fetch error:", error);
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPodcastData();
    }, []);

    return [podcastData, isLoading, hasError];
};

export default usePodcasterData;
