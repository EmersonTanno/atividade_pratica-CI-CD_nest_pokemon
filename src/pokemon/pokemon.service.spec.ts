import { PokemonService } from './pokemon.service';
import { NotFoundException } from '@nestjs/common';

describe('PokemonService', () => {
  let service: PokemonService;

  beforeEach(() => {
    service = new PokemonService();
  });

  it('should create a Pokémon', () => {
    const created = service.create({ name: 'Bulbasaur', dexNumber: 1 });
    expect(created).toEqual({ id: 1, name: 'Bulbasaur', dexNumber: 1 });
  });

  it('should return all Pokémons', () => {
    service.create({ name: 'Charmander', dexNumber: 4 });
    service.create({ name: 'Squirtle', dexNumber: 7 });

    const all = service.findAll();
    expect(all.length).toBe(2);
  });

  it('should return a Pokémon by ID', () => {
    const created = service.create({ name: 'Pikachu', dexNumber: 25 });
    const found = service.findOne(created.id);
    expect(found).toEqual(created);
  });

  it('should throw NotFoundException if Pokémon not found (findOne)', () => {
    expect(() => service.findOne(999)).toThrow(NotFoundException);
  });

  it('should throw NotFoundException if Pokémon not found (update)', () => {
    expect(() => service.update(999, { name: 'Snorlax' })).toThrow(NotFoundException);
  });

  it('should remove a Pokémon', () => {
    const created = service.create({ name: 'Jigglypuff', dexNumber: 39 });
    service.remove(created.id);
    expect(() => service.findOne(created.id)).toThrow(NotFoundException);
  });

  it('should throw NotFoundException if Pokémon not found (remove)', () => {
    expect(() => service.remove(999)).toThrow(NotFoundException);
  });
});
