import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import SideDetail from '../components/SideDetail';
import usePodcast from '../hooks/usePodcast';
import useData from '../hooks/useData';
import { Entry, Result } from '../types';

function EpisodeDetail() {
    const { id, trackId } = useParams<{ id: string, trackId: string }>();
    const [podcastData] = usePodcast(id);
    const [podcastDetail, setPodcastDetail] = useState<Entry | null>(null);
    const [data] = useData();
    const [episode, setEpisode] = useState<Result | null>(null);

    useEffect(() => {
        const filteredPodcast = data?.feed.entry?.find((podcast: Entry) => podcast.id.attributes['im:id'] === id);
        setPodcastDetail(filteredPodcast || null);
    }, [data, id]);

    useEffect(() => {
        if (podcastData) {
            const filteredEpisode = podcastData.results.slice(1).find((ep: Result) => ep.trackId.toString() === trackId);
            setEpisode(filteredEpisode || null);
        }
    }, [podcastData, trackId]);

    if (!episode) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <div className="flex my-4 mx-4 p-4 bg-white">
                <SideDetail podcastDetail={podcastDetail} />

                {episode && episode.episodeUrl && (
                    <div className="flex-1 ml-4 border border-gray-300 shadow rounded-lg">
                        <div className="px-6 py-4">
                            <h4 className="text-lg">{episode.trackName}</h4>
                        </div>
                        <div className="px-6 py-2">
                            <p className="text-sm text-gray-600 text-justify">{episode.description}</p>
                        </div>
                        <audio controls className="w-4/5 mx-auto bg-gray-100 my-4">
                            <source src={episode.episodeUrl} type="audio/mpeg" />
                        </audio>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EpisodeDetail;
