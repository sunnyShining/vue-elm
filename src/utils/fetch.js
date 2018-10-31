const oldFetchfn = fetch;
window.fetch = function fetch (input, opts) {
    opts = opts || {};
    const fetchPromise = oldFetchfn(input, opts);
    const timeoutPromise = new Promise(((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('fetch timeout'));
        }, opts.timeout || 20000);
    }));
    return Promise.race([fetchPromise, timeoutPromise]);
};
