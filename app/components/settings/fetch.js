//our dummy JSON database
const settings = {
    db: {
        url: 'localhost:3306',
        user: 'root',
        password: 'root'
    },
    redis: {
        url: 'localhost:6379',
        user: 'redis',
        password: 'root'
    },
    server: {
        port: 80
    }
};

exports.fetchSettings = async function ({items = []} = {}) {
    try {
        const response = await dummySettings(items);
        return {status: true, data: response}
    }
    catch (e) {
        console.trace(e);
        return {status: false, error: 500}
    }
};


function dummySettings(items = []) {
    return new Promise(resolve => {
        setTimeout(() => {
            const response = {};
            items.forEach(item => response[item] = settings[item]);
            resolve(response)
        }, 1000)
    })
}