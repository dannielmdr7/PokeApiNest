import axios from 'axios';

export interface HttpAdapter {
  get: <T>(url: string) => Promise<T>;
}

export class FetchAtapter implements HttpAdapter {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url);
    return (await response.json()) as T;
  }
}

export class AxiosAdapter implements HttpAdapter {
  async get<T>(url: string): Promise<T> {
    const { data } = await axios<T>(url);
    return data;
  }
}
