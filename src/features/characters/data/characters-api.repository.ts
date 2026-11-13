import type { CharacterDetail, CharacterStatus } from "../domain/character-detail.model";
import type { Character } from "../domain/character.model";
import type { CharactersSearcher } from "../domain/characters-searcher.port";

const API_URL = 'https://rickandmortyapi.com/api/character';

type ApiCharacter = {
    id: number;
    name: string;
    status: CharacterStatus;
    species: string;
    type: string;
    gender: string;
    origin: { name: string; url: string };
    location: { name: string; url: string };
    image: string;
    episode: string[];
}

type ApiCharactersPage = {
    results: ApiCharacter[];
}

export class CharactersApiRepository implements CharactersSearcher {
    async searchAll(): Promise<Character[]> {
        const data = await this.request<ApiCharactersPage>(API_URL);
        return data.results.map(c => this.mapToCharacter(c));
    }

    async searchById(id: number): Promise<CharacterDetail> {
        const data = await this.request<ApiCharacter>(`${API_URL}/${id}`);
        return this.mapToCharacterDetail(data);
    }

    private async request<T>(url: string): Promise<T> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
    }

    private mapToCharacter(data: ApiCharacter): Character {
        return {
            id: data.id,
            name: data.name,
            image: data.image
        };
    }

    private mapToCharacterDetail(data: ApiCharacter): CharacterDetail {
        return {
            id: data.id,
            name: data.name,
            status: data.status,
            species: data.species,
            type: data.type,
            gender: data.gender,
            origin: data.origin.name,
            location: data.location.name,
            image: data.image,
            episodeCount: data.episode.length
        };
    }
}

export const charactersRepository = new CharactersApiRepository();
