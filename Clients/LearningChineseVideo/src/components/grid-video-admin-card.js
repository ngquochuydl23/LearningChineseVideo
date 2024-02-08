import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, CardMedia, Chip, Stack } from '@mui/material';
import readMediaUrl from 'src/utils/read-media-url';
import Link from 'next/link';


const GridVideoAdminCard = ({
    id,
    thumbnail,
    title,
    level,
    topics,
    duration
}) => {
    return (
        <Stack
            component={Link}
            href={"/admin/videos/" + id}
            direction="row"
            sx={{ width: '100%', textDecoration: 'none' }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                position: 'relative'
            }}>
                <img
                    style={{
                        borderRadius: '10px',
                        height: '100px',
                        width: '170px',
                        transition: 'transform .2s',
                        position: 'relative'
                    }}
                    src={readMediaUrl(thumbnail)}
                />
                <div
                    style={{
                        margin: '10px',
                        display: 'flex',
                        position: 'absolute',
                        zIndex: 1
                    }}>
                    <Chip
                        sx={{
                            fontWeight: '600',
                            backgroundColor: 'green',
                            fontSize: '14px',
                            color: 'white'
                        }}
                        label={"HSK " + level} />
                </div>
            </div>
            <Box sx={{ padding: '10px', ml: '10px' }}>
                <Typography
                    fontSize="20px"
                    gutterBottom
                    variant="h5"
                    sx={{ color: 'black' }}
                    component="div">
                    {title}
                </Typography>
                <Typography
                    fontSize='14px'
                    variant="subtitle2"
                    color="text.secondary">
                    Tải lên lúc: {`25/1/2024`}
                </Typography>
                <Typography
                    fontSize='14px'
                    variant="subtitle2"
                    color="text.secondary">
                    Chủ đề: {topics.join(', ')}
                </Typography>
            </Box>
        </Stack>
    )
}

export default GridVideoAdminCard;