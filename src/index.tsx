import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {history, store} from '@redux/configure-store';
import 'normalize.css';
import 'antd/dist/antd.css';
import './index.css';
import {App} from "./app";
import {HistoryRouter} from "redux-first-history/rr6";
import {ConfigProvider} from "antd";

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HistoryRouter history={history}>
                <ConfigProvider
                    theme={{
                        components: {
                            Result: {
                                iconFontSize: 1000
                            },
                        },
                    }}
                >
                    <App/>
                </ConfigProvider>
            </HistoryRouter>
        </Provider>
    </React.StrictMode>,
);
