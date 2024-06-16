import { useState, useEffect } from 'react';
import { Entry } from "../types";
import PodcastCard from "./PodcastCard";
import usePodcasterData from '../hooks/usePodcasterData';

function PodcastList() {
    const [podcastData, loading, error] = usePodcasterData();
    const [searchText, setSearchText] = useState('');
    const [filteredPodcasts, setFilteredPodcasts] = useState<Entry[]>([]);
    const [episodesCount, setEpisodesCount] = useState<number>(0);

    useEffect(() => {
        if (podcastData && podcastData.feed && podcastData.feed.entry) {
            setFilteredPodcasts(podcastData.feed.entry);
            setEpisodesCount(podcastData.feed.entry.length);
        }
    }, [podcastData]);

    const filterPodcasts = (entry: Entry[], searchText: string) => {
        return entry.filter((podcast: Entry) =>
            podcast.title.label.toLowerCase().includes(searchText.toLowerCase()) ||
            podcast['im:artist'].label.toLowerCase().includes(searchText.toLowerCase())
        );
    };

    useEffect(() => {
        if (podcastData && podcastData.feed && podcastData.feed.entry) {
            const filtered = filterPodcasts(podcastData.feed.entry, searchText);
            setFilteredPodcasts(filtered);
            setEpisodesCount(filtered.length);
        }
    }, [searchText, podcastData]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !podcastData || !podcastData.feed || !podcastData.feed.entry) {
        return <div>Error loading data</div>;
    }

    return (
        <>
            <div className="p-4 flex justify-end items-center">
                <div className="ml-4 bg-blue-400 text-white px-4 mx-4 py-2 rounded h-10 flex items-center">
                    {episodesCount}
                </div>
                <input
                    type="text"
                    placeholder="Search podcasts..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-1/3 p-2 border border-gray-300 rounded"
                    style={{ height: '2.5rem' }}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-4">
                {filteredPodcasts.map((podcast: Entry, index: number) => (
                    <PodcastCard key={index} podcastInfo={podcast} />
                ))}
            </div>
        </>
    );
}

export default PodcastList;
