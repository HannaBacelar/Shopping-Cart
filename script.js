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
function cartItemClickListener(event) {
  event.target.remove();
}
function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
async function check() {
  const computer = await fetchProducts('computador');
  console.log({ computer });
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
      const sectionOl = document.querySelector('.cart__items');
      sectionOl.appendChild(createCartItemElement(create));
    });
  });
}
const capturaBotão = document.querySelector('.empty-cart');
function limpaBotão() {
  const pegaOl = document.querySelector('.cart__items');
  pegaOl.innerHTML = '';
}
capturaBotão.addEventListener('click', limpaBotão);

window.onload = async () => {
  await check();
  eventInButton();
};