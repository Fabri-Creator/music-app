/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { RootObject } from "../types";

const STORAGE_KEY = 'externalData';
const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const useData = (): [RootObject | undefined, boolean, boolean] => {
    const [data, setData] = useState<RootObject | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(false);

            try {
                const storedData = localStorage.getItem(STORAGE_KEY);

                if (storedData) {
                    const { timestamp, value } = JSON.parse(storedData);

                    if (Date.now() - timestamp < EXPIRATION_TIME) {
                        setData(value);
                        setLoading(false);
                        return;
                    }
                }

                const response = await fetch(`https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`);

                if (!response.ok) {
                    throw new Error(`Error ${response.status}`);
                }

                const jsonData = await response.json();


                setData(jsonData);
                localStorage.setItem(STORAGE_KEY, JSON.stringify({ timestamp: Date.now(), value: jsonData }));
            } catch (error) {
                console.error("Fetch error:", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return [data, loading, error];
};

export default useData;
