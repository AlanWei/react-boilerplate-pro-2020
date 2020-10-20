import { render } from 'react-dom';
import { createBrowserHistory } from 'history';
import { createStore, createApp } from './app';
import './i18n';

import 'antd/dist/antd.css';
import './styles/index.scss';

const RENDER_CONTAINER = document.getElementById('app');

const history = createBrowserHistory();

const store = createStore(history);
const app = createApp(store, history);

render(app, RENDER_CONTAINER);
