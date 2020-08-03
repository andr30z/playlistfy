import axios from 'axios';
import storeConfig from '../redux/store';
import { deleteToken, setToken, } from '../redux/TokenActions';
// import { resetSideffects, onError } from '../redux/SideEffectsActions';
// import { userLogOut } from '../redux/UserActions';




const auth = axios.create({
    baseURL: "http://localhost:3333/",
});


// function isTokenExpiredError(errorResponse) {
//     // Your own logic to determine if the error is due to JWT token expired returns a boolean value
// }

// store
storeConfig.store.subscribe(listener)

let isAlreadyFetchingAccessToken = false;
// A lista de requests que estão esperando para tentar novamente após a requisiçõo do token JWT ter sido efetuada
let subscribers = [];

function listener() {
    console.log(storeConfig.store.getState(), 'estado começo do listener')
    // const dispatch = storeConfig.store.dispatch;
    auth.interceptors.response.use(
        function (response) {
            console.log(response, "resposesinha hieahiaehiaehiaehiaehiaehiaehiaehiaehiaehiaehiaehiaehaeihaei")
            // se a requisiçaõ for OK não precisa fazer nada :D
            return response
        },
        function (error) {
            console.log("hihihihihih to aqui dentro do erro")
            const errorResponse = error.response;
            console.log(errorResponse, '  error response')
            if (isTokenExpiredError(errorResponse)) {
                console.log("if do erro")
                return resetTokenAndReattemptRequest(error, storeConfig.store.getState(), storeConfig.store.dispatch);
            }
            // If the error is due to other reasons, we just throw it back to axios
            return Promise.reject(error)
        }
    )

    //   axios.defaults.headers.common['Authorization'] = token;
}

function isTokenExpiredError(errorResponse) {
    return errorResponse.status === 401 ? true : false;
}

async function resetTokenAndReattemptRequest(error, state, dispatch) {
    const { response } = error;
    const resetToken = state.to.refresh_token;
    
    // dispatch(resetSideffects());
    // dispatch(onError({ errorMessage: "Sua autorização expirou, faça o login novamente por favor." }));
    // dispatch(deleteToken());
    // dispatch(userLogOut());
    //  throw new Error("errão");
    /* Proceed to the token refresh procedure
    We create a new Promise that will retry the request,
    clone all the request configuration from the failed
    request in the error object. */
    const retryOriginalRequest = new Promise(resolve => {
        /* We need to add the request retry to the queue
        since there another request that already attempt to
        refresh the token */
        addSubscriber(access_token => {
            console.log('access_token ', access_token);
            console.log(response.config, 'response config antes')
            console.log(response.config, 'resposne _ conifg jakshdjkashdjkhasdkjhasd')
            if (response.config.params.Authorization) {
                response.config.params.Authorization = 'Bearer ' + access_token;
                console.log('aoisjdikasdoijasd passei ifzinho zica')
            } else {
                response.config.headers.Authorization = 'Bearer ' + access_token
            }
            console.log(response.config, 'resposne _ conifg jakshdjkashdjkhasdkjhasd')
            resolve(axios(response.config));
        });
    });
    if (!isAlreadyFetchingAccessToken) {
        isAlreadyFetchingAccessToken = true;
        console.log("PASSEI DO IF FINAL DESGRAÇA")
        const res = await axios.get('http://localhost:3333/auth', {
            headers: {
                refresh: resetToken
            }
        });
        console.log(res.data, "res data pos if askdjasldjk")
        if (!res.data) {
            return Promise.reject(error);
        }
        const newToken = res.data.access_token;
        dispatch(setToken('SET_TOKEN', { ...res.data, createdAt: new Date().getTime() }));
        isAlreadyFetchingAccessToken = false;
        onAccessTokenFetched(newToken);
    }
    return retryOriginalRequest;
}

function addSubscriber(callback) {
    subscribers.push(callback);
}
function onAccessTokenFetched(access_token) {
    // When the refresh is successful, we start retrying the requests one by one and empty the queue
    subscribers.forEach(callback => callback(access_token));
    subscribers = [];
}

export default auth;