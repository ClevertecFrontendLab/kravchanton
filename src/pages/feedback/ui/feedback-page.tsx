import {HeaderContent} from "@components/HeaderContent/HeaderContent";
import {FooterContent} from "@components/FooterContent/FooterContent";
import React, {useEffect} from "react";
import {MainContent} from "@components/MainContent/MainContent";
import {Layout} from "antd";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";
import {fetchFeedback} from "@pages/feedback/model/feedback.slice";

const {Footer, Header, Content} = Layout;

export const FeedbackPage = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchFeedback())
    }, [])
    return <>
        <Header>
            <HeaderContent/>
        </Header>
        <Content>
            <MainContent/>
        </Content>
        <Footer>
            <FooterContent/>
        </Footer></>
}
