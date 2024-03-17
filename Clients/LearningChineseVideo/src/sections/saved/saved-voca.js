import { Box, Typography } from "@mui/material";



const SavedVoca = ({
    vocabularyId,
    showedTo,
    showedFrom,
    createdAt,
    sentence,
    vocabulary
}) => {
    return (
        <Box>
            <Typography variant="h5">{vocabularyId}</Typography>
            <Typography
                sx={{
                    marginTop: '10px',
                    fontSize: '16px'
                }}
                variant="subtitle2">
                Câu: {sentence}
            </Typography>
        </Box>
    )
}

export default SavedVoca;