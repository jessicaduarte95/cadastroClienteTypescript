import * as React from 'react';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import './styled.css'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ModalInserir } from './ModalInserir';
import { Tabela } from './Tabela';
import axios from 'axios';
import { ModalEditar } from './ModalEditar';

interface FormData {
  nome: string;
  email: string;
  cpf: string;
}

export const Principal = () => {

  const [open, setOpen] = useState<boolean>(false);
  const handleOpenInserir = () => setOpen(true);
  const handleCloseInserir = () => setOpen(false);
  const [lista, setLista] = useState<FormData[]>([]);
  const [openEditar, setOpenEditar] = useState<boolean>(false);
  const handleOpenEditar = () => setOpenEditar(true);
  const handleCloseEditar = () => setOpenEditar(false);
  const [dataItem, setdataItem] = useState<any>([]);


  const obter = async () => {
    await axios.get<FormData[]>(`http://localhost:5000/obterClientes`)
      .then(response => {
        setLista(response.data)
      })
      .catch(error => {
        console.error('Erro ao buscar dados de usuários:', error);
      });
  }

  useEffect(() => {
    obter()
  }, []);

  return (
    <Grid container spacing={2} className='container' direction='column' alignItems='center'>
      <Grid container item direction="row" alignItems='flex-start' className='header' style={{ width: '45rem' }}>
        <Typography variant="h6" component="h3" className='title'>Cadastrar Cliente</Typography>
        <Grid item className='containerButton'>
          <Button variant="contained" onClick={handleOpenInserir}>Adicionar</Button>
        </Grid>
      </Grid>
      <ModalInserir open={open} handleCloseInserir={handleCloseInserir} setLista={setLista} />
      <Tabela lista={lista} setLista={setLista} handleOpenEditar={handleOpenEditar} setdataItem={setdataItem}/>
      <ModalEditar openEditar={openEditar} handleCloseEditar={handleCloseEditar} dataItem={dataItem} setLista={setLista}/>
    </Grid>
  );
}