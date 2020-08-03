import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';//pega o window.localstorage

const INITIAL_STATE = {
    currentUser: null,
    userData: undefined
}

// const transformTo = createBlacklistFilter('to', ['access_token']);
// const transformUser = createWhitelistFilter('user', ['display_name']);
// const blacklistTransform = createTransform(
//     (inboundState, key) => {
//         if (key === 'user') return inboundState;
//         else return { ...inboundState, user: undefined, }
//     })
// const blacklistPaths = ['to.access_token'];
const persistConfig = {
    key: 'root',
    storage,
    blacklist:['sideEffects']
    // transforms: [
    //     // nested blacklist-paths require a custom transform to be applied
    //     createTransform((inboundState, key) => {
    //         const blacklistPaths_forKey = blacklistPaths.filter(path => path.startsWith(`${key}.`)).map(path => path.substr(key.length + 1));
    //         return omit(inboundState, ...blacklistPaths_forKey);
    //     }, null),
    // ],
    // createWhitelistFilter('user', []),
    // createWhitelistFilter('to', ['access_token'])
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: action.payload
            }
        case 'USER_LOGOUT':
            return {
                userData:{},
                currentUser: null
            }
        case 'USER_DATA':
            return {
                ...state,
                userData: action.payload
            }
        default:
            return state;
    }
}


const TOKEN_INITIAL_STATE = {
    access_token: undefined,
    refresh_token: undefined,
    createdAt: -1,
    expires_in: undefined
}

const tokenReducer = (state = TOKEN_INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                ...action.payload
            }
        case 'DELETE_TOKEN':
            return {
                createdAt:-1
            }
        case 'SET_CURRENT_ACCESS':
            return {
                ...state,
                access_token: action.payload
            }
        default:
            return state;
    }
}

const SIDE_EFFECTS_INITIAL_STATE = {
    footerColor: 'transparent',
    isHome: false,
    isMenu: false,
    isLoggin: false,
    error: undefined,
}

const sideEffectsReducer = (state = SIDE_EFFECTS_INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SIDE_EFFECT_FOOTER':
            return {
                ...state,
                footerColor: action.payload
            }
        case 'IS_SOMETHING':
            return {
                ...state,
                [action.id]: action.payload
            }
        case 'RESET_SIDEEFFECTS':
            return {
                footerColor: 'transparent',
                isHome: false,
                isMenu: false,
                isLoggin: false,
                error: undefined,
            }
        case 'ON_ERROR':
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

const storageReducer = combineReducers({
    to: tokenReducer,
    user: userReducer,
    sideEffects: sideEffectsReducer,
});

const middleware = [thunk];

const preStore = persistReducer(persistConfig, storageReducer);

const store = createStore(preStore, applyMiddleware(...middleware));

const persistor = persistStore(store);

const storeConfig = { store, persistor };

export default storeConfig;