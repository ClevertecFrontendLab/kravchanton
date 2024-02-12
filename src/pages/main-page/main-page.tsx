import {Layout} from 'antd';
import React from 'react';

const {Footer, Header, Sider, Content} = Layout;

import './main-page.css';
import {HeaderContent} from "@components/HeaderContent/HeaderContent";

export const MainPage: React.FC = () => {

    return (
        <>
            <Layout className={'wrapper'} >
                <Sider
                    className={'sider'}
                    width={`208`}
                    trigger={null}
                    collapsible>

                </Sider>
                <Layout>
                    <Header>
                        <HeaderContent />
                    </Header>
                    <Content>

                    </Content>
                    <Footer>

                    </Footer>
                </Layout>
            </Layout>


        </>
    );
};
