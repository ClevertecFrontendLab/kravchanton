import {Button, Layout} from 'antd';
import React, {useState} from 'react';
import './main-page.css';
import {HeaderContent} from "@components/HeaderContent/HeaderContent";
import {MainContent} from "@components/MainContent/MainContent";
import {FooterContent} from "@components/FooterContent/FooterContent";
import {NavigationMenu} from "@components/NavigationMenu/NavigationMenu";
import logo from '../../assets/image/Logo.png'
import LogoMin from '../../assets/image/LogoMin.png'
import {Trigger} from "@components/Triger/Triger";
import {ExitIcon} from "../../assets/image/Exit";

const {Footer, Header, Sider, Content} = Layout;


export const MainPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false)


    return (
        <>
            <Layout className={'wrapper'}>
                <Sider width={'208'}
                       trigger={null}
                       collapsible
                       collapsed={collapsed}>
                    <div className="logo"><img src={collapsed ? LogoMin : logo}/></div>

                    <NavigationMenu/>
                    <Trigger setCollapsed={() => setCollapsed(!collapsed)}/>
                    <Button
                        block
                        type={'default'}
                        size={'large'}
                        className={'exit-button'}
                        icon={<ExitIcon/>}
                    >
                        {collapsed ? '' : 'Выход'}
                    </Button>
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
