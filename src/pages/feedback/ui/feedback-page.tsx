import React from "react";
import {Layout} from "antd";
import {HeaderFeedback} from "@components/HeaderFeedback/HeaderFeedback";
import {FeedbackMain} from "@pages/feedback/ui/FeedbackMain/FeedbackMain";

const { Header, Content} = Layout;

export const FeedbackPage = () => {

    return <>
        <Header>
            <HeaderFeedback/>
        </Header>
        <Content>
            <FeedbackMain/>
        </Content>
   </>
}
