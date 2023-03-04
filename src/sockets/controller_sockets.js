const socketController = (client) => {
    // console.log("Ciente conectado", client.id);
    client.on('disconnect', () => {
        // console.log("Cliente desconectado", client.id);
    });
    client.on('enviar-mensaje', (payload, callback) => {
        const id = 39394
        callback(id)
        client.broadcast.emit("enviar-mensaje", payload)
        // this.io.emit("enviar-mensaje", payload)
    });
    // client.on('event', data => { /* … */ });
}
module.exports = {
    socketController
}