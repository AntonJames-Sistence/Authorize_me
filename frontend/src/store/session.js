import csrfFetch, { storeCSRFToken } from "./csrf";

// actions
const SET_CURRENT_USER = 'session/SET_CURRENT_USER'; 
const REMOVE_CURRENT_USER = 'session/REMOVE_CURRENT_USER'; 

export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        user
    }
};

export const removeCurrentUser = () => {
    return {
        type: REMOVE_CURRENT_USER
    }
};

// thunks
//login
export const login = (user) => async (dispatch) => {
    // const {credential, password} = user;
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(user)
    })
    const data = await res.json();

    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
}

//restore session
export const restoreSession = () => async dispatch => {
    const res = await csrfFetch('/api/session');
    storeCSRFToken(res);
    const data = await res.json();

    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    // return res;
}

const storeCurrentUser = (user) => {
    if(user) {
        sessionStorage.setItem("currentUser", JSON.stringify(user))
    } else {
        sessionStorage.removeItem("currentUser");
    }
}

const initialState = {user: null};
// session reducer
const sessionReducer = (state = initialState, action) => {
    Object.freeze(state);

    const nextState = {...state};

    switch (action.type) {
        case SET_CURRENT_USER:
            nextState['user'] = action.user;
            return nextState;
        case REMOVE_CURRENT_USER:
            nextState['user'] = null;
            return nextState;
        default:
            return state;
    }
}

export default sessionReducer;