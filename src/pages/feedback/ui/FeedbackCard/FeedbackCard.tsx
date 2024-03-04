import {Avatar, Card} from 'antd';
import React from 'react';
import {FeedbackType} from "@pages/feedback/model/feedback.slice";
import {FeedbackAvatar} from "@pages/feedback/ui/FeedbackAvatar/FeedbackAvatar";
import {HeaderCard} from "@pages/feedback/ui/HeaderCard/HeaderCard";

const {Meta} = Card;


export const FeedbackCard = ({
                                 id,
                                 fullName,
                                 imageSrc,
                                 message,
                                 rating,
                                 createdAt
                             }: FeedbackType) => {

    return <Card

    >

        <Meta
            avatar={<FeedbackAvatar imageSrc={imageSrc} fullName={fullName}/>}
            title={<HeaderCard rating={rating} createdAt={createdAt}/>}
            description={message}
        />

    </Card>
}
