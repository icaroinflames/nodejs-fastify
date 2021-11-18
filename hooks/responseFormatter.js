module.exports = async (req, reply, payload) => {
    //podríamos mirar en reply a ver si ha sido success o no
    newPayload = {};
    newPayload.responseCode = "OK";
    newPayload.resultado = payload;

    return newPayload; 
};