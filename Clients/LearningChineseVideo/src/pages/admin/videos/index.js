import Head from 'next/head';
import {
    Box,
    Container,
    Stack,
    Typography,
    Unstable_Grid2 as Grid,
    Button,
    CircularProgress
} from '@mui/material';
import { Layout as AdminLayout } from 'src/layouts/admin-layout/layout';
import GridVideoAdminCard from 'src/components/grid-video-admin-card';
import { useEffect, useState } from 'react';
import { getVideos } from 'src/services/api/video-api';

const Page = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getVideos()
            .then((res) => { setVideos(res) })
            .catch((err) => console.log())
            .finally(() => setLoading(false))
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
                            Danh sách video (38)
                        </Typography>
                        {loading ?
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                            : _.map(videos, (video) => (
                                <GridVideoAdminCard {...video} />
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
