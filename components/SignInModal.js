// components/SignInModal.js
import React from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const SignInModal = ({ open, onClose, onSignIn, onSignUp }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        position="absolute"
        top="50%"
        left="50%"
        width={400}
        bgcolor="white"
        border="2px solid #000"
        boxShadow={24}
        p={4}
        display="flex"
        flexDirection="column"
        gap={3}
        sx={{
          transform: "translate(-50%, -50%)"
        }}
      >
        <Typography variant="h6">Sign In</Typography>
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" onClick={() => onSignIn(email, password)}>
          Sign In
        </Button>
        <Typography variant="body2">
          Don&apos;t have an account? <Button onClick={onSignUp}>Sign Up</Button>
        </Typography>
      </Box>
    </Modal>
  );
};

export default SignInModal;
