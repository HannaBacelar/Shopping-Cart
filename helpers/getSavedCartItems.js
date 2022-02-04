const getSavedCartItems = () => {
  const recuperando = localStorage.getItem('cartItems');
  return recuperando; 
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
