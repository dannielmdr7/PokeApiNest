import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HandleErrorsResponse } from 'src/utils/handleErrors';
import { HandleCustomResponse } from 'src/utils/hanldeCustomResponse';
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
      return HandleCustomResponse({ status: 'success', data: newPokemon });
    } catch (error) {
      return HandleErrorsResponse(error);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(param: string) {
    try {
      const pokemon = await PokemonPetitionFactory(
        param.toLowerCase().trim(),
        this.pokemonModel,
      );
      if (!pokemon) {
        HandleCustomResponse({
          status: 'error',
          msg: `The Pokemon with search param ${param} has not found`,
        });
      }
      return pokemon;
    } catch (error) {
      return HandleErrorsResponse(error);
    }
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    try {
      const pokemonDb = await PokemonPetitionFactory(term, this.pokemonModel);
      if (pokemonDb) {
        updatePokemonDto.name =
          updatePokemonDto.name && updatePokemonDto.name.toLowerCase();
        await pokemonDb.updateOne(updatePokemonDto, {
          new: true,
        });
        return HandleCustomResponse({
          status: 'success',
          data: { ...pokemonDb.toJSON(), ...updatePokemonDto },
        });
      }
    } catch (error) {
      return HandleErrorsResponse(error);
    }
  }

  async remove(id: string) {
    try {
      const pokemonDb = await PokemonPetitionFactory(id, this.pokemonModel);
      if (pokemonDb) {
        await this.pokemonModel.findByIdAndDelete({ _id: pokemonDb._id });
        return HandleCustomResponse({
          status: 'success',
          msg: 'Pokemon has been deleted successfully',
        });
      }
      return HandleCustomResponse({
        status: 'error',
        msg: 'Pokemon is not found in db ',
      });
    } catch (error) {
      return HandleErrorsResponse(error);
    }
  }
}
