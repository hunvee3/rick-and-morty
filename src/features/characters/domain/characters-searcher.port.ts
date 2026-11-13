import type { CharacterDetail } from "./character-detail.model";
import type { Character } from "./character.model";

export interface CharactersSearcher {
    searchAll(): Promise<Character[]>;
    searchById(id: number): Promise<CharacterDetail>;
}
