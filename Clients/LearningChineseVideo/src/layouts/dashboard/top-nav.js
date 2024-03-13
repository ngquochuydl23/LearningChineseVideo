import PropTypes from 'prop-types';
import BellIcon from '@heroicons/react/24/solid/BellIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import {
    Avatar,
    Badge,
    Box,
    Container,
    IconButton,
    Stack,
    SvgIcon,
    Tooltip,
    useMediaQuery
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { usePopover } from 'src/hooks/use-popover';
import { AccountPopover } from './account-popover';
import { useAuth } from 'src/hooks/use-auth';
import CustomAvatar from 'src/components/custom-avt';
import { Logo } from 'src/components/logo';
import NextLink from 'next/link';
const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {
    const { onNavOpen } = props;
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    const accountPopover = usePopover();
    const { user } = useAuth();

    return (
        <>
            <Box
                component="header"
                sx={{
                    backdropFilter: 'blur(6px)',
                    backgroundColor: (theme) => alpha(theme.palette.background.default, 0.6),
                    position: 'sticky',
                    left: {
                        lg: `${SIDE_NAV_WIDTH}px`
                    },
                    top: 0,
                    width: {
                        // lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
                    },
                    zIndex: (theme) => theme.zIndex.appBar
                }}
            >
                <Container maxWidth='xl'>
                    <Stack
                        alignItems="center"
                        direction="row"
                        justifyContent="space-between"
                        spacing={2}
                        sx={{
                            minHeight: TOP_NAV_HEIGHT,
                           
                        }}>
                        {/* <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}>
                        <IconButton onClick={onNavOpen}>
                            <SvgIcon fontSize="small">
                                <Bars3Icon />
                            </SvgIcon>
                        </IconButton>
                    </Stack> */}
                        <Stack alignItems="center"
                            direction="row">
                            <Box
                                component={NextLink}
                                href="/"
                                sx={{
                                    display: 'inline-flex',
                                    height: 32,
                                    width: 32
                                }}>
                                <Logo />
                            </Box>
                        </Stack>
                        <Stack
                            alignItems="center"
                            direction="row">
                            {user &&
                                <Box ref={accountPopover.anchorRef}>
                                    <CustomAvatar
                                        hasBorder
                                        fullname={user.fullName}
                                        src={user.avatar}
                                        sx={{
                                            cursor: 'pointer',
                                            height: 40,
                                            width: 40
                                        }}
                                        onClick={accountPopover.handleOpen} />
                                </Box>
                            }
                        </Stack>
                    </Stack>
                </Container>

            </Box>
            <AccountPopover
                anchorEl={accountPopover.anchorRef.current}
                open={accountPopover.open}
                onClose={accountPopover.handleClose}
            />
        </>
    );
};

TopNav.propTypes = {
    onNavOpen: PropTypes.func
};
