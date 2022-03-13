import { Icon } from '@iconify/react';
import { useRef, useState, useContext } from 'react';
import homeFill from '@iconify/icons-eva/home-fill';
import personFill from '@iconify/icons-eva/person-fill';
import giftOutline from '@iconify/icons-eva/gift-outline';
import listOutline from '@iconify/icons-eva/list-outline';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import checkmarkSquareFill from '@iconify/icons-eva/checkmark-square-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { alpha } from '@mui/material/styles';
import { Button, Box, Divider, MenuItem, Typography, Avatar, IconButton } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
import { AuthContext } from '../../utils/ContextProvider';
//

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'الرئيسية',
    icon: homeFill,
    linkTo: '/'
  },
  {
    label: 'الملف الشخصي',
    icon: personFill,
    linkTo: '/User/Profile'
  },
  {
    label: 'تقديم خدمة',
    icon: giftOutline,
    linkTo: '/Service/AddService'
  },

  {
    label: 'لائحة الطلبات',
    icon: listOutline,
    linkTo: '/Service/AcceptedList',
    IsVolenteer: true
  },

  {
    label: 'خدماتي',
    icon: checkmarkSquareFill,
    linkTo: '/Service/ProvidedList',
    IsVolenteer: true
  },
  {
    label: 'الاعدادات',
    icon: settings2Fill,
    linkTo: '#'
  }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const authContext = useContext(AuthContext);
  const User = authContext.getUser();
  const MenuOptionsFilterd =
    User?.role !== 'User' ? [...MENU_OPTIONS] : [...MENU_OPTIONS.filter((x) => !x?.IsVolenteer)];
  const handleOpen = () => {
    setOpen(true);
    console.log(User);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <Avatar src={`/content/UserAvatar/${User.id}.JPG`} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {User.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {User.phone || User.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MenuOptionsFilterd.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            fullWidth
            color="inherit"
            onClick={() => {
              authContext.setUser(null);
            }}
            variant="outlined"
          >
            تسجيل الخروج
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
