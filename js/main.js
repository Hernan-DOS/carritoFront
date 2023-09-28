
const carrito = document.querySelector('#carrito');
const listaSuscripcion = document.querySelector('#lista-Suscripcion');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
let articulosCarrito = [];


cargarEventListeners();

function cargarEventListeners() {     
     listaSuscripcion.addEventListener('click', agregarSuscripcion);     
     carrito.addEventListener('click', eliminarSuscripcion);     
     vaciarCarritoBtn.addEventListener('click', vaciarSuscripcion);
}



function agregarSuscripcion(e) {
     e.preventDefault();
     
     if(e.target.classList.contains('agregar-carrito')) {
          const Suscripcion = e.target.parentElement.parentElement;
          leerDatosSuscripcion(Suscripcion);
     }
}


function leerDatosSuscripcion(Suscripcion) {
     const infoSuscripcion = {
          imagen: Suscripcion.querySelector('img').src,
          titulo: Suscripcion.querySelector('h4').textContent,
          precio: Suscripcion.querySelector('.precio span').textContent,
          id: Suscripcion.querySelector('a').getAttribute('data-id'), 
          cantidad: 1
     }


     if( articulosCarrito.some( Suscripcion => Suscripcion.id === infoSuscripcion.id ) ) { 
          const Suscripcion = articulosCarrito.map( Suscripcion => {
               if( Suscripcion.id === infoSuscripcion.id ) {
                    Suscripcion.cantidad++;
                     return Suscripcion;
                } else {
                     return Suscripcion;
             }
          })
          articulosCarrito = [...Suscripcion];
     }  else {
          articulosCarrito = [...articulosCarrito, infoSuscripcion];
     }

     console.log(articulosCarrito)  

    
     carritoHTML();
}

function eliminarSuscripcion(e) {
     e.preventDefault();
     if(e.target.classList.contains('borrar-Suscripcion') ) {
          const SuscripcionId = e.target.getAttribute('data-id')          
          articulosCarrito = articulosCarrito.filter(Suscripcion => Suscripcion.id !== SuscripcionId);
          carritoHTML();
     }
}

function carritoHTML() {
     vaciarCarrito();
     articulosCarrito.forEach(Suscripcion => {
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>  
                    <img src="${Suscripcion.imagen}" width=100>
               </td>
               <td>${Suscripcion.titulo}</td>
               <td>${Suscripcion.precio}</td>
               <td>${Suscripcion.cantidad} </td>
               <td>
                    <a href="#" class="borrar-Suscripcion" data-id="${Suscripcion.id}">X</a>
               </td>
          `;
          contenedorCarrito.appendChild(row);
     });
}

function vaciarCarrito() {
    
         while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
      }
}


   