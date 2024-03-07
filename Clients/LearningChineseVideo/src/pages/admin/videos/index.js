import Head from 'next/head';
import {
    Box,
    Container,
    Stack,
    Typography,
    Unstable_Grid2 as Grid,
    CircularProgress
} from '@mui/material';
import { Layout as AdminLayout } from 'src/layouts/admin-layout/layout';
import GridVideoAdminCard from 'src/components/grid-video-admin-card';
import { useEffect, useState } from 'react';
import { delVideo, getVideos } from 'src/services/api/video-api';
import { useSnackbar } from 'notistack';


const Page = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchVideo = () => {
        setLoading(true);
        getVideos()
            .then((res) => { setVideos(res) })
            .catch((err) => console.log())
            .finally(() => setLoading(false))
    }

    const deleteVideo = (id) => {
        delVideo(id)
            .then(() => {
                console.log(`Video ${id} is successfully deleted.`);
                fetchVideo();
                enqueueSnackbar(`Đã xóa thành công video ${id}`, {
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right'
                    }
                });
            })
            .catch(err => {
                console.log(err);
                enqueueSnackbar(`Xóa video thất bại`, {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right'
                    }
                });
            })
    }

    useEffect(() => {
        fetchVideo();
    }, [])

    return (
        <>
            <Head>
                <title>
                    Danh sách video
                </title>
            </Head>
            <Box
                component="main"
                sx={{ flexGrow: 1 }}>
                <Container maxWidth="lg">
                    <Stack spacing={3} paddingBottom="30px">
                        <Typography variant="h4">
                            Danh sách video ({videos.length})
                        </Typography>
                        {loading ?
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                            : _.map(videos, (video) => (
                                <GridVideoAdminCard
                                    {...video}
                                    onDeleteItem={deleteVideo}
                                />
                            ))
                        }
                    </Stack>
                </Container>
            </Box>
        </>
    )
}

Page.getLayout = (page) => (
    <AdminLayout>
        {page}
    </AdminLayout>
);

export default Page;
