const decoder = {
    decode(message) {
        return {
            code: message[0],
            msg: message[1],
        }
    },
    encode(code, msg) {
        return JSON.stringify([code, msg]);
    }
};

export default decoder
