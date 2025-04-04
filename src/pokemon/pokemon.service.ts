import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  private pokemons: Pokemon[] = [];
  private idCounter = 1;

  create(dto: CreatePokemonDto): Pokemon {
    const pokemon: Pokemon = {
      id: this.idCounter++,
      ...dto,
    };
    this.pokemons.push(pokemon);
    return pokemon;
  }

  findAll(): Pokemon[] {
    return this.pokemons;
  }

  findOne(id: number): Pokemon {
    const found = this.pokemons.find((p) => p.id === id);
    if (!found) throw new NotFoundException('Pokémon not found');
    return found;
  }

  update(id: number, dto: UpdatePokemonDto): Pokemon {
    const pokemon = this.findOne(id);
    Object.assign(pokemon, dto);
    return pokemon;
  }

  remove(id: number): void {
    const index = this.pokemons.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException('Pokémon not found');
    this.pokemons.splice(index, 1);
  }

  
}
