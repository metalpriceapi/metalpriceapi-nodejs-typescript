import axios from 'axios';

class MetalpriceAPI {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private removeEmpty(obj: Record<string, any>): Record<string, any> {
    Object.keys(obj).forEach((key) => {
      if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
        delete obj[key];
      }
    });
    return obj;
  }

  public setAPIKey(apiKey: string): void {
    this.apiKey = apiKey;
  }

  public fetchSymbols(): Promise<any> {
    return axios({
      url: 'https://api.metalpriceapi.com/v1/symbols',
      params: {
        api_key: this.apiKey,
      },
    });
  }

  public fetchLive(base?: string, currencies?: string[]): Promise<any> {
    return axios({
      url: 'https://api.metalpriceapi.com/v1/latest',
      params: this.removeEmpty({
        api_key: this.apiKey,
        base: base,
        currencies: currencies?.join(','),
      }),
    });
  }

  public fetchHistorical(date: string, base?: string, currencies?: string[]): Promise<any> {
    return axios({
      url: `https://api.metalpriceapi.com/v1/${date}`,
      params: this.removeEmpty({
        api_key: this.apiKey,
        base: base,
        currencies: currencies?.join(','),
      }),
    });
  }

  public ohlc(base: string, currency: string, date?: string, unit?: string, dateType?: string): Promise<any> {
    return axios({
      url: 'https://api.metalpriceapi.com/v1/ohlc',
      params: this.removeEmpty({
        api_key: this.apiKey,
        base: base,
        currency: currency,
        date: date,
        unit: unit,
        date_type: dateType,
      }),
    });
  }

  public convert(from: string, to: string, amount: number, date?: string): Promise<any> {
    return axios({
      url: 'https://api.metalpriceapi.com/v1/convert',
      params: this.removeEmpty({
        api_key: this.apiKey,
        from: from,
        to: to,
        amount: amount,
        date: date,
      }),
    });
  }

  public timeframe(startDate: string, endDate: string, base?: string, currencies?: string[]): Promise<any> {
    return axios({
      url: 'https://api.metalpriceapi.com/v1/timeframe',
      params: this.removeEmpty({
        api_key: this.apiKey,
        start_date: startDate,
        end_date: endDate,
        base: base,
        currencies: currencies?.join(','),
      }),
    });
  }

  public change(startDate: string, endDate: string, base?: string, currencies?: string[]): Promise<any> {
    return axios({
      url: 'https://api.metalpriceapi.com/v1/change',
      params: this.removeEmpty({
        api_key: this.apiKey,
        start_date: startDate,
        end_date: endDate,
        base: base,
        currencies: currencies?.join(','),
      }),
    });
  }

  public carat(base?: string, date?: string): Promise<any> {
    return axios({
      url: 'https://api.metalpriceapi.com/v1/carat',
      params: this.removeEmpty({
        api_key: this.apiKey,
        base,
        date,
      }),
    });
  }

  public usage(): Promise<any> {
    return axios({
      url: 'https://api.metalpriceapi.com/v1/usage',
      params: {
        api_key: this.apiKey,
      },
    });
  }
}

export default MetalpriceAPI;
