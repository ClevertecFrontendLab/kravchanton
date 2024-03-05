import {Avatar, Card} from 'antd';
import React from 'react';
import {FeedbackType} from "@pages/feedback/model/feedback.slice";
import {FeedbackAvatar} from "@pages/feedback/ui/FeedbackAvatar/FeedbackAvatar";
import {HeaderCard} from "@pages/feedback/ui/HeaderCard/HeaderCard";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";

const {Meta} = Card;


export const FeedbackCard = ({
                                 id,
                                 fullName,
                                 imageSrc,
                                 message,
                                 rating,
                                 createdAt
                             }: FeedbackType) => {
    const breakpoint = useBreakpoint();

    return <Card

    >

        <Meta
            avatar={breakpoint.xs ? '' : <FeedbackAvatar imageSrc={imageSrc} fullName={fullName}/>}
            title={<HeaderCard rating={rating} createdAt={createdAt} imageSrc={imageSrc} fullName={fullName}/>}
            description={message}
        />

    </Card>
}
