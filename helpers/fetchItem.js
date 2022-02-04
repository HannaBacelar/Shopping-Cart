const fetchItem = async (id) => {
  const url = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${id}`);
  const data = await url.json();

  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
