import { charactersRepository } from "../data/characters-api.repository"
import { useQuery } from '@tanstack/react-query'

const useCharacters = () => useQuery({
    queryKey: ['characters'],
    queryFn: () => charactersRepository.searchAll(),
    staleTime: Infinity,
})

export default useCharacters
