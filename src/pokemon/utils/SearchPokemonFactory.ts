import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from '../entities/pokemon.entity';

abstract class Search {
  abstract search(): Promise<any>;
}

class FindByName implements Search {
  PokemonModel;
  constructor(
    private name: string,
    private pokemonModel: Model<Pokemon>,
  ) {}
  async search(): Promise<any> {
    return await this.pokemonModel.findOne({ name: this.name });
  }
}

class FindById implements Search {
  constructor(
    private id: string,
    private pokemonModel: Model<Pokemon>,
  ) {}
  async search(): Promise<any> {
    return await this.pokemonModel.findById(this.id);
  }
}

class FindByPokemonId implements Search {
  constructor(
    private pokemonId: string,
    private pokemonModel: Model<Pokemon>,
  ) {}
  async search(): Promise<any> {
    return await this.pokemonModel.findOne({ no: this.pokemonId });
  }
}

export const PokemonPetitionFactory = (
  param: string,
  pokemonModel: Model<Pokemon>,
) => {
  if (!isNaN(+param)) {
    return new FindByPokemonId(param, pokemonModel);
  } else if (isValidObjectId(param)) {
    return new FindById(param, pokemonModel);
  } else {
    return new FindByName(param, pokemonModel);
  }
};
