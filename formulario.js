//asignamos en una variable el elemento cuyo id es ‘formulario’
var mensaje = Array();
var dni;
var nombre;
var apellido;
var email;

init();
function init() {
    var Form = document.getElementById("formulario");
    //recorremos cada elemento del formulario (desde cero hasta Form.length)
    for (i = 0; i < Form.length; i++) {
        Form[i].addEventListener("focus", function() {
            this.classList.add("activo")
        })
        Form[i].addEventListener("blur", function() {
            this.classList.remove("activo");
        })
    }
    dni = document.getElementById("dni");
    nombre = document.getElementById("nombre");
    apellido = document.getElementById("apellido");
    email = document.getElementById("email");
    dni.focus();
    document.getElementById("btnGuardar").addEventListener("click", function() {
        validacion = Validar();
        if (validacion === -1) {
            enviar();
        } else {
            Control_de_error(validacion);
        };
    })
}
function Validar() {
    if (dni.value == "")
    return 0;
    if (dni.value < 10000 || dni.value > 99999999)
        return 1;
    if (nombre.value == "")
        return 2;
    if (nombre.value.length < 5)
        return 3;
    if (apellido.value == "")
        return 4;
    if (apellido.value.length < 5)
        return 5;
    if (email.value == "")
        return 6;
    if (!email.value.includes("@") || !email.value.includes(".com"))
        return 7;
    return -1;
}

function Control_de_error(errnro) {
    mensaje.push("El DNI no puede estar vacio");
    mensaje.push("El numero ingresado no parece un DNI");
    mensaje.push("El nombre no puede estar en blanco");
    mensaje.push("Debe ingresar un nombre valido");
    mensaje.push("El apellido no puede estar en blanco");
    mensaje.push("Debe ingresar un apellido valido");
    mensaje.push("Debe ingresar un e - mail");
    mensaje.push("Esto no tiene forma de e - mail");
    switch (errnro) {
        case 0:
        case 1:
            dni.focus();
            break;
        case 2:
        case 3:
            nombre.focus();
            break;
        case 4:
        case 5:
            apellido.focus();
            break;
        case 6:
        case 7:
            email.focus();
            break;
    }
    alert(mensaje[errnro]);
}

function enviar() { 
    alert("Se envia correctamente el formulario");
    dni.value = "";
    nombre.value = "";
    apellido.value = "";
    email.value = "";
}
