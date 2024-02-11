import {Layout} from 'antd';
import React from 'react';

const {Footer, Header, Sider, Content} = Layout;

import './main-page.css';
import {HeaderContent} from "@components/HeaderContent/HeaderContent";

export const MainPage: React.FC = () => {

    return (
        <>

            <Layout>
                <Sider>Sider</Sider>
                <Layout>
                    <Header>
                        <HeaderContent/>
                    </Header>
                    <Content>Content</Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>

        </>
    );
};
