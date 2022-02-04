const saveCartItems = (lista) => {
  const salve = localStorage.setItem('cartItems', lista);
  return salve; 
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
