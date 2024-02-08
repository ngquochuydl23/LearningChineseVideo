import HomeIcon from '@mui/icons-material/Home';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import { SvgIcon } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

import TranslateIcon from '@mui/icons-material/Translate';


export const items = [
  {
    title: 'Trang Chủ',
    path: '/',
    icon: (
      <HomeIcon />
    )
  },
  {
    title: 'Tìm kiếm',
    path: '/search',
    icon: (
      <SearchIcon />
    )
  },
  {
    title: 'Từ vựng đã lưu',
    path: '/saved',
    icon: (
      <TranslateIcon />
    )
  }
];
