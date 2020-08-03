
export const setCurrentUser = (user) => ({
    type: 'SET_CURRENT_USER',
    payload: user
});

export const loadUserData = (data) => ({
    type: 'USER_DATA',
    payload: data
});


export const userLogOut = () => ({
    type: "USER_LOGOUT",
})