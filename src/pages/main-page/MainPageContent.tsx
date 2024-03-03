import {HeaderContent} from "@components/HeaderContent/HeaderContent";
import {FooterContent} from "@components/FooterContent/FooterContent";
import React from "react";
import {MainContent} from "@components/MainContent/MainContent";
import {Layout} from "antd";

const {Footer, Header, Content} = Layout;

export const MainPageContent = () => <>
    <Header>
        <HeaderContent/>
    </Header>
    <Content>
        <MainContent/>
    </Content>
    <Footer>
        <FooterContent/>
    </Footer></>
