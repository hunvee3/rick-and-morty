import { charactersRepository } from "../data/characters-api.repository"
import { skipToken, useQuery } from "@tanstack/react-query"

const useCharacterDetails = (id: number | null) => useQuery({
    queryKey: ['characters', id],
    queryFn: id === null ? skipToken : () => charactersRepository.searchById(id),
    staleTime: Infinity,
})

export default useCharacterDetails
