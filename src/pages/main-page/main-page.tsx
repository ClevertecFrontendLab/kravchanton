import {Button, Layout} from 'antd';
import React, {useState} from 'react';
import './main-page.css';
import {NavigationMenu} from "@components/NavigationMenu/NavigationMenu";
import logo from '../../assets/image/LogoMain.png'
import LogoMin from '../../assets/image/LogoMin.png'
import {Trigger} from "@components/Triger/Triger";
import {ExitIcon} from "../../assets/image/Exit";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";
import {setIsLogout} from "@pages/auth/model/auth.slice";
import {Outlet} from "react-router-dom";
import {history} from "@redux/configure-store";
import {paths} from "@utils/constants/paths";

const { Sider} = Layout;
export const MainPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(true)
    const breakpoint = useBreakpoint();
    const dispatch =useAppDispatch()
    const logout = () => {
        dispatch(setIsLogout())
        history.push(paths.auth)
    }
    return <>
            <Layout className={'wrapper'}>
                <Sider width={`${breakpoint.xs ? 106 : 208}`}
                       collapsedWidth={`${breakpoint.xs ? 0 : 64}`}
                       className={'sider'}
                       trigger={null}
                       collapsible
                       collapsed={collapsed}>
                    <div className="logo"><img src={collapsed ? LogoMin : logo}/></div>

                    <NavigationMenu/>
                    <Trigger setCollapsed={() => setCollapsed(!collapsed)}/>
                    <Button
                        onClick={logout}
                        block
                        type='default'
                        size='large'
                        className='exit-button'
                        icon={breakpoint.xs ? "" : <ExitIcon/>}
                    >
                        {collapsed ? '' : 'Выход'}
                    </Button>
                </Sider>
                <Layout>
                   <Outlet />
                </Layout>
            </Layout>


        </>

};
