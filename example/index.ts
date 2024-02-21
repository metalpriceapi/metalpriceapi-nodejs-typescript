import MetalpriceAPI from '../index';
// import MetalpriceAPI from 'metalpriceapi-ts';

const apiKey = 'REPLACE_ME';
const api = new MetalpriceAPI(apiKey);

(async function() {
  try {
    var result;

    result = await api.fetchSymbols();
    console.log(result.data);

    result = await api.fetchLive('USD', ['XAU', 'XAG', 'XPD', 'XPT']);
    console.log(result.data);

    result = await api.fetchHistorical('2024-02-05', 'USD', ['XAU', 'XAG', 'XPD', 'XPT']);
    console.log(result.data);

    result = await api.convert('USD', 'EUR', 100, '2024-02-05');
    console.log(result.data);

    result = await api.timeframe('2024-02-05', '2024-02-06', 'USD', ['XAU', 'XAG', 'XPD', 'XPT']);
    console.log(result.data);

    result = await api.change('2024-02-05', '2024-02-06', 'USD', ['XAU', 'XAG', 'XPD', 'XPT']);
    console.log(result.data);

    result = await api.carat('USD', '2024-02-06');
    console.log(result.data);
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
