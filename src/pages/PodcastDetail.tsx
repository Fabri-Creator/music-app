import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import SideDetail from '../components/SideDetail';
import useEpisodesData from '../hooks/useEpisodesData';
import usePodcasterData from '../hooks/usePodcasterData';
import CustomTable from '../components/CustomTable';
import { Entry } from '../types';

function PodcastDetail() {
    const { id } = useParams<{ id: string }>();
    const [episodesData, isLoading, hasError] = useEpisodesData(id);
    const [data] = usePodcasterData();

    const [podcastDetail, setPodcastDetail] = useState<Entry | null>(null);

    useEffect(() => {
        const filteredPodcast = data?.feed.entry?.find((podcast: Entry) => podcast.id.attributes['im:id'] === id);
        setPodcastDetail(filteredPodcast || null);
    }, [data, id]);

    // Extract only episodes. First element of episodeData brings only podcast general information
    const filterdEpisodes = episodesData?.results.slice(1);

    if (isLoading) {
        return <div>Loading...</div>;
    } 1

    if (hasError || !episodesData) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <p>Error loading data. Press Podcaster logo</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Header />
            <div className="flex my-4 mx-4 p-4 bg-white">
                <SideDetail podcastDetail={podcastDetail} />

                <div className="flex-1">
                    <div className="p-4 bg-white shadow border border-gray-300 mb-4 rounded-lg">
                        <h4>{`Episodes: ${filterdEpisodes.length}`}</h4>
                    </div>
                    {<CustomTable episodes={filterdEpisodes} podcastId={id} ></CustomTable>}
                </div>
            </div>
        </div>
    );
}

export default PodcastDetail;
