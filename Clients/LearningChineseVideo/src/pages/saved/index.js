import Head from 'next/head';
import { Box, Unstable_Grid2 as Grid, Stack, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useEffect } from 'react';
import _ from 'lodash';
import SavedVocaVideo from 'src/sections/saved/saved-voca-video';

const data = [
    {
        "video": {
            "id": "a465babc-4901-4009-808b-804862165f15",
            "title": "KỸ NĂNG TRỞ THÀNH BẬC THẦY KỂ CHUYỆN",
            "description": "Nguồn video: https://www.youtube.com/watch?v=apkidpdcuMU&t=491s\nDịch video: Thùy Trâm\n",
            "viewerCount": 17,
            "commentCount": 0,
            "likeCount": 0,
            "videoUrl": "/storage/video/c08f798a86247291cd3903b39e71dc8c.mp4",
            "thumbnail": "/storage/image/0babe65f0d1d0b0697270a1cbc2a7f60.jpg",
            "duration": 559369,
            "mimeType": "video/mp4",
            "level": "5",
            "subtitles": [],
            "comments": [],
            "topics": [],
            "createdAt": "2024-03-09T10:25:30.141041",
            "lastUpdated": "0001-01-01T00:00:00"
        },
        "lastUpdated": "2024-03-11T15:56:24.282881",
        "savedCount": 2
    }
]

const Page = () => {

    useEffect(() => {

    }, [])




    return (
        <>
            <Head>
                <title>
                    Từ vựng đã lưu
                </title>
            </Head>
            <Box>
                <Stack
                    alignItems="center"
                    justifyContent="space-between"
                    direction="row">
                    <Stack>
                        <Typography
                            mb="30px"
                            variant="h4">
                            Từ vựng đã lưu
                        </Typography>
                        {_.map(data, (item) => (
                            <SavedVocaVideo {...item}/>
                        ))}

                    </Stack>
                </Stack>
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
