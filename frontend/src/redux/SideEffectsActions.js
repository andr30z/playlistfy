export const changeColor = (color, type) => ({
    type: type,
    payload: color
});

export const isSomething = (payload, id) => ({
    type: "IS_SOMETHING",
    payload: payload,
    id
});

export const resetSideffects = () => ({
    type: "RESET_SIDEEFFECTS",
});

export const setIsLoadingSomething = () => ({
    type: 'USER_ISLOADINGSOMETHING'
});

export const onError = (error) => ({
    type: 'ON_ERROR',
    payload: error
});

