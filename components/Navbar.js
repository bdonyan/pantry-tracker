// components/Navbar.js
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { auth } from '@/firebase';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleLogoClick = () => {
    router.push('/'); // Adjust this path to your product page
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }} onClick={handleLogoClick}>
            <Typography variant="h6" component="div">
              Pantry Manager
            </Typography>
          </Box>
          <Box>
            {user ? (
              <Button color="inherit" onClick={handleSignOut}>
                Sign Out
              </Button>
            ) : (
              <Link href="/auth" passHref>
                <Button color="inherit">Sign In</Button>
              </Link>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;