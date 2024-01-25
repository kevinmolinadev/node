(() => {
    const status = document.getElementById("status");
    const btnConnect = document.getElementById("btnConnect");
    const btnDisconnect = document.getElementById("btnDisconnect");
    const input = document.querySelector("input");
    const btnSend = document.getElementById("btnSend");
    const messages = document.getElementById("messages");
    let socket;

    const loadMessage = (message) => {
        const li = document.createElement("li");
        li.innerHTML = message;
        messages.prepend(li);
    }

    const sendInformation = () => {
        if (!socket) return alert("No conectado");
        const message = input.value;
        socket.send(message);
        input.value = null;
        btnSend.disabled = true;
    }

    const connect = () => {
        socket = new WebSocket("ws://localhost:3000");
        status.innerHTML = "Connected";
        socket.onopen = (event) => {
            console.log("Connected");
        }
        socket.onmessage = (event) => {
            console.log(event);
            loadMessage(event.data);
        }
    }

    const disconnect = () => {
        if (socket) {
            socket.close();
            socket.onclose = (event) => {
                console.log("Disconnected");
            }
        };
        status.innerHTML = "Disconnected";

    }

    btnConnect.addEventListener("click", connect);
    btnDisconnect.addEventListener("click", disconnect);
    btnSend.addEventListener("click", sendInformation);
    input.addEventListener("input", () => {
        btnSend.disabled = input.value.length === 0;
    })
    status.innerHTML = "Disconnected";
    btnSend.disabled = true;
})();