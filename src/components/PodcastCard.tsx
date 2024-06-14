import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Image, Button } from '@nextui-org/react';
import { Entry } from '../types';

interface PodcastCardProps {
    podcastInfo: Entry;
}

const PodcastCard: React.FC<PodcastCardProps> = ({ podcastInfo }) => {
    return (
        <Card className="p-4 bg-white shadow border-none flex flex-col items-center">
            <Image
                alt={podcastInfo.title.label}
                className="rounded-full object-cover mb-4"
                src={podcastInfo['im:image'][0].label}
                width={100}
                height={100}
            />
            <CardHeader className="pb-0 pt-2 px-3 flex-col items-center">
                <h4 className="font-bold text-lg text-center">{podcastInfo.title.label}</h4>
            </CardHeader>
        </Card>
    );
};

export default PodcastCard;
