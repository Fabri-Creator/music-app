import { useState, useEffect } from 'react';
import { Entry } from "../types";
import PodcastCard from "./PodcastCard";
import useData from '../hooks/useData';

function PodcastList() {
    const [data, loading, error] = useData();
    const [searchText, setSearchText] = useState('');
    const [filteredPodcasts, setFilteredPodcasts] = useState<Entry[]>([]);
    const [entryCount, setEntryCount] = useState<number>(0);

    useEffect(() => {
        if (data && data.feed && data.feed.entry) {
            setFilteredPodcasts(data.feed.entry);
            setEntryCount(data.feed.entry.length);
        }
    }, [data]);

    const filterPodcasts = (entry: Entry[], searchText: string) => {
        return entry.filter((podcast: Entry) =>
            podcast.title.label.toLowerCase().includes(searchText.toLowerCase()) ||
            podcast['im:artist'].label.toLowerCase().includes(searchText.toLowerCase())
        );
    };

    useEffect(() => {
        if (data && data.feed && data.feed.entry) {
            const filtered = filterPodcasts(data.feed.entry, searchText);
            setFilteredPodcasts(filtered);
            setEntryCount(filtered.length);
        }
    }, [searchText, data]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !data || !data.feed || !data.feed.entry) {
        return <div>Error loading data</div>;
    }

    return (
        <>
            <div className="p-4 flex justify-end items-center">
                <div className="ml-4 bg-blue-400 text-white px-4 mx-4 py-2 rounded h-10 flex items-center">
                    {entryCount}
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
