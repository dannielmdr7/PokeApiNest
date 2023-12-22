import axios from 'axios';

export interface HttpAdapter {
  get: <T>(url: string) => Promise<T>;
}

export class FetchAtapter implements HttpAdapter {
  async get<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);
      return (await response.json()) as T;
    } catch (error) {
      console.error({ error });
      throw new Error(`Error in petition get to ${url}`);
    }
  }
}

export class AxiosAdapter implements HttpAdapter {
  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await axios<T>(url);
      return data;
    } catch (error) {
      console.error({ error });
      throw new Error(`Error in petition get to ${url}`);
    }
  }
}
