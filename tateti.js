var movimiento = 0
 var turno = 0
 var jugador;
init();
function init() {
    document.write("<style>.tateti {");
    document.write("width : 250px;height : 250px;margin: 2px; font-size: 100px");
    document.write("}</style>");
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i !== inputs.length; i++) {
        inputs[i].addEventListener("click", function() {
            marca(this.id)
        });
        inputs[i].classList.add("tateti");
    }
    jugador = document.getElementById("jugador");
    clear();
}

function clear() {
    var celdas = document.getElementsByTagName("input");
    for (var i = 0; i !== celdas.length; i++) {
        celdas[i].value = " ";
    }
    turno = 0
    movimiento = 0
    jugador.innerHTML = "Juega participante 1 <br>" + "Marca: O <br>";
}

function marca(id) {
    var marca;
    var paracartel;
    celda = document.getElementById(id);
    if (celda.value !== " ") {
        alert("Esta celda ya ha sido usada!!!");
        return;
    }
    if (turno) {
        marca = " X ";
        paracartel = " O ";
    } else {
        marca = " 0 ";
        paracartel = " X ";
    }
    console.log('antes',celda.value);
    celda.value = marca;
    console.log('luego',celda.value);

    movimiento += 1;
    setTimeout(() => {console.log(celda.value)},2000);
    if (check(marca)) {
        turno = 1 - turno;
        jugador.innerHTML = "Juega participante " + (
        1 + turno).toString() + "<br>" + "Marca:" + paracartel + "<br>" + "Movimientos realizados:" + movimiento.toString() + "/9";
        if (movimiento == 9) {
            alert("No hay mas movimientos!!");
            clear();
        }
    }
}
function check(marca) {
    celda1 = document.getElementById("celda1").value;
    celda2 = document.getElementById("celda2").value;
    celda3 = document.getElementById("celda3").value;
    celda4 = document.getElementById("celda4").value;
    celda5 = document.getElementById("celda5").value;
    celda6 = document.getElementById("celda6").value;
    celda7 = document.getElementById("celda7").value;
    celda8 = document.getElementById("celda8").value;
    celda9 = document.getElementById("celda9").value;
    if ((celda1 == marca && celda2 == marca && celda3 == marca) || (celda4 == marca && celda5 == marca && celda6 == marca) || (celda7 == marca && celda8 == marca && celda9 == marca) || (celda1 == marca && celda5 == marca && celda9 == marca) || (celda1 == marca && celda4 == marca && celda7 == marca) || (celda2 == marca && celda5 == marca && celda8 == marca) || (celda3 == marca && celda6 == marca && celda9 == marca) || (celda1 == marca && celda5 == marca && celda9 == marca) || (celda3 == marca && celda5 == marca && celda7 == marca)) {
        alert("Participante " + (turno + 1).toString() +" Gano!!!")
        clear();
        return false;
    }
    return true;
}
