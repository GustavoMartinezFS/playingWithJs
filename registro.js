if (!window.indexedDB) {
    window.alert("Su navegador no soporta una versión estable de indexedDB.");
} else {
    var MotorBD = window.indexedDB;
    var BD = null;
    var listaautos = [];
    init();
}
function init() {
    mostrardiv(false);
    cargarbase();
    document.getElementById("btnadd").addEventListener("click", function() {
        mostrardiv(true)
    });
    document.getElementById("btngrabar").addEventListener("click", function() {
        validar()
    });
    document.getElementById("btncancelar").addEventListener("click", function() {
        mostrardiv(false)
    })
}

function cargarbase() {
    BD = MotorBD.open("bdautos", "1");
    BD.onupgradeneeded = function(e) {
        active = BD.result;
        autos = active.createObjectStore("autos", {
            keyPath: "id",
            autoIncrement: true
        });
    };
    BD.onsuccess = function(e) {
        listar();
    };
    BD.onerror = function(e) {
        alert("Error cargando la base de datos");
    };
}
function mostrardiv(escarga) {
    if (escarga) {
        document.getElementById("titulo").innerHTML = "Nuevo Coche";
        document.getElementById("id").value = "";
        document.getElementById("marca").value = "";
        document.getElementById("modelo").value = "";
        document.getElementById("ano").value = "";
        document.getElementById("combustible").value = "";
        document.getElementById("precio").value = "";
        document.getElementById("divform").hidden = false;
        document.getElementById("divlista").hidden = true;
    } else {
        document.getElementById("divform").hidden = true;
        document.getElementById("divlista").hidden = false;
    }
}

function validar() {
    var xid = document.getElementById("id");
    var marca = document.getElementById("marca");
    var modelo = document.getElementById("modelo");
    var ano = document.getElementById("ano");
    var combustible = document.getElementById("combustible");
    var precio = document.getElementById("precio");
    if (marca.value == "" || modelo.value == "" || ano.value == "" || combustible.value == "" || precio.value == "") {
        alert("Todos los datos deben ser completados !!");
        return false;
    }
    active = BD.result;
    var datos = active.transaction(["autos"], "readwrite"); //creamos una transaccion
    autos = datos.objectStore("autos");
    if (!xid.value == "") {
        var request = autos.get(parseInt(xid.value));
        request.onsuccess = function(e) {
            var data = event.target.result;
            data.marca = marca.value;
            data.modelo = modelo.value;
            data.ano = ano.value;
            data.combustible = combustible.value;
            data.precio = precio.value;
            var requestUpdate = autos.put(data);
            requestUpdate.onerror = function(e) {
                mensaje = "No se pudo actualizar";
            };
            requestUpdate.onsuccess = function(e) {
                mensaje = "Vehiculo actualizado correctamente";
            };
        };
    } else {
        var request = autos.put({marca: marca.value, modelo: modelo.value, ano: ano.value, combustible: combustible.value, precio: precio.value});
        request.onerror = function(e) {
            mensaje = request.error.name + "\n\n" + request.error.message;
        };
        request.onsuccess = function(e) {
            mensaje = "Vehiculo agregado correctamente";
        };
    }
    datos.oncomplete = function(e) {
        id.value = "";
        marca.value = "";
        modelo.value = "";
        ano.value = "";
        combustible.value = "";
        precio.value = "";
        alert(mensaje);
        mostrardiv(false);
        listar();
    };
}

function borrar(id) {
    var rta = confirm("Confirma borrar este registro? ");
    if (rta) {
        active = BD.result;
        var requestB = active.transaction(["autos"], "readwrite").objectStore("autos").delete(id);
        requestB.onerror = function(e) {
            alert(requestB.error.name + "\n\n" + requestB.error.message);
        };
        requestB.onsuccess = function(event) {
            listar();
        };
    }
}
function editar(id) {
    mostrardiv(true);
    document.getElementById("titulo").innerHTML = "Edicion de Coche";
    var active = BD.result;
    var datos = active.transaction(["autos"], "readonly");
    var autos = datos.objectStore("autos");
    var auto = autos.get(parseInt(id));
    auto.onsuccess = function(e) {
        var a = e.target.result;
        if (a !== undefined) {
            document.getElementById("id").value = a.id;
            document.getElementById("marca").value = a.marca;
            document.getElementById("modelo").value = a.modelo;
            document.getElementById("ano").value = a.ano;
            document.getElementById("combustible").value = a.combustible;
            document.getElementById("precio").value = a.precio;
        }
    };
}


function listar() {
    active = BD.result;
    var datos = active.transaction(["autos"], "readonly");
    var autos = datos.objectStore("autos");
    var listaautos = [];
    autos.openCursor().onsuccess = function(e) {
        var elementos = e.target.result;
        if (elementos === null) {
            return;
        }
        listaautos.push(elementos.value);
        elementos.continue();
    };
    datos.oncomplete = function() {
        var HTML = "";
        for (var key in listaautos) {
            HTML += "<tr><td>" + listaautos[key].marca + "</td><td>" +  listaautos[key].modelo + "</td><td>" + listaautos[key].ano + " </td><td>" +  listaautos[key].combustible + "</td><td>" + listaautos[key].precio + "</td><td>" +  "<button type='button' onclick=editar(" + listaautos[key].id +
            ")>Editar</button>" + "<button type= 'button' onclick=borrar(" + listaautos[key].id + ")>Borrar</button></td></tr>";
        }
        document.getElementById("listado").innerHTML = HTML;
    };
}
