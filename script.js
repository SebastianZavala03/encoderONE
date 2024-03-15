// Selección de elementos del DOM
const text1 = document.querySelector(".textarea-first");
const text2 = document.querySelector(".textarea-second");
const copyButton = document.querySelector('.copy-button');
const observerImage = document.querySelector('.observer');
const instructions = document.querySelector('.indications');

text1.addEventListener('input', function() {
    const text = this.value.trim(); 
    if (text === '') {
        text2.value = ''; 
        copyButton.style.display = 'none'; 
        observerImage.style.display = 'block'; 
        instructions.style.display = 'block'; 
    }
    if (window.innerWidth <= 1024) {
        observerImage.style.display = 'none';
    }
});



window.addEventListener('resize', function() {
    // Verificacion del tamaño de pantalla
    checkWindowSize();
});

function checkWindowSize() {
    const isMobileOrTablet = window.innerWidth <= 1024;
    observerImage.style.display = isMobileOrTablet ? 'none' : 'block';
}


// Función de cifrado
function encryptionbutton() {
    const encryptedText = cifrar(text1.value);
    text2.value = encryptedText;

    observerImage.style.display = 'none';
    instructions.style.display = 'none';
    
    autoExpandTextarea(text2);

    if (encryptedText.trim() !== "") {
        copyButton.style.display = 'block';
    } else {
        copyButton.style.display = 'none';
    }
}

// Función de descifrado
function decryptbutton() {
    const decryptedText = decifrar(text1.value);
    text2.value = decryptedText;

    observerImage.style.display = 'none';
    instructions.style.display = 'none';

    autoExpandTextarea(text2);

    if (decryptedText.trim() !== "") {
        copyButton.style.display = 'block';
    } else {
        copyButton.style.display = 'none';
    }
}

// Función de copiado
function copybutton() {
    text2.select();

    try {
        document.execCommand('copy');
        Swal.fire({
            icon: 'success',
            text: 'La operación se ha completado correctamente.',
            showConfirmButton: false,
            timer: 1500
          });
    } catch (err) {
        console.error('Error al copiar el texto: ', err);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al intentar copiar el texto.',
        });
    }
}


// Función de cifrado
function cifrar(stringEncription) {
    let acertijo = [["e","enter"],["i","imes"],["a","ai"],["o","ober"],["u","ufat"]];
    stringEncription = stringEncription.toLowerCase();

    for(let i = 0; i < acertijo.length; i++) {
        if(stringEncription.includes(acertijo[i][0])) {
            stringEncription = stringEncription.replaceAll(acertijo[i][0], acertijo[i][1]);
        }
    }
    return stringEncription;
}

// Función de descifrado
function decifrar(stringdecrypt) {
    let acertijo = [["e","enter"],["i","imes"],["a","ai"],["o","ober"],["u","ufat"]];
    stringdecrypt = stringdecrypt.toLowerCase();

    for(let i = 0; i < acertijo.length; i++) {
        if(stringdecrypt.includes(acertijo[i][1])) {
            stringdecrypt = stringdecrypt.replaceAll(acertijo[i][1], acertijo[i][0]);
        }
    }
    return stringdecrypt;
}

// Función para ajustar la altura del textarea automáticamente
function autoExpandTextarea(element) {
    element.style.height = 'auto';
    element.style.height = (element.scrollHeight) + 'px';
}

// Evento de teclado para convertir letras mayúsculas en minúsculas
text1.addEventListener('input', function(event) {
    const start = this.selectionStart;
    const end = this.selectionEnd;
    const key = event.data ? event.data.toLowerCase() : '';

    // Convertir letras mayúsculas a minúsculas
    if (event.data && event.data.toUpperCase() === event.data) {
        this.value = this.value.substring(0, start - 1) + key + this.value.substring(end);
        this.setSelectionRange(start, start); 
    }

    // Evitar la entrada de letras con acentos
    // Evitar la entrada de letras con acentos
    const withoutAccents = this.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (this.value !== withoutAccents) {
        this.value = withoutAccents;
        this.setSelectionRange(start - 1, start - 1); // Mantener el cursor en la misma posición
    }

});


