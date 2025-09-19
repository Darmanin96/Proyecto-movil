function getAllTecnicos(codTecnico) {
    $.ajax({
        url: "http://localhost/Api-Tecnicos/index.php",
        type: "GET",
        dataType: "json",
        success: function(datos) {
            const tecnicoEncontrado = datos.data.find(tecnico => tecnico.codTecnico === codTecnico);

            if (tecnicoEncontrado) {
                console.log("Código correcto, técnico encontrado:", tecnicoEncontrado);
                localStorage.setItem("nombreTecnico", tecnicoEncontrado.nombreCompleto);
                localStorage.setItem("codTecnico", tecnicoEncontrado.codTecnico);
                cambiarTectoTecnico(tecnicoEncontrado);
            } else {
                 alert("Código incorrecto");
            }
        },
        error: function(xhr, status, error) {
            console.error("Error en la solicitud:", status, error);
        }
    });
}

function enviar(codTecnico, nombreTecnico, importe, fecha, alimento, ticket) {
    const formData = new FormData();
    formData.append("codTecnico", codTecnico);
    formData.append("nombreTecnico", nombreTecnico);
    formData.append("importe", importe);
    formData.append("fecha", fecha);
    formData.append("imagenAlimento", alimento);
    formData.append("imagenTicket", ticket);

    $.ajax({
        url: "http://localhost/Api-Tecnicos/index.php",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            console.log("Respuesta del servidor:", response);
            alert("Datos enviados correctamente");
        },
        error: function (xhr, status, error) {
            console.error("Error en la solicitud:", status, error);
            alert("Error al enviar los datos");
        }
    });
}




