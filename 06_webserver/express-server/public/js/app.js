const texto = document.getElementById("entrada");
const encriptar = document.getElementById("encriptar");
const desencriptar = document.getElementById("desencriptar");
const salida = document.getElementById("salida");
const salidaOriginal = salida.innerHTML;

texto.addEventListener("input", () => {
    texto.value = texto.value.replace(/[^a-zñ0-9\s]/g, "");
})

const encriptado = (texto) => {
    return texto.replace(/e/g, "enter").replace(/i/g, "imes").replace(/a/g, "ai").replace(/o/g, "ober").replace(/u/g, "ufat");
};

const desencriptado = (texto) => {
    return texto.replace(/enter/g, "e").replace(/imes/g, "i").replace(/ai/g, "a").replace(/ober/g, "o").replace(/ufat/g, "u");
};

encriptar.addEventListener("click", () => {
    if (texto.value.length > 0) {
        salida.innerHTML = `
      <div class="flex-column output_text_after">
        <p id="textResult" class="text">${encriptado(texto.value)}</p>
      </div>
      <button id="Copiar" class="output_btn" onclick="Copiar()">Copiar</button>
    `;
    } else {
        salida.innerHTML = salidaOriginal;
    }
});

desencriptar.addEventListener("click", () => {
    if (texto.value.length > 0) {
        salida.innerHTML = `
      <div class="flex-column output_text_after">
        <p id="textResult" class="text">${desencriptado(texto.value)}</p>
      </div>
      <button id="Copiar" class="output_btn" onclick="Copiar()">Copiar</button>
    `;
    } else {
        salida.innerHTML = salidaOriginal;
    }
});

const Copiar = () => {
    const texto = document.getElementById("textResult");
    navigator.clipboard.writeText(texto.textContent);
    Message();
}

const Message = () => {
    const message = `
    <div class="copy flex">
        <div class="copy_message">
            <h3>Texto copiado con exito!</h3>
        </div>
    </div>
    `;
    const messageDiv = document.createElement('div');
    messageDiv.innerHTML = message
    document.body.appendChild(messageDiv);
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 2000)
}