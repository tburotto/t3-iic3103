import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});




export default function SimpleTable({data, exchange, exchanges, total}) {
  const classes = useStyles();
  return (
      <div>
    <Typography variant="p"> Compañías </Typography>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell># </TableCell>
            <TableCell>Compañía</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell>{row}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <br/>
    <Typography align="left" variant="p"> Información </Typography>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell> Volumen Compra </TableCell>
            <TableCell>Volumen Venta</TableCell>
            <TableCell>Volumen Total</TableCell>
            <TableCell>Acciones</TableCell>
            <TableCell>Participación Mercado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                {exchanges[exchange.exchange_ticker].compra}
              </TableCell>
              <TableCell>{exchanges[exchange.exchange_ticker].venta}</TableCell>
              <TableCell>{exchanges[exchange.exchange_ticker].venta + exchanges[exchange.exchange_ticker].compra}</TableCell>
              <TableCell>{data.length}</TableCell>
              <TableCell>{(((exchanges[exchange.exchange_ticker].venta + exchanges[exchange.exchange_ticker].compra)/total)*100).toFixed(2)}%</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}