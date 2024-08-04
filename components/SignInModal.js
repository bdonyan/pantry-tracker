// components/SignInModal.js
import { useState } from 'react';
import { Box, Button, TextField, Typography, Modal, Link } from '@mui/material';
import { useRouter } from 'next/router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const SignInModal = ({ open, handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/pantry');
      handleClose();
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleSignUpRedirect = () => {
    router.push('/auth');
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        position="absolute"
        top="50%"
        left="50%"
        sx={{
            transform: "translate(-50%, -50%)"
        }}
        bgcolor="#fff"
        boxShadow={24}
        p={4}
        width="400px"
      >
        <Typography variant="h5" gutterBottom>
          Sign In
        </Typography>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleSignIn}>
          Sign In
        </Button>
        <Typography variant="body2" mt={2}>
          Don't have an account?{' '}
          <Link href="#" onClick={handleSignUpRedirect}>
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Modal>
  );
};

export default SignInModal;
