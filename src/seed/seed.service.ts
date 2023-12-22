import { Injectable } from '@nestjs/common';
import { FetchAtapter, HttpAdapter } from 'src/common/adapters/HttpAdapter';
import { Pokemon, PokemonRequest } from './interfaces/Pokemon.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';

@Injectable()
export class SeedService {
  private hpptAdapter: HttpAdapter;
  constructor(private pokemonService: PokemonService) {
    this.hpptAdapter = new FetchAtapter();
  }
  async executeSeed() {
    const { results } = await this.getPokemons();
    const formatedPokemons = this.getFormatPokemons(results);
    await this.pokemonService.clearDb();
    // this.savePokemons(formatedPokemons);
    // this.saveBulkPokemons(formatedPokemons);
    this.insertMany(formatedPokemons);
    return formatedPokemons;
  }

  async insertMany(pokemons: CreatePokemonDto[]) {
    try {
      await this.pokemonService.insertMany(pokemons);
    } catch (error) {
      console.error({ error });
    }
  }
  async saveBulkPokemons(pokemons: CreatePokemonDto[]) {
    try {
      const pokemonToInsertArr: Promise<{
        ok: boolean;
        msg: string;
        data: any;
      }>[] = [];
      pokemons.forEach((pokemon) => {
        pokemonToInsertArr.push(this.pokemonService.create(pokemon));
      });
      await Promise.all(pokemonToInsertArr);
    } catch (error) {
      console.error({ error });
    }
  }

  async savePokemons(pokemons: CreatePokemonDto[]) {
    try {
      for (const pokemon of pokemons) {
        await this.pokemonService.create(pokemon);
      }
    } catch (error) {
      console.error({ error });
    }
  }

  async getPokemons() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=650';
    return await this.hpptAdapter.get<PokemonRequest>(url);
  }

  getFormatPokemons(data: Pokemon[]): CreatePokemonDto[] {
    return data.map(({ name, url }) => {
      const urlSplited = url.split('/');
      const no = +urlSplited[urlSplited.length - 2];
      return { name, no };
    });
  }
}
