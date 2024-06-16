import React from "react";
import { Card, CardHeader, Image } from "@nextui-org/react";
import { Entry } from "../types";
import { Link } from "react-router-dom";

interface PodcastCardProps {
    podcastInfo: Entry;
}

const PodcastCard: React.FC<PodcastCardProps> = ({ podcastInfo }) => {
    return (
        <Link to={`/podcast/${podcastInfo.id.attributes["im:id"]}`}>
            <Card className="p-4 bg-white shadow border-none flex flex-col items-center cursor-pointer">
                <Image
                    alt={podcastInfo.title.label}
                    className="rounded-full object-cover mb-4"
                    src={podcastInfo["im:image"][2].label}
                    width={100}
                    height={100}
                />
                <CardHeader className="pb-0 pt-2 px-3 flex-col items-center">
                    <h4 className="font-bold text-md text-center">
                        {podcastInfo.title.label}
                    </h4>
                </CardHeader>
            </Card>
        </Link>
    );
};

export default PodcastCard;
