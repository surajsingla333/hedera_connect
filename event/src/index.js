import {createStore} from 'redux';
import rootReducer from './reducers/index';

import {wrapStore} from 'webext-redux';

const store = createStore(rootReducer);

wrapStore(store);
