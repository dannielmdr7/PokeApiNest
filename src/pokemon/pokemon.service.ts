import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HandleErrorsResponse } from 'src/utils/handleErrors';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonPetitionFactory } from './utils/SearchPokemonFactory';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) { }

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      createPokemonDto.name = createPokemonDto.name.toLowerCase();
      const newPokemon = await this.pokemonModel.create(createPokemonDto);
      return newPokemon;
    } catch (error) {
      return HandleErrorsResponse(error);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(param: string) {
    const pokemon = await PokemonPetitionFactory(
      param,
      this.pokemonModel,
    ).search();
    if (!pokemon) {
      throw new NotFoundException(
        `The Pokemon with search param ${param} has not found`,
      );
    }
    return pokemon;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
