function generarEtiqueta() {
    // Obtener los valores actuales de los campos
    const numero = document.getElementById('numero-input').value.trim();
    const codigo = document.getElementById('codigo-input').value.trim();
    const numero2 = document.getElementById('numero2-input').value.trim();
    const codigo2 = document.getElementById('codigo2-input').value.trim();

    // Obtener referencias a los elementos de la etiqueta
    const etiqueta = document.getElementById('etiqueta');
    const numeroEtiqueta = document.getElementById('numero-etiqueta');
    const qrCode = document.getElementById('qr-code');
    const numero2Etiqueta = document.getElementById('numero2-etiqueta');
    const qrCode2 = document.getElementById('qr-code2');

    // Limpiar todos los elementos primero
    numeroEtiqueta.textContent = '';
    qrCode.src = '';
    numero2Etiqueta.textContent = '';
    qrCode2.src = '';

    // Verificar y mostrar primer conjunto de datos
    if (numero || codigo) {
        if (numero) {
            numeroEtiqueta.textContent = numero;
            ajustarTexto(numeroEtiqueta);
        }
        if (codigo) {
            qrCode.src = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(codigo)}`;
        }
    }

    // Verificar y mostrar segundo conjunto de datos solo si se ingresaron
    if (numero2 || codigo2) {
        if (numero2) {
            numero2Etiqueta.textContent = numero2;
            ajustarTexto(numero2Etiqueta);
        }
        if (codigo2) {
            qrCode2.src = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(codigo2)}`;
        }
    }

    // Mostrar u ocultar la etiqueta según si hay datos
    etiqueta.style.display = (numero || codigo || numero2 || codigo2) ? 'flex' : 'none';
}

function ajustarTexto(element) {
    let fontSize = 12;
    const maxWidth = element.offsetWidth;
    const maxHeight = element.offsetHeight;

    while (element.scrollWidth > maxWidth || element.scrollHeight > maxHeight) {
        fontSize--;
        element.style.fontSize = fontSize + 'pt';
        if (fontSize <= 6) break;
    }
}

function limpiarPagina() {
    // Limpiar campos de entrada
    document.getElementById('numero-input').value = '';
    document.getElementById('codigo-input').value = '';
    document.getElementById('numero2-input').value = '';
    document.getElementById('codigo2-input').value = '';
    document.getElementById('cantidad-input').value = '1';

    // Limpiar completamente la visualización
    document.getElementById('numero-etiqueta').textContent = '';
    document.getElementById('qr-code').src = '';
    document.getElementById('numero2-etiqueta').textContent = '';
    document.getElementById('qr-code2').src = '';
    document.getElementById('etiqueta').style.display = 'none';
}

function imprimirEtiqueta() {
    const cantidad = parseInt(document.getElementById('cantidad-input').value);
    if (!isNaN(cantidad) && cantidad > 0) {
        const etiqueta = document.getElementById('etiqueta').outerHTML;
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Imprimir Etiqueta</title>
                <style>
                    @page {
                        size: 75mm 50mm;
                        margin: 0;
                    }
                    body {
                        margin: 0;
                        padding: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        font-family: 'Arial', sans-serif;
                        font-weight: bold;
                    }
                    .etiqueta {
                        width: 75mm;
                        height: 50mm;
                        display: flex;
                        flex-direction: column;
                        padding: 0;
                        box-sizing: border-box;
                        border: 1px solid black;
                    }
                    .etiqueta .sector {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        width: 75mm;
                        height: 25mm;
                        padding: 5mm;
                        border-bottom: 1px solid black;
                        box-sizing: border-box;
                    }
                    .etiqueta .sector:last-child {
                        border-bottom: none;
                    }
                    .etiqueta img {
                        max-width: 20mm;
                        max-height: 20mm;
                    }
                    .etiqueta span {
                        flex-grow: 1;
                        text-align: left;
                        max-width: calc(100% - 25mm);
                        word-wrap: break-word;
                        overflow: hidden;
                        font-size: 12pt;
                    }
                </style>
            </head>
            <body>
                ${etiqueta}
            </body>
            </html>
        `);

        printWindow.document.close();

        printWindow.onload = function() {
            setTimeout(() => {
                printWindow.focus();
                printWindow.print();
                printWindow.close();
            }, 500);
        };
    }
}
