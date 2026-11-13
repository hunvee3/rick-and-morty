import {
    Alert,
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Skeleton,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material"
import type { ChipProps } from "@mui/material"
import { useId } from "react"
import type { CharacterStatus } from "../../domain/character-detail.model"
import type { Character } from "../../domain/character.model"
import useCharacterDetails from "../../hooks/useCharacterDetails"

const STATUS_COLOR: Record<CharacterStatus, ChipProps['color']> = {
    Alive: 'success',
    Dead: 'error',
    unknown: 'default',
}

type Props = {
    character: Character | null
    open: boolean
    onClose: () => void
}

const DetailField = ({ label, value, fullWidth }: { label: string, value?: string | number, fullWidth?: boolean }) => (
    <Grid size={fullWidth ? 12 : 6}>
        <Typography variant="overline" color="text.secondary" component="div" sx={{ lineHeight: 1.5 }}>
            {label}
        </Typography>
        <Typography variant="body1">
            {value ?? <Skeleton width="80%" />}
        </Typography>
    </Grid>
)

const CharacterDetailsModal = ({ character, open, onClose }: Props) => {
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const titleId = useId()

    const { data: details, isError } = useCharacterDetails(character?.id ?? null)

    return <Dialog
        open={open}
        onClose={onClose}
        fullScreen={fullScreen}
        fullWidth
        maxWidth="sm"
        aria-labelledby={titleId}
    >
        {character && <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ flex: 1 }}>
            <Box
                component="img"
                src={character.image}
                alt={character.name}
                sx={{
                    display: 'block',
                    flexShrink: 0,
                    width: { xs: '100%', sm: 260 },
                    height: { xs: 280, sm: 'auto' },
                    objectFit: 'cover',
                    objectPosition: 'top',
                }}
            />
            <Stack sx={{ flex: 1, minWidth: 0 }}>
                <DialogTitle component="div">
                    <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography id={titleId} variant="h5" component="h2" noWrap sx={{ fontWeight: 700 }}>
                            {character.name}
                        </Typography>
                        {details
                            ? <Chip label={details.status} color={STATUS_COLOR[details.status]} size="small" />
                            : !isError && <Skeleton variant="rounded" width={64} height={24} />}
                    </Stack>
                </DialogTitle>
                <DialogContent>
                    {isError
                        ? <Alert severity="error">Couldn't load this character's details.</Alert>
                        : <Grid container spacing={2}>
                            <DetailField label="Species" value={details?.species} />
                            <DetailField label="Gender" value={details?.gender} />
                            <DetailField label="Type" value={details && (details.type || '—')} />
                            <DetailField label="Episodes" value={details?.episodeCount} />
                            <DetailField label="Origin" value={details?.origin} fullWidth />
                            <DetailField label="Last known location" value={details?.location} fullWidth />
                        </Grid>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Close</Button>
                </DialogActions>
            </Stack>
        </Stack>}
    </Dialog>
}

export default CharacterDetailsModal
