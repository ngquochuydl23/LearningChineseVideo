import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { addVoca, editVocabulary } from 'src/services/api/voca-api';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { MuiChipsInput } from 'mui-chips-input';
import { editVideo } from 'src/services/api/video-api';


export default function UpdateVideoDialog({
    open, handleClose, video, onUpdated
}) {
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();

    const resetForm = () => {
        formik.setValues({
            title: '',
            description: '',
            topics: [],
            subtitles: [],
            level: 0
        })
    }

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            topics: [],
            subtitles: [],
            level: 1
        },

        onSubmit: (values, helpers) => {

            //onUpdated();

            editVideo(video.id, values)
                .then((res) => {
                    console.log(res);
                  //  onUpdated();
                })
                .catch((err) => { console.log(err) })
        }
    });

    useEffect(() => {
        if (video) {
            formik.setValues({
                title: video.title,
                description: video.description,
                topics: video.topics,
                subtitles: [],
                level: video.level
            });
        } else resetForm();
    }, [video])


    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="xl"
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle id="alert-dialog-title">
                    Thêm từ vựng
                </DialogTitle>
                <DialogContent sx={{ minWidth: '800px' }}>
                    <Stack>
                        <TextField
                            sx={{ marginTop: "10px" }}
                            error={!!(formik.touched.title && formik.errors.title)}
                            fullWidth
                            helperText={formik.touched.title && formik.errors.title}
                            label="Tiêu đề video"
                            id="title"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.title}
                        />
                        <TextField
                            sx={{ marginTop: "20px" }}
                            required
                            fullWidth
                            multiline
                            minRows={5}
                            id="description"
                            label="Mô tả"
                            onChange={formik.handleChange}
                            value={formik.values.description}
                        />
                        <Box mt="20px">
                            <Typography variant="subtitle1">Chủ đề*</Typography>
                            <Typography variant="caption">
                                Chọn chủ đề cho video để người dùng có thể tìm kiếm nhanh chóng và dễ dàng hơn.
                            </Typography>
                            <MuiChipsInput
                                id="topics"
                                onBlur={formik.handleBlur}
                                value={formik.values.topics}
                                error={formik.errors.topics && formik.touched.topics}
                                helperText={formik.errors.topics}
                                onChange={(options) => {
                                    formik.setFieldValue('topics', options)
                                }}
                                placeholder="Nhập chủ đề"
                                sx={{
                                    minHeight: '40px',
                                    mt: '10px',
                                    width: '100%'
                                }}
                            />
                        </Box>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{ color: 'gray' }}
                        onClick={() => {
                            resetForm();
                            handleClose();
                        }}>
                        Hủy
                    </Button>
                    <Button
                        type='submit' autoFocus>
                        Sửa
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}