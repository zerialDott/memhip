const dataBase = [
    { name: 'perro 1', url: 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { name: 'perro 2', url: 'https://images.pexels.com/photos/160846/french-bulldog-summer-smile-joy-160846.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { name: 'perro 3', url: 'https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { name: 'perro 4', url: 'https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { name: 'perro 5', url: 'https://images.pexels.com/photos/825947/pexels-photo-825947.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { name: 'perro 6', url: 'https://images.pexels.com/photos/1629781/pexels-photo-1629781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { name: 'perro 7', url: 'https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { name: 'perro 8', url: 'https://images.pexels.com/photos/220938/pexels-photo-220938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }
];

const cards = [...dataBase, ...dataBase]; // Duplicar el array en una sola operación

// Función para mezclar las cartas
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Algoritmo Fisher-Yates
    }
}

shuffle(cards);

const container = document.querySelector('ul');
let visibleImages = []; // Array para rastrear las imágenes visibles
let selectedImages = []; // Array para comparar imágenes
let matchedImages = []; // Array para rastrear las imágenes que ya se emparejaron
let isProcessing = false; // Bandera para evitar clics durante el proceso

// Crear las cartas y añadirlas al contenedor
cards.forEach(({ name, url }) => {
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.src = url;
    img.setAttribute('data-name', name);
    img.style.width = '100px';
    img.style.height = '100px';
    img.style.display = 'none'; // Ocultar por defecto
    li.appendChild(img);
    container.appendChild(li);
});

// Manejar el clic en las cartas
container.addEventListener('click', (e) => {
    const target = e.target;

    if (target.tagName === 'LI') {
        const img = target.querySelector('img');
        toggleImageDisplay(img);
        e.stopPropagation(); // Evitar que el clic se propague al window
    }
});

// Manejar clic en cualquier parte de la ventana
window.addEventListener('click', hideAllImages);

function toggleImageDisplay(img) {
    if (isProcessing || matchedImages.includes(img)) return;

    if (img.style.display === 'none' || img.style.display === '') {
        if (selectedImages.includes(img)) {
            return; // Evitar que el jugador seleccione la misma imagen dos veces
        }
        img.style.display = 'block';
        visibleImages.push(img);
        selectedImages.push(img);

        if (selectedImages.length === 2) {
            const [firstImg, secondImg] = selectedImages;
            const firstName = firstImg.dataset.name;
            const secondName = secondImg.dataset.name;

            if (firstName === secondName) {
                // Las cartas son iguales, mantenerlas visibles y agregar a matchedImages
                matchedImages.push(firstImg, secondImg);
                selectedImages = [];
            } else {
                isProcessing = true;
                setTimeout(() => {
                    firstImg.style.display = 'none';
                    secondImg.style.display = 'none';

                    visibleImages.splice(visibleImages.indexOf(firstImg), 1);
                    visibleImages.splice(visibleImages.indexOf(secondImg), 1);

                    selectedImages = [];
                    isProcessing = false;
                }, 800);
            }
        }
    } else {
        img.style.display = 'none';
        visibleImages.splice(visibleImages.indexOf(img), 1);
        selectedImages.splice(selectedImages.indexOf(img), 1);
    }
}

function hideAllImages() {
    visibleImages.forEach(img => {
        if (!matchedImages.includes(img)) {
            img.style.display = 'none';
        }
    });
    visibleImages = visibleImages.filter(img => matchedImages.includes(img)); // Mantener solo las imágenes emparejadas
    selectedImages.length = 0; // Vaciar el array selectedImages
}
