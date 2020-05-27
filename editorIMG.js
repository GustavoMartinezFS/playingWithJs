var image = new Image();
var canvas;
var ctx;
init();
function init() { // Obtenemos el canvas
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    document.getElementById("capturar").addEventListener("change", function() {
        cargarimagen(this);
    });
    var input = document.getElementsByTagName("button");
    var inputList = Array.prototype.slice.call(input);
    inputList.forEach(function(e) {
        e.addEventListener("click", function() {
            procesar(e.innerText)
        });
    });
}

function cargarimagen(img) {
    if (img.files && img.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(img.files[0]);
        reader.onload = function(e) {
            document.getElementById("original").src = reader.result;
            image.src = reader.result;
        };
    }
};

function procesar(modo) { // Asignamos la misma altura y ancho de la imagen al canvas
    ctx.canvas.height = image.height;
    ctx.canvas.width = image.width; // Dibujamos la imagen en el canvas
    ctx.drawImage(image, 0, 0);
    var imgData2 = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data2 = imgData2.data;
    switch (modo) {
        case "Gris":
            for (var i = 0; i < data2.length; i += 4) {
                var grayscale = 0.33 * data2[i] + 0.5 * data2[i + 1] + 0.15 * data2[i + 2];
                data2[i] = grayscale;
                data2[i + 1] = grayscale;
                data2[i + 2] = grayscale;
            }
            break;
        case "Azul":
            for (var i = 0; i < data2.length; i += 4)
                {
                    data2[i + 2] = 255;
                }
            break;
        case "Transparente":
            for (var i = 0; i < data2.length; i += 4) {
                data2[i + 3] = 50;
            }
            break;
        case "Negativo":
            for (var i = 0; i < data2.length; i += 4) {
                data2[i] = 255 - data2[i];
                data2[i + 1] = 255 - data2[i + 1];
                data2[i + 2] = 255 - data2[i + 2];
            }
            break;
        case "Sepia":
            for (var i = 0; i < data2.length; i += 4) {
                r = data2[i];
                g = data2[i + 1];
                b = data2[i + 2];
                data2[i] = (r * .393) + (g * .769) + (b * .189);
                data2[i + 1] = (r * .349) + (g * .686) + (b * .168);
                data2[i + 2] = (r * .272) + (g * .534) + (b * .131);
            }
            break;
    } // Asignamos la imagen al Canvas
     ctx.putImageData(imgData2,0,0);
}
