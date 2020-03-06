exports.registerRoutes = function (router) {
    router.get('/', fetch);
};


async function fetch(req, res) {
    try {
        const {status, data} = await request({
            head: 'fetch-settings',
            body: {items:['db','redis']}
        });
        if (status) res.send(data);
        else res.sendStatus(data)
    }
    catch (e) {
        console.trace(e);
        return res.sendStatus(500)
    }
}