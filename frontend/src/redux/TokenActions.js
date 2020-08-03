export const setToken = (type, token) => ({
    type: type,
    payload: token
});

export const currentAccess = (token) => ({
    type: "SET_CURRENT_ACCESS",
    payload: token
});

export const deleteToken = () => ({
    type: 'DELETE_TOKEN',
});

