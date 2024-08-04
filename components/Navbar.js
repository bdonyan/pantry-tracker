// components/NavBar.js
import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';
import SignInModal from './SignInModal';

const Navbar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Pantry Manager
          </Typography>
          <Button color="inherit" onClick={handleOpenModal}>
            Sign In
          </Button>
        </Toolbar>
      </AppBar>
      <SignInModal open={modalOpen} handleClose={handleCloseModal} />
    </>
  );
};

export default Navbar;
