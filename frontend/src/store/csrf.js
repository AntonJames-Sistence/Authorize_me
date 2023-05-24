const csrfFetch = async (url, options = {}) => {
    options.method ||= 'GET'
    options.headers ||= {}
    // debugger
    if (options.method.toUpperCase() !== 'GET') {
        options.headers['Content-Type'] = 'application/json'
        options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token')
    }

    const res = await fetch(url, options)
    if (res.status >= 400) throw res; // additional line
    // debugger
    return res
};

export const restoreSession = async() => {
    let res = await fetch('/api/session');
    let token = res.headers.get('X-CSRF-Token');
    sessionStorage.setItem('X-CSRF-Token', token);
    let data = await res.json();
    sessionStorage.setItem('currentUser', JSON.stringify(data.user))
};

export default csrfFetch;