import Head from 'next/head';
import {
    Box,
    Container,
    Stack,
    Typography,
    Unstable_Grid2 as Grid,
    Button
} from '@mui/material';
import { Layout as AdminLayout } from 'src/layouts/admin-layout/layout';
import { MemberTable } from 'src/sections/members/member-table';


const mems = [
    {
        id: 1,
        fullName: "Nguyễn Quốc Huy",
        phoneNumber: '0868684961',
        email: 'nguyenquochuydl123@gmail.com',
        createdAt: '2024-01-03T14:13:14.072'
    },
    {
        id: 2,
        fullName: "Thùy Giang",
        phoneNumber: '0868684961',
        email: 'nguyenquochuydl123@gmail.com',
        createdAt: '2024-01-03T14:13:14.072'
    }
]

const Page = () => {
    return (
        <>
            <Head>
                <title>
                    Thành viên
                </title>
            </Head>
            <Box
                component="main"
                sx={{ flexGrow: 1 }}>
                <Container maxWidth="lg">
                    <Stack spacing={3}>
                        <Typography variant="h4">
                            Thành viên
                        </Typography>
                        <MemberTable members={mems} />
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
