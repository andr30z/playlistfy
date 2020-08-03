export const isAuthenticated = () => {
    try {
        const state = JSON.parse(localStorage.getItem('persist:root'));
        const { user } = state;
        if (!user) {
            return false;
        }
        const { currentUser } = JSON.parse(user);
        console.log(currentUser, "   AUTHJS");
        return currentUser ? true : false;
    } catch (error) {
        return false;
    }
}

export const hasToken = ()=>{
    const state = JSON.parse(localStorage.getItem('persist:root'));
    const { to } = state;
    if (!to) {
        return false;
    }
    const { access_token } = JSON.parse(to);
    console.log(access_token, "   AUTHJS token");
    return access_token ? true : false;
}