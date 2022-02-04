require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
//  teste 1
  it('Deve verificar se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');  
});

// teste 2
it('Deve chamar a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada', async () => {
  expect.assertions(1);
  const result = await fetchItem('MLB1615760527');
  expect(fetch).toBeCalled();
});

// teste 3 
  it('Deve retornar o fetch endpoint correto', async () => {
     expect.assertions(1);

    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    const result = await fetchItem ('MLB1615760527');
     expect(fetch).toBeCalledWith(url); 
  });

  //  teste 4 
   it ('Deve verificar se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item', async () => {
     expect.assertions(1);
     const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);

   });

  //  teste 5
  it ('Deve retornar erro se parametro for vazio', async ()=> {
     expect.assertions(1);

    try {
      await fetchItem();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });
 });
  
