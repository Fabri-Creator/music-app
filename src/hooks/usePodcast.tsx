import { useEffect, useState } from "react";
import { Entry } from "../types";

const STORAGE_PODCAST_DETAIL = 'podcastDetail';

const usePodcastDetail = (id: string | undefined): [Entry | undefined, boolean, boolean] => {
    const [details, setDetails] = useState<Entry | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(false);

            try {
                let podcastDetailArray: Entry[] = [];
                const storedData = localStorage.getItem(STORAGE_PODCAST_DETAIL);
                if (storedData) {
                    podcastDetailArray = JSON.parse(storedData);
                }

                // Verificar que id tenga un valor antes de comparar
                if (id) {
                    const cachedEntry = podcastDetailArray.find(podcast => podcast.id.toString() === id);

                    if (cachedEntry) {
                        // Si encontramos un caché, establecemos los datos y salimos
                        setDetails(cachedEntry.value);
                        setLoading(false);
                        return;
                    }
                }

                // Si no hay caché para este ID o id es undefined, hacemos la llamada a la API
                const response = await fetch(`https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`);

                if (!response.ok) {
                    throw new Error(`Error ${response.status}`);
                }

                const jsonData = await response.json();
                setDetails(jsonData);

                // Actualizamos el caché con la nueva entrada
                const updatedPodcastDetailArray = [
                    ...podcastDetailArray,
                    { id, value: jsonData }
                ];

                localStorage.setItem(STORAGE_PODCAST_DETAIL, JSON.stringify(updatedPodcastDetailArray));
                setLoading(false);
            } catch (error) {
                console.error("Fetch error:", error);
                setError(true);
                setLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    return [details, loading, error];
};

export default usePodcastDetail;
