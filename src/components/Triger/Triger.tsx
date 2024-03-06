import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import styles from './Triger.module.scss'

type TrigerType = {
    collapsed: boolean;
    setCollapsed: () => void;
};
export const Trigger: React.FC = ({ collapsed, setCollapsed }: TrigerType) => {
    const breakpoints = useBreakpoint();
    return (
        <div
            className={styles.trigger}
            onClick={setCollapsed}
            data-test-id={breakpoints.md ? 'sider-switch' : 'sider-switch-mobile'}
        >
            {collapsed ? (<MenuUnfoldOutlined />) : (<MenuFoldOutlined />)}
        </div>
    );
};
