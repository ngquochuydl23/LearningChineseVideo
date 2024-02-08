import { SvgIcon } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

export const items = [
  {
    title: 'Danh sách video',
    path: '/admin/videos',
    icon: (
      <SvgIcon fontSize="small">
        <LocalOfferIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Đăng tải video',
    path: '/admin/upload-video',
    icon: (
      <SvgIcon fontSize="small">
        <PeopleIcon />
      </SvgIcon>
    )
  }
];