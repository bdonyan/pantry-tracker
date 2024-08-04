import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="60px"
    bgcolor="#f5f5f5"
    position="fixed"
    bottom="0"
    width="100%"
    borderTop="1px solid #e0e0e0"
  >
    <Typography variant="body2" color="textSecondary">
      © 2024 Pantry Manager. All rights reserved.
    </Typography>
  </Box>
);

export default Footer;
