import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import moment from 'moment/moment';
import Link from 'next/link';
import CustomAvatar from 'src/components/custom-avt';

export const MemberTable = (props) => {
  const {
    count = 0,
    members = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => { },
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  return (
    <Stack>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  #
                </TableCell>
                <TableCell>
                  Họ và tên
                </TableCell>
                <TableCell>
                  Số điện thoại
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Ngày tham gia
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members.map((item, index) => {
                const isSelected = selected.includes(item.id);
                return (
                  <TableRow
                    hover
                    component={Link}
                    sx={{ textDecoration: 'none' }}
                    href={"/customers/" + item.id}
                    key={item.id}
                    selected={isSelected}>
                    <TableCell padding="checkbox">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}>
                        <CustomAvatar
                          src={item.avatar}
                          fullname={item.fullName}
                          sx={{
                            borderRadius: '100px',
                            height: '45px',
                            width: '45px'
                          }} />
                        <Typography
                          sx={{ fontWeight: '600' }}
                          variant="subtitle2">
                          {item.fullName}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {item.phoneNumber}
                    </TableCell>
                    <TableCell>
                      {item.email}
                    </TableCell>
                    <TableCell>
                      {moment(item.createdAt).format("MMM Do YY")}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
    </Stack>
  );
};

MemberTable.propTypes = {
  count: PropTypes.number,
  members: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
