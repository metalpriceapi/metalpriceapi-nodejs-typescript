import axios, { AxiosResponse } from 'axios';

// Response types

export interface SymbolsResponse {
  success: boolean;
  symbols: Record<string, string>;
}

export interface LiveResponse {
  success: boolean;
  base: string;
  timestamp: number;
  rates: Record<string, number>;
}

export interface HistoricalResponse {
  success: boolean;
  base: string;
  timestamp: number;
  rates: Record<string, number>;
}

export interface HourlyEntry {
  timestamp: number;
  rates: Record<string, number>;
}

export interface HourlyResponse {
  success: boolean;
  base: string;
  start_date: string;
  end_date: string;
  rates: HourlyEntry[];
}

export interface OHLCRate {
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface OHLCResponse {
  success: boolean;
  base: string;
  quote: string;
  timestamp: number;
  rate: OHLCRate;
}

export interface ConvertResponse {
  success: boolean;
  query: { from: string; to: string; amount: number };
  info: { quote: number; timestamp: number };
  result: number;
}

export interface TimeframeResponse {
  success: boolean;
  base: string;
  start_date: string;
  end_date: string;
  rates: Record<string, Record<string, number>>;
}

export interface ChangeData {
  start_rate: number;
  end_rate: number;
  change: number;
  change_pct: number;
}

export interface ChangeResponse {
  success: boolean;
  base: string;
  start_date: string;
  end_date: string;
  rates: Record<string, ChangeData>;
}

export interface CaratResponse {
  success: boolean;
  base: string;
  timestamp: number;
  data: Record<string, number>;
}

export interface UsageResponse {
  success: boolean;
  result: {
    plan: string;
    used: number;
    total: number;
    remaining: number;
  };
}

class MetalpriceAPI {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, server: 'us' | 'eu' = 'us') {
    this.apiKey = apiKey;
    this.baseUrl = server === 'eu'
      ? 'https://api-eu.metalpriceapi.com/v1'
      : 'https://api.metalpriceapi.com/v1';
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

  public setServer(server: 'us' | 'eu'): void {
    this.baseUrl = server === 'eu'
      ? 'https://api-eu.metalpriceapi.com/v1'
      : 'https://api.metalpriceapi.com/v1';
  }

  public fetchSymbols(): Promise<AxiosResponse<SymbolsResponse>> {
    return axios<SymbolsResponse>({
      url: `${this.baseUrl}/symbols`,
      params: {
        api_key: this.apiKey,
      },
    });
  }

  public fetchLive(base?: string | null, currencies?: string[] | null, unit?: string | null, purity?: string | null, math?: string | null): Promise<AxiosResponse<LiveResponse>> {
    return axios<LiveResponse>({
      url: `${this.baseUrl}/latest`,
      params: this.removeEmpty({
        api_key: this.apiKey,
        base: base,
        currencies: (currencies || []).join(','),
        unit: unit,
        purity: purity,
        math: math,
      }),
    });
  }

  public fetchHistorical(date: string, base?: string | null, currencies?: string[] | null, unit?: string | null): Promise<AxiosResponse<HistoricalResponse>> {
    return axios<HistoricalResponse>({
      url: `${this.baseUrl}/${date}`,
      params: this.removeEmpty({
        api_key: this.apiKey,
        base: base,
        currencies: (currencies || []).join(','),
        unit: unit,
      }),
    });
  }

  public hourly(base?: string | null, currency?: string | null, unit?: string | null, startDate?: string | null, endDate?: string | null, math?: string | null, dateType?: string | null): Promise<AxiosResponse<HourlyResponse>> {
    return axios<HourlyResponse>({
      url: `${this.baseUrl}/hourly`,
      params: this.removeEmpty({
        api_key: this.apiKey,
        base: base,
        currency: currency,
        unit: unit,
        start_date: startDate,
        end_date: endDate,
        math: math,
        date_type: dateType,
      }),
    });
  }

  public ohlc(base: string, currency: string, date?: string | null, unit?: string | null, dateType?: string | null): Promise<AxiosResponse<OHLCResponse>> {
    return axios<OHLCResponse>({
      url: `${this.baseUrl}/ohlc`,
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

  public convert(from: string, to: string, amount: number, date?: string | null, unit?: string | null): Promise<AxiosResponse<ConvertResponse>> {
    return axios<ConvertResponse>({
      url: `${this.baseUrl}/convert`,
      params: this.removeEmpty({
        api_key: this.apiKey,
        from: from,
        to: to,
        amount: amount,
        date: date,
        unit: unit,
      }),
    });
  }

  public timeframe(startDate: string, endDate: string, base?: string | null, currencies?: string[] | null, unit?: string | null): Promise<AxiosResponse<TimeframeResponse>> {
    return axios<TimeframeResponse>({
      url: `${this.baseUrl}/timeframe`,
      params: this.removeEmpty({
        api_key: this.apiKey,
        start_date: startDate,
        end_date: endDate,
        base: base,
        currencies: (currencies || []).join(','),
        unit: unit,
      }),
    });
  }

  public change(startDate: string, endDate: string, base?: string | null, currencies?: string[] | null, dateType?: string | null): Promise<AxiosResponse<ChangeResponse>> {
    return axios<ChangeResponse>({
      url: `${this.baseUrl}/change`,
      params: this.removeEmpty({
        api_key: this.apiKey,
        start_date: startDate,
        end_date: endDate,
        base: base,
        currencies: (currencies || []).join(','),
        date_type: dateType,
      }),
    });
  }

  public carat(base?: string | null, currency?: string | null, date?: string | null): Promise<AxiosResponse<CaratResponse>> {
    return axios<CaratResponse>({
      url: `${this.baseUrl}/carat`,
      params: this.removeEmpty({
        api_key: this.apiKey,
        base: base,
        currency: currency,
        date: date,
      }),
    });
  }

  public usage(): Promise<AxiosResponse<UsageResponse>> {
    return axios<UsageResponse>({
      url: `${this.baseUrl}/usage`,
      params: this.removeEmpty({
        api_key: this.apiKey,
      }),
    });
  }
}

export default MetalpriceAPI;
