import Head from 'next/head';
import {
    Box,
    Container,
    Stack,
    Typography,
    Unstable_Grid2 as Grid,
    Avatar
} from '@mui/material';
import { useEffect, useState } from 'react';

import { Layout as AdminLayout } from 'src/layouts/admin-layout/layout';
import { getVideo } from 'src/services/api/video-api';
import { useRouter } from 'next/router';
const Page = () => {
    const router = useRouter();
    const { id } = router.query;
    const [video, setVideo] = useState();
    console.log(id);
    useEffect(() => {
        getVideo(id)
            .then((res) => {
                console.log(res);
                setVideo(res)
            })
            .catch((err) => console.log(err));
    }, [])


    if (!video) {
        return null;
    }



    return (
        <>
            <Head>
                <title>
                    {video.title}
                </title>
            </Head>
            <Box
                component="main"
                sx={{ flexGrow: 1 }}>
                <Container maxWidth="lg">
                    <Stack direction="row">

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