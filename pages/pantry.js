'use client';
import { Box, Button, Grid, Modal, Stack, TextField, Typography, Container } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { firestore } from '@/firebase';
import { collection, query, getDocs, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from "next/router";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Pantry() {
  const [user] = useAuthState(auth); // Get the current user
  const router = useRouter();
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [search, setSearch] = useState('');
  const [recipe, setRecipe] = useState(''); // For recipe suggestions
  const [loadingRecipe, setLoadingRecipe] = useState(false); // Loading state

  const updateInventory = useCallback(async () => {
    if (user) {
      const snapshot = query(collection(firestore, 'users', user.uid, 'inventory'));
      const docs = await getDocs(snapshot);
      const inventoryList = [];
      docs.forEach(doc => {
        inventoryList.push({
          name: doc.id,
          ...doc.data(),
        });
      });
      setInventory(inventoryList);
    }
  }, [user]);

  const addItem = async (item) => {
    if (user) {
      const docRef = doc(collection(firestore, 'users', user.uid, 'inventory'), item);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { quantity } = docSnap.data();
        await setDoc(docRef, { quantity: quantity + 1 });
      } else {
        await setDoc(docRef, { quantity: 1 });
      }

      await updateInventory();
    }
  };

  const removeItem = async (item) => {
    if (user) {
      const docRef = doc(collection(firestore, 'users', user.uid, 'inventory'), item);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { quantity } = docSnap.data();
        if (quantity === 1) {
          await deleteDoc(docRef);
        } else {
          await setDoc(docRef, { quantity: quantity - 1 });
        }
      }

      await updateInventory();
    }
  };

  // Fetch recipe based on pantry items
  const getRecipeSuggestion = async () => {
    setLoadingRecipe(true);
    try {
      const response = await fetch('/api/recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pantryItems: inventory.map(item => item.name) }),
      });

      if (response.ok) {
        const data = await response.json();
        setRecipe(data.recipe); // Set the recipe suggestion
      } else {
        console.error('Failed to fetch recipe');
      }
    } catch (error) {
      console.error('Error fetching recipe:', error);
    } finally {
      setLoadingRecipe(false);
    }
  };

  useEffect(() => {
    updateInventory();
  }, [updateInventory]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Box display="flex" flexGrow={1}>
        <Box width="250px" bgcolor="#f8f9fa" p={2}>
          <Typography variant="h6">PantryPal</Typography>
          <Button fullWidth onClick={() => router.push('/pantry')}>Pantry</Button>
          <Button fullWidth onClick={() => router.push('/inventory')}>Inventory</Button>
          <Button fullWidth onClick={() => router.push('/recipe')}>Recipe</Button>
        </Box>
        <Container
          component="main"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flexGrow: 1,
            p: 4,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Inventory
          </Typography>
          <Box display="flex" alignItems="center" width="100%" mb={2}>
            <TextField
              placeholder="Search items..."
              variant="outlined"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleOpen} sx={{ ml: 2 }}>
              Add New Item
            </Button>
          </Box>
          <Modal open={open} onClose={handleClose}>
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
              <Typography variant="h6">Add Item</Typography>
              <Stack width="100%" direction="row" spacing={2}>
                <TextField
                  variant='outlined'
                  fullWidth
                  value={itemName}
                  onChange={(e) => {
                    setItemName(e.target.value);
                  }}>
                </TextField>
                <Button variant="outlined" onClick={() => {
                  addItem(itemName);
                  setItemName('');
                  handleClose();
                }}>Add</Button>
              </Stack>
            </Box>
          </Modal>
          <Box width="100%" mt={3}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={4}>
                <Typography variant="subtitle1">Product Name</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1">Quantity</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1">Actions</Typography>
              </Grid>
            </Grid>
            {filteredInventory.map(({ name, quantity }) => (
              <Grid container spacing={2} alignItems="center" key={name} sx={{ mt: 1, p: 1, bgcolor: '#fff', borderRadius: 1 }}>
                <Grid item xs={4}>
                  <Typography variant="body1">{name.charAt(0).toUpperCase() + name.slice(1)}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1">{quantity}</Typography>
                </Grid>
                <Grid item xs={4} display="flex" justifyContent="flex-end" gap={1}>
                  <Button variant="contained" color="primary" onClick={() => addItem(name)}>Add</Button>
                  <Button variant="contained" color="secondary" onClick={() => removeItem(name)}>Remove</Button>
                </Grid>
              </Grid>
            ))}
          </Box>

          {/* Button to request recipe suggestion */}
          <Button variant="contained" color="success" onClick={getRecipeSuggestion} disabled={loadingRecipe} sx={{ mt: 4 }}>
            {loadingRecipe ? 'Fetching Recipe...' : 'Get Recipe Suggestion'}
          </Button>

          {/* Display the suggested recipe */}
          {recipe && (
            <Box mt={4} p={2} bgcolor="#f0f0f0" borderRadius={2}>
              <Typography variant="h6">Suggested Recipe:</Typography>
              <Typography variant="body1">{recipe}</Typography>
            </Box>
          )}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
