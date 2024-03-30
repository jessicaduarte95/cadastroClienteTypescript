import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';
import axios from 'axios';

interface Props {
    lista: any;
    setLista: any;
}

interface Column {
    id: 'nome' | 'email' | 'cpf' | 'editar' | 'excluir';
    label: string;
    width?: string;
    align?: 'center';
    format?: (value: number) => string;
    lista?: any;
}

export const Tabela: React.FC<Props> = (props) => {

    const { lista, setLista } = props;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const columns: readonly Column[] = [
        { id: 'nome', label: 'Nome', width: '30' },
        { id: 'email', label: 'Email', width: '30' },
        { id: 'cpf', label: 'CPF', width: '20' },
        { id: 'editar', label: 'Editar', width: '10%' },
        { id: 'excluir', label: 'Excluir', width: '10%' },
    ]

    const handleDeleteItem = async (data: any) => {
        const id = data.id
        await axios.delete<FormData[]>(`http://localhost:5000/deletar/${id}`)
            .then(response => {
                setLista(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar dados de usuários:', error);
            });
    }

    useEffect(() => {
        if (lista.length > 0) {
            lista.forEach((element: any) => {
                element.editar = (
                    <button style={{ border: 'none', backgroundColor: 'white' }}>
                        <EditIcon fontSize="small" onClick={() => { console.log(element) }} />
                    </button>
                )
                element.excluir = (
                    <button style={{ border: 'none', backgroundColor: 'white' }}>
                        <DeleteIcon fontSize="small" onClick={() => { handleDeleteItem(element) }} />
                    </button>
                )
            });
        }
    }, [lista]);

    return (
        <Paper sx={{ width: '45rem', overflow: 'hidden', marginTop: '3rem' }}>
            <TableContainer sx={{ maxHeight: 360 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead sx={{ width: '200px' }}>
                        <TableRow>
                            {columns.map((column) => {
                                return (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ width: column.width }}
                                    >
                                        {column.label}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lista
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row: any) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <>
                                                    <TableCell key={column.id} align={column.align}>
                                                        {value}
                                                    </TableCell>
                                                </>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={lista.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}