import * as React from 'react';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import './styled.css'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ModalInserir } from './ModalInserir';

export const Principal = () => {

  const [open, setOpen] = useState<boolean>(false);
  const handleOpenInserir = () => setOpen(true);
  const handleCloseInserir = () => setOpen(false);

  return (
    <Grid container spacing={2} className='container'>
      <Grid container item direction="row" alignItems='flex-start' className='header' style={{ width: '40rem' }}>
        <Typography variant="h6" component="h3" className='title'>Cadastrar Cliente</Typography>
        <Grid item className='containerButton'>
          <Button variant="contained" onClick={handleOpenInserir}>Adicionar</Button>
        </Grid>
      </Grid>
      <ModalInserir open={open} handleCloseInserir={handleCloseInserir} />
    </Grid>
  );
}