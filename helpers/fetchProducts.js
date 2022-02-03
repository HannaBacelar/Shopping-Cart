const fetchProducts = async (produto) => {
    const url = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${produto}`);
    const data = await url.json();

    return data; 
};
  
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
