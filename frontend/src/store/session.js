import csrfFetch from "./csrf";

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

//================================== Thunk actions ======================================

export const login = (user) => async (dispatch) => {
    // const {credential, password} = user;
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(user)
    });
    const data = await res.json();

    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
}

export const signup = (regInfo) => async (dispatch) => {
    // const {username, email, password} = regInfo;
    const res = await csrfFetch('api/users', {
        method: 'POST',
        body: JSON.stringify(regInfo)
    });
    const data = await res.json();

    storeCurrentUser(data.user); // I've changed user to newUser to be simantic with signup page
    dispatch(setCurrentUser(data.user));
}

//================================== restore session logic ======================================
export function storeCSRFToken(response) {
    const csrfToken = response.headers.get("X-CSRF-Token");
    if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}
  
export async function restoreCSRF() {
    const response = await csrfFetch("/api/session");
    storeCSRFToken(response);
    return response;
}

export const restoreSession = () => async dispatch => {
    const res = await csrfFetch('/api/session');
    storeCSRFToken(res);
    const data = await res.json();

    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return res;
}

const storeCurrentUser = (user) => {
    if(user) {
        sessionStorage.setItem("currentUser", JSON.stringify(user))
    } else {
        sessionStorage.removeItem("currentUser");
    }
}

// grabbing initial state from storage if it is there
const initialState = {
    user: JSON.parse(sessionStorage.getItem("currentUser"))
};
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