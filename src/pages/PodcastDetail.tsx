import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import usePodcast from '../hooks/usePodcast';
import useData from '../hooks/useData';
import { Card, CardHeader, Image, Divider, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { Entry } from '../types';

const millisToMinutesAndSeconds = (millis: number) => {
    const hours = Math.floor(millis / 3600000);
    const minutes = Math.floor((millis % 3600000) / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

function Detail() {
    const { id } = useParams<{ id: string }>();
    const [details, loading, error] = usePodcast(id);
    const [data] = useData();
    const [podcastDetail, setPodcastDetail] = useState<Entry | null>(null);
    const [episodes, setEpisodes] = useState(0);

    useEffect(() => {
        const filterPodcast = data?.feed.entry?.find((podcast: Entry) => podcast.id.attributes['im:id'] === id);
        console.log('details', details);
        setPodcastDetail(filterPodcast || null);
        const counter = details?.results.slice(1).length;
        if (counter) {
            setEpisodes(counter);
        }
    }, [data, details, id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !details) {
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
                <Card className="w-1/5 p-4 bg-white shadow border border-gray-300 flex flex-col items-center cursor-pointer mr-10 max-h-[80vh] pb-4">
                    <Image
                        alt={podcastDetail?.['im:name'].label}
                        className="object-cover mb-4"
                        src={podcastDetail ? podcastDetail['im:image'][2].label : ''}
                        width={220}
                        height={220}
                    />
                    <Divider className="my-4" />
                    <CardHeader className="pb-0 pt-2 px-3 flex-col items-center">
                        <h4 className="font-bold text-md text-center">{podcastDetail?.['im:name'].label}</h4>
                        <h6 className="text-md text-center text-gray-400">{`by ${podcastDetail?.['im:artist'].label}`}</h6>
                        <Divider className="my-4" />
                        <p className="text-sm text-gray-500 px-2">{podcastDetail?.summary.label}</p> {/* Padding agregado aquí */}
                    </CardHeader>
                </Card>

                <div className="flex-1">
                    <div className="p-4 bg-white shadow border border-gray-300 mb-4 rounded-lg">
                        <h4>{`Episodes: ${episodes}`}</h4>
                    </div>
                    <Table aria-label="Episode List">
                        <TableHeader>
                            <TableColumn className="border-b border-gray-300">Title</TableColumn>
                            <TableColumn className="border-b border-gray-300 text-left">Date</TableColumn>
                            <TableColumn className="border-b border-gray-300 text-left">Duration</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {details.results.slice(1).map((episode) => (
                                <TableRow key={episode.trackId}>
                                    <TableCell className="border-b border-gray-300">
                                        <Link to={`/episode/${episode.trackId}`}>
                                            {episode.trackName}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="border-b border-gray-300 text-left">{formatDate(episode.releaseDate)}</TableCell>
                                    <TableCell className="border-b border-gray-300 text-left">{millisToMinutesAndSeconds(Number(episode.trackTimeMillis))}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default Detail;
