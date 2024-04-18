//Haz tú validación en javascript acá  (Valida el formulario )

const $form = document.querySelector("#form");
const inputs = document.querySelectorAll("#form input");
const textarea = document.querySelector("#form textarea");

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,50}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    asunto: /^[a-zA-ZÀ-ÿ\s]{1,20}$/,
    mensaje: /^[a-zA-ZÀ-ÿ0-9\s]{1,200}$/,
};

const campos = {
    nombre: false,
    email: false,
    asunto: false,
    mensaje: false,
};

const validarFormulario = (e) => {
    const { name, value } = e.target;
    validarCampo(name, value);
};

const validarCampo = (campo, valor) => {
    if (expresiones[campo].test(valor.trim())) {
        document.getElementById(`input_${campo}`).classList.remove("incorrecto");
        document.getElementById(`input_${campo}`).classList.add("correcto");
        document.querySelector(`#input_${campo} i`).classList.remove("fa-times-circle");
        document.querySelector(`#input_${campo} i`).classList.add("fa-check-circle");
        campos[campo] = true;
    } else {
        document.getElementById(`input_${campo}`).classList.add("incorrecto");
        document.getElementById(`input_${campo}`).classList.remove("correcto");
        document.querySelector(`#input_${campo} i`).classList.add("fa-times-circle");
        document.querySelector(`#input_${campo} i`).classList.remove("fa-check-circle");
        campos[campo] = false;
    }
};

inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
});

textarea.addEventListener("keyup", validarFormulario);
textarea.addEventListener("blur", validarFormulario);

const $enviar = document.querySelector("#enviar");

$form.addEventListener("submit", enviarCorreo);

function enviarCorreo(e) {
    e.preventDefault();
    if (Object.values(campos).every((campo) => campo)) {
        const form = new FormData(this);
        const subject = form.get("asunto");
        const body = form.get("mensaje");
        const email = form.get("email") || "anikdelarev@gmail.com"; 
        const name = form.get("nombre");

        const mailtoLink = `mailto:${email}?subject=${subject}&body=Nombre:${name}, E-mail:${email}, Asunto:${subject}&body=${body}`;

        $enviar.setAttribute("href", mailtoLink);
        $enviar.click();
    }
}
