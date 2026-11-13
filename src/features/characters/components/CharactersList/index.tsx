import { Alert, Container, Grid, Typography } from "@mui/material"
import { useState } from "react"
import type { Character } from "../../domain/character.model"
import useCharacters from "../../hooks/useCharacters"
import CharacterItem, { CharacterItemSkeleton } from "../CharacterItem"
import CharacterDetailsModal from "../CharacterDetailsModal"

const GRID_ITEM_SIZE = { xs: 6, sm: 4, md: 3 }
const SKELETON_COUNT = 12

const CharacterList = () => {
    const { data, isPending, isError, error } = useCharacters()

    const [selected, setSelected] = useState<Character | null>(null)
    const [open, setOpen] = useState(false)

    const handleItemClicked = (character: Character) => {
        setSelected(character)
        setOpen(true)
    }

    const getContent = () => {
        if (isError)
            return <Alert severity="error">Couldn't load characters: {error.message}</Alert>

        return <Grid container spacing={2}>
            {isPending
                ? Array.from({ length: SKELETON_COUNT }, (_, i) =>
                    <Grid key={i} size={GRID_ITEM_SIZE}><CharacterItemSkeleton /></Grid>)
                : data.map((character) =>
                    <Grid key={character.id} size={GRID_ITEM_SIZE}>
                        <CharacterItem character={character} onClick={handleItemClicked} />
                    </Grid>)}
        </Grid>
    }

    return <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Rick and Morty characters
        </Typography>
        {getContent()}
        <CharacterDetailsModal character={selected} open={open} onClose={() => setOpen(false)} />
    </Container>
}

export default CharacterList
