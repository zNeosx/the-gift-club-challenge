import { Menu, QrCode } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { ModalType, useModalStore } from '../stores/modal.store';

type Props = {
  onCampaignSave: () => void;
};
export default function MobileMenu({ onCampaignSave }: Props) {
  const { openModal } = useModalStore();

  const [open, setOpen] = React.useState(false);

  const nav = [
    {
      name: 'Mon Code PIN',
      icon: null,
      onClick: () => openModal(ModalType.PIN_CODE),
    },
    {
      name: 'QR Code',
      icon: <QrCode />,
      onClick: () => openModal(ModalType.QR_CODE),
    },
    {
      name: 'Sauvegarder',
      icon: null,
      onClick: onCampaignSave,
    },
  ];

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {nav.map((navItem) => (
          <ListItem key={navItem.name} disablePadding onClick={navItem.onClick}>
            <ListItemButton>
              <ListItemIcon>{navItem.icon}</ListItemIcon>
              <ListItemText primary={navItem.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box alignSelf={'center'} display={{ lg: 'none' }}>
      <IconButton onClick={toggleDrawer(true)}>
        <Menu />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Box>
  );
}
