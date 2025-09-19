const inputFecha = document.getElementById("fecha");
const alimento = document.getElementById("alimento-upload");
const previewAlimento = document.getElementById("alimento-preview");
const ticket = document.getElementById("ticket-upload");
const previewTicket = document.getElementById("ticket-preview");
const botonEnviar = document.getElementById("btnEnviar");
const importe = document.getElementById("importe");
const imagenIniciarSesion = document.getElementsByClassName("sesion");
const mensajeP = document.getElementById("mensajeTecnico");
const codTecnico = localStorage.getItem("codTecnico");
const nombreTecnico = localStorage.getItem("nombreTecnico");



function setHorayFecha() {
    
    if(inputFecha){
        const date = new Date();
        const año   = date.getFullYear();
        const mes   = String(date.getMonth() + 1).padStart(2, "0");
        const dia   = String(date.getDate()).padStart(2, "0");
        const hora  = String(date.getHours()).padStart(2, "0");
        const min   = String(date.getMinutes()).padStart(2, "0");

        inputFecha.value = `${año}-${mes}-${dia}T${hora}:${min}`;
    }
}


function fotoAlimento() {
    if (alimento) {
        alimento.addEventListener("change", function(e) {
            const file = e.target.files[0];
            if (file) {
                previewAlimento.innerHTML = `<img src="${URL.createObjectURL(file)}" width="150">`;
            }
        });
    }
}


function iniciarSesion() {
    const codTecnico = prompt("Introducir código del técnico");
    if (codTecnico) {
        localStorage.setItem("codTecnico", codTecnico);
        getAllTecnicos(codTecnico); 
    } else {
        alert("No se introdujo ningún código");
    }
}



function cambiarTectoTecnico(tecnicoEncontrado){
    
    if (tecnicoEncontrado && tecnicoEncontrado.codTecnico) {
        mensajeP.textContent = tecnicoEncontrado.codTecnico;
        mensajeP.style.display = "inline";
    } 
}







function fotoTicket(){
    if (ticket) {
        ticket.addEventListener("change", function(e) {
            const file = e.target.files[0];
            if (file) {
                previewTicket.innerHTML = `<img src="${URL.createObjectURL(file)}" width="150">`;
            }
        });
    }
}

function comprobar(e){

    e.preventDefault();

    let errores= [];

    if (!importe.value || parseFloat(importe.value) <= 0) {
        errores.push("El importe es obligatorio y debe ser mayor que 0.");
    }

    
    if (!inputFecha.value) {
        errores.push("La fecha es obligatoria.");
    }


    const codTecnico = localStorage.getItem("codTecnico");
    if (!codTecnico) {
        errores.push("Debes iniciar sesión con un código de técnico.");
    }


    if (!alimento.files || alimento.files.length === 0) {
        errores.push("Debes subir una foto del alimento.");
    }


    if (!ticket.files || ticket.files.length === 0) {
        errores.push("Debes subir una foto del ticket.");
    }

    if(errores.length > 0){
        alert("Error: " + errores.join("\n"));
    }else{
        enviar(
            codTecnico,
            nombreTecnico,
            importe.value,
            inputFecha.value,
            alimento.files[0],
            ticket.files[0]
        );

    }

}



window.addEventListener("DOMContentLoaded", () => {
    setHorayFecha();
    fotoAlimento();
    fotoTicket();

    if (botonEnviar) {
        botonEnviar.addEventListener("click", comprobar); 
    }
});
