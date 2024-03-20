import { Logo } from "./logo";

const { Container, Grid, Box, Typography } = require("@mui/material")

const HayugoFooter = () => {
    return (
        <Box sx={{ backgroundColor: '#f5f5f5' }}>
            <Container
                maxWidth="xl">
                <Grid container>
                    <Grid
                        sx={{ padding: '25px' }}
                        xl="5">
                        <Box sx={{ width: '80%' }}>
                            <img
                                style={{ height: '70px' }}
                                src={'/hayugo-logo_landscape.png'} />
                            <Typography
                                variant="subtitle1">
                                {`HayuGo - điểm đến lý tưởng cho việc học tiếng Trung thú vị và hiệu quả. Với bộ sưu tập video đa dạng từ HSK 1 đến HSK 5, bạn có thể linh hoạt chọn lựa và bắt đầu hành trình học tiếng Trung của mình. Tính năng tra từ trên phụ đề giúp bạn hiểu rõ ngữ cảnh và nâng cao kỹ năng ngôn ngữ tự tin. Hãy khám phá và tận hưởng sức mạnh của việc học tiếng Trung qua video ngay hôm nay!`}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid
                        sx={{ padding: '25px' }}
                        xl="3.5">
                        <Box pt="70px">
                            <Typography
                                fontSize="20px"
                                variant="h5">
                                {`THÔNG TIN NHÓM NGHIÊN CỨU`}
                            </Typography>
                            <Typography
                                fontSize="14px"
                                mt="5px"
                                variant="subtitle1">
                                {`Khoa Tiếng Trung Trường Đại Học Sư Phạm TPHCM`}
                            </Typography>
                            <ul style={{ listStylePosition: 'outside' }}>
                                <li style={{ marginTop: '10px' }}>{`(ảnh) Nguyễn Thị Thùy Giang`}</li>
                                <li style={{ marginTop: '10px' }}>{`(ảnh) Trần Thị Thùy Trâm`}</li>
                                <li style={{ marginTop: '10px' }}>{`(ảnh) Nguyễn Hữu Huỳnh`}</li>
                            </ul>
                        </Box>
                    </Grid>
                    <Grid
                        sx={{ padding: '25px' }}
                        xl="3.5">
                        <Box pt="60px">
                            <Typography
                                variant="subtitle1">
                                {`Bản quyền thuộc về nhóm nghiên cứu đề tài “Xây dựng ngữ liệu trực tuyến phục vụ tra cứu học tập, tra cứu tiếng Trung cho người học tiếng Trung ở Việt Nam”`}
                            </Typography>
                            <Typography variant="subtitle1" mt="20px">
                                {`Website được xây dựng bởi Nguyễn Quốc Huy`}
                                <p>{`SDT: `}
                                    <span style={{ fontWeight: '600' }}>
                                        <a style={{ color: 'black' }} href="tel:+84868684961">0868684961</a>
                                    </span>
                                    {` (Zalo)`}
                                </p>
                                <p>{`Email: `}
                                    <span style={{ fontWeight: '600' }}>
                                        <a style={{ color: 'black' }} href="mailto:nguyenquochuydl123@gmail.com">nguyenquochuydl123@gmail.com</a>
                                    </span>
                                </p>
                            </Typography>

                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default HayugoFooter;