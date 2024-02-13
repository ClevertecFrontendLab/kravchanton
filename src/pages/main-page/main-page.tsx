import {Layout} from 'antd';
import React from 'react';
import './main-page.css';
import {HeaderContent} from "@components/HeaderContent/HeaderContent";
import {MainContent} from "@components/MainContent/MainContent";
import {FooterContent} from "@components/FooterContent/FooterContent";
import {NavigationMenu} from "@components/NavigationMenu/NavigationMenu";
import logo from '../../assets/image/Logo.png'
import {Trigger} from "@components/Triger/Triger";

const {Footer, Header, Sider, Content} = Layout;


export const MainPage: React.FC = () => {

    return (
        <>
            <Layout className={'wrapper'}>
                <Sider width={'208'}
                       trigger={null}
                       collapsible
                       collapsed={false}>
                    <div className="logo"><img src={logo}/></div>

                    <NavigationMenu/>
                    <Trigger />
                </Sider>
                <Layout>
                    <Header>
                        <HeaderContent/>
                    </Header>
                    <Content>
                        <MainContent/>
                    </Content>
                    <Footer>
                        <FooterContent/>
                    </Footer>
                </Layout>
            </Layout>


        </>
    );
};
