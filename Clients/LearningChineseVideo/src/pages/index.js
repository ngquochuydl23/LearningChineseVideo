import Head from 'next/head';
import { Box, Unstable_Grid2 as Grid, Stack, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useState } from 'react';
import GridVideoCard from 'src/components/grid-video-card';
import GridVideoSection from 'src/sections/home/grid-video-section';
import { da } from 'date-fns/locale';
import { getMostPopularVideo, getRecentlyAddedVideo } from 'src/services/api/video-api';

const data = {
    mostPopular: [
        {
            id: 'abc-xyz',
            thumbnail: '/storage/c29jaWFsLXYyLmNsb3RoZXMwLTE3MDY1OTk5MDU4MzE=',
            title: `How to Express “-ing” in Chinese`,
            level: 1,
            tags: ['Động vật', 'Trẻ em', 'Thành phố']
        },
        {
            id: 'abc-xyz',
            thumbnail: '/storage/c29jaWFsLXYyLmNsb3RoZXMwLTE3MDY1OTk5MDU4MzE=',
            title: `How to Express “-ing” in Chinese`,
            level: 1,
            tags: ['Động vật', 'Trẻ em', 'Thành phố']
        },
        {
            id: 'abc-xyz',
            thumbnail: '/storage/c29jaWFsLXYyLmNsb3RoZXMwLTE3MDY1OTk5MDU4MzE=',
            title: `Thích Thích - PHƯƠNG LY | ‘Phiêu Nhịp Thở’ Music Show`,
            level: 1,
            tags: ['Động vật', 'Trẻ em', 'Thành phố']
        },
        {
            id: 'abc-xyz',
            thumbnail: '/storage/c29jaWFsLXYyLmNsb3RoZXMwLTE3MDY1OTk5MDU4MzE=',
            title: `Thích Thích - PHƯƠNG LY | ‘Phiêu Nhịp Thở’ Music Show`,
            level: 1,
            tags: ['Động vật', 'Trẻ em', 'Thành phố']
        }
    ]
}


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
                        return data.mostPopular
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
