import { useEffect, useState } from "react";
import { Entry } from "../types";

const STORAGE_PODCAST_DETAIL = 'podcastDetail';

const useEpisodesData = (podcastId: string | undefined): [Entry | undefined, boolean, boolean] => {
    const [episodesData, setEpisodesData] = useState<Entry | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchEpisodeData = async () => {
            setIsLoading(true);
            setHasError(false);

            try {
                let cachedPodcasts: Entry[] = [];
                const storedData = localStorage.getItem(STORAGE_PODCAST_DETAIL);
                if (storedData) {
                    cachedPodcasts = JSON.parse(storedData);
                }

                if (podcastId) {
                    const cachedPodcast = cachedPodcasts.find(podcast => podcast.id.toString() === podcastId);

                    if (cachedPodcast) {
                        setEpisodesData(cachedPodcast.value);
                        setIsLoading(false);
                        return;
                    }
                }

                const response = await fetch(`https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`);

                if (!response.ok) {
                    throw new Error(`Error ${response.status}`);
                }

                const jsonData = await response.json();
                setEpisodesData(jsonData);

                const updatedCache = [
                    ...cachedPodcasts,
                    { id: podcastId, value: jsonData }
                ];

                localStorage.setItem(STORAGE_PODCAST_DETAIL, JSON.stringify(updatedCache));
                setIsLoading(false);
            } catch (error) {
                console.error("Fetch error:", error);
                setHasError(true);
                setIsLoading(false);
            }
        };

        if (podcastId) {
            fetchEpisodeData();
        }
    }, [podcastId]);

    return [episodesData, isLoading, hasError];
};

export default useEpisodesData;
