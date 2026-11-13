import { Card, CardActionArea, CardContent, CardMedia, Skeleton, Typography } from "@mui/material"
import type { Character } from "../../domain/character.model"

type Props = {
    character: Character
    onClick: (character: Character) => void
}

const CharacterItem = ({ character, onClick }: Props) => (
    <Card>
        <CardActionArea onClick={() => onClick(character)}>
            <CardMedia
                component="img"
                image={character.image}
                alt={character.name}
                loading="lazy"
                sx={{ aspectRatio: '1' }}
            />
            <CardContent>
                <Typography variant="subtitle1" component="h2" noWrap sx={{ fontWeight: 600 }}>
                    {character.name}
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
)

export const CharacterItemSkeleton = () => (
    <Card>
        <Skeleton variant="rectangular" sx={{ aspectRatio: '1', height: 'auto' }} />
        <CardContent>
            <Typography variant="subtitle1">
                <Skeleton width="70%" />
            </Typography>
        </CardContent>
    </Card>
)

export default CharacterItem
