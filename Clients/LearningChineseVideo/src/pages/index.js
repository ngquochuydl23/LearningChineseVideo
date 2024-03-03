import Head from 'next/head';
import { Box, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import GridVideoSection from 'src/sections/home/grid-video-section';
import { getMostPopularVideo, getRecentlyAddedVideo, getVideo, getVideos } from 'src/services/api/video-api';


const Page = () => {
    return (
        <>
            <Head>
                <title>
                    Trang chủ
                </title>
            </Head>
            <Box>
                <GridVideoSection
                    title="Phổ biến nhất"
                    limitPerTrans={4}
                    loadVideos={async (offset, limit) => {
                        return await getMostPopularVideo(0, 12);
                    }} />
                <GridVideoSection
                    title="Mới đăng"
                    limitPerTrans={4}
                    loadVideos={async (offset, limit) => {
                        return await getRecentlyAddedVideo(0, 12);
                    }} />
                <GridVideoSection
                    title="Tất cả video"
                    limitPerTrans={100}
                    loadVideos={async (offset, limit) => {
                        return await getVideos();
                    }} />
            </Box>
        </>
    )
}

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
