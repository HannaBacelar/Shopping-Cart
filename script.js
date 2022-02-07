const ol = document.querySelector('.cart__items'); 

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
 e.className = className;
 e.innerText = innerText;
  return e;
}
function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
}
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}
function salveItemLocalStorage() {
  const listaOl = document.querySelector('.cart__items').innerHTML;
  saveCartItems(listaOl);
}

function cartItemClickListener(event) {
  event.target.remove();
  salveItemLocalStorage();
}


function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
async function addItemsLista() {
  const computer = await fetchProducts('computador');
  computer.results.forEach((product) => {
    const object = {
      sku: product.id,
      name: product.title,
      image: product.thumbnail,
    };
    const section = document.querySelector('.items');
    section.appendChild(createProductItemElement(object));
  });
}
function eventInButton() {
  const capturaComputador = document.querySelectorAll('.item');
  capturaComputador.forEach((item) => {
    const sku = getSkuFromProductItem(item);
    const takeButton = item.querySelector('button');
    takeButton.addEventListener('click', async () => {
      const obj = await fetchItem(sku);
      const create = {
        sku: obj.id,
        name: obj.title,
        salePrice: obj.price,
      };
      ol.appendChild(createCartItemElement(create));
      salveItemLocalStorage();
    });
  });
}
function CapturaLocaLStorange() {
  const saved = getSavedCartItems();

  if (saved) {
    ol.innerHTML = saved; 
    document.querySelectorAll('.cart__item').forEach((li) => {
      li.addEventListener('click', cartItemClickListener);
    });
  }
}
// AJUDA Roverval //

const capturaBotão = document.querySelector('.empty-cart');
function limpaBotão() {
   ol.innerHTML = '';
  salveItemLocalStorage();
}
capturaBotão.addEventListener('click', limpaBotão);

function carregaTexto() {
  const section = document.createElement('section');
  section.innerText = 'carregando...';
  section.className = 'loading';
  document.querySelector('.items').appendChild(section);
  }
  
  function loading() {
  document.querySelector('.loading').remove();
  } 
  
window.onload = async () => {
  carregaTexto();
  await addItemsLista();
  eventInButton();
  CapturaLocaLStorange();
  loading();
};