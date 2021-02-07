import { combineReducers } from 'redux';

// PopupScript
import account from './account';
import saveAccount from './storeAccounts';
import getLocalStorage from './getStorage';
import getNetwork from './network';
import saveWallet from './storeWallet';
import changeBody from './changeBody';
import _updateState from './_updateState';
import sendToContent from './sendToContent';
import gotoView from './gotoView';
import localStorageUpdate from './localStorageUpdate';

// ContentScript
import contentActions from './content/callText';

export default combineReducers({
    //from PopupScript   
    account: account,
    saveAccount: saveAccount,
    getLocalStorage: getLocalStorage,
    getNetwork: getNetwork,
    saveWallet: saveWallet,
    changeBody: changeBody,
    updateState: _updateState,
    sendToContent: sendToContent,
    gotoView: gotoView,
    localStorageUpdate: localStorageUpdate,
    //from ContentScript   
    contentActions: contentActions,
});
