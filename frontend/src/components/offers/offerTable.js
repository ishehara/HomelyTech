import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';

function offerTable({rows, onDelete}) {
  return (
    <TableContainer component={Paper}>

        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Persentage</TableCell>
                    <TableCell>PromoCode</TableCell>
                    <TableCell>Starting Date</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.length > 0 ? rows.map((row) => (
                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th':{border:0}}}>
                        <TableCell component='th' scope="row">{row.title}</TableCell>
                        <TableCell component='th' scope="row">{row.description}</TableCell>
                        <TableCell component='th' scope="row">{row.persentage}</TableCell>
                        <TableCell component='th' scope="row">{row.promoCode}</TableCell>
                        <TableCell component='th' scope="row">{row.startDate}</TableCell>
                        <TableCell component='th' scope="row">{row.dueDate}</TableCell>
                        <TableCell>
                            <Button
                                
                                sx={{marginRight: '10px'}}
                                onClick={() => {}}>
                                Edit
                            </Button>
                            <Button
                                onClick={() => onDelete(row._id)}>
                                Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                )):(
                    <TableRow sx={{ '&:last-child td, &:last-child th':{border:0}}}>
                        <TableCell component='th' scope="row">No Data</TableCell>
                    </TableRow>)}
            </TableBody>
        </Table>
    </TableContainer>
  );
}

export default offerTable;
