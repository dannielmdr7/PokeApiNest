import { Injectable } from '@nestjs/common';
import { FetchAtapter, HttpAdapter } from 'src/adapters/HttpAdapter';
import { Pokemon, PokemonRequest } from './interfaces/Pokemon.interface';

@Injectable()
export class SeedService {
  private hpptAdapter: HttpAdapter;
  constructor() {
    this.hpptAdapter = new FetchAtapter();
  }
  async executeSeed() {
    const { results } = await this.getPokemons();
    const formatedPokemons = this.getFormatPokemons(results);
    return formatedPokemons;
  }
  async getPokemons() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=10';
    return await this.hpptAdapter.get<PokemonRequest>(url);
  }
  getFormatPokemons(data: Pokemon[]) {
    return data.map(({ name, url }) => {
      const urlSplited = url.split('/');
      const no = +urlSplited[urlSplited.length - 2];
      return {
        name,
        no,
      };
    });
  }
}
