import * as React from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import './styled.css'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import axios from 'axios';

interface FormData {
    nome: string;
    email: string;
    cpf: string;
}

interface Props {
    open: boolean;
    handleCloseInserir: () => void;
    setLista: any;
}

export const ModalInserir: React.FC<Props> = (props) => {

    const { open, handleCloseInserir, setLista } = props;
    const { register, handleSubmit, reset } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        await axios.post<FormData[]>(`http://localhost:5000/inserir`, {
            nome: data.nome,
            email: data.email,
            cpf: data.cpf
        })
            .then((response) => {
                setLista(response.data);
            }).catch((error: any) => {
                console.log("Erro: ", error);
            })
        reset();
        handleCloseInserir();
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleCloseInserir}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box className='modal'>
                        <Typography id="modal-modal-title" variant="h6" component="h3" className='title'>
                            Adicionar Cliente
                        </Typography>
                        <Box
                            component="form"
                            sx={{ '& > :not(style)': { m: 1, width: '60ch' }, display: 'flex', flexDirection: 'column' }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField type="text" label="Nome" variant="outlined" {...register("nome")} />
                            <TextField type="text" label="E-mail" variant="outlined" {...register("email")} />
                            <TextField type="text" label="CPF" variant="outlined" {...register("cpf")} />
                        </Box>
                        <Grid item className='containerButton' style={{ marginTop: '1rem' }}>
                            <Button variant="outlined" onClick={handleCloseInserir} style={{ marginRight: '0.5rem' }}>Fechar</Button>
                            <Button variant="contained" type="submit">Salvar</Button>
                        </Grid>
                    </Box>
                </form>
            </Modal>
        </div>
    );
}