require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

//  teste 1
describe('1 - Teste a função fecthProducts', () => {
  it('Deve verificar se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');  
});

// teste 2
it('Deve Chama a função fetch', async () => {
  expect.assertions(1);
  const result = await fetchProducts('computador');
  expect(fetch).toBeCalled();
});

// teste 3 
  it('Deve retornar o fetch endpoint correto', async () => {
    expect.assertions(1);

    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    const result = await fetchProducts('computador');
     expect(fetch).toBeCalledWith(url); 
  });

  //  teste 4 
  it ('Verifica se o retorno da função `fetchProducts` com o argumento "computador" é uma estrutura de dados igual ao objeto `computadorSearch', async () => {
    expect.assertions(1);
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);

  });
  //  teste 5
  it ('Deve retornar erro se parametro for vazio', async ()=> {
    expect.assertions(1);

    try {
      await fetchProducts();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });
 });
