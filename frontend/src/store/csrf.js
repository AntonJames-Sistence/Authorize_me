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



export default csrfFetch;