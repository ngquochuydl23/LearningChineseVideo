import Head from 'next/head';
import {
    Box,
    Container,
    Stack,
    Typography,
    Unstable_Grid2 as Grid,
    Avatar,
    Button
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Layout as AdminLayout } from 'src/layouts/admin-layout/layout';
import { getVideo } from 'src/services/api/video-api';
import { useRouter } from 'next/router';
import { VocaTable } from 'src/sections/dictionary/Voca-table';
import { getVocas } from 'src/services/api/voca-api';
import AddUpdateVocaDialog from 'src/sections/dictionary/add-update-voca-dialog';

const Page = () => {
    const [vocas, setVocas] = useState([]);
    const [dialogState, setDialogState] = useState({
        open: false,
        voca: undefined
    })

    const fetchVoca = () => {
        getVocas()
            .then((res) => setVocas(res))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchVoca();
    }, [])

    return (
        <>
            <Head>
                <title>
                    Từ điển
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    px: '30px'
                }}>
                <Stack
                    alignItems="center"
                    justifyContent="space-between"
                    direction="row">
                    <Typography
                        mb="30px"
                        variant="h4">
                        Đăng tải video
                    </Typography>
                    <Button
                        onClick={() => setDialogState({
                            open: true,
                            voca: undefined
                        })}
                        sx={{ height: '40px' }}
                        variant='contained'>
                        Thêm từ vựng
                    </Button>
                </Stack>
                <VocaTable
                    onChoose={(item) => setDialogState({
                        open: true,
                        voca: item
                    })}
                    vocas={vocas}
                />
            </Box>
            <AddUpdateVocaDialog
                editedVoca={dialogState.voca}
                onAdded={() => {
                    fetchVoca();
                }}
                open={dialogState.open}
                handleClose={() => setDialogState({
                    open: false,
                    voca: undefined
                })} />
        </>
    )
}
Page.getLayout = (page) => (
    <AdminLayout>
        {page}
    </AdminLayout>
);

export default Page;