import {Layout} from 'antd';
import React from 'react';
import './main-page.css';
import {HeaderContent} from "@components/HeaderContent/HeaderContent";
import {MainContent} from "@components/MainContent/MainContent";

const {Footer, Header, Sider, Content} = Layout;


export const MainPage: React.FC = () => {

    return (
        <>
            <Layout className={'wrapper'}>
                <Sider
                    className={'sider'}
                    width={`208`}
                    trigger={null}
                    collapsible>

                </Sider>
                <Layout>
                    <Header>
                        <HeaderContent/>
                    </Header>
                    <Content>
                        <MainContent />
                    </Content>
                    <Footer>

                    </Footer>
                </Layout>
            </Layout>


        </>
    );
};
