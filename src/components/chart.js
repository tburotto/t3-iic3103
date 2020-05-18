import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Scatter, Line } from 'react-chartjs-2'
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
export default function Chart({ stock, stocks }) {
    const classes = useStyles();
    const [data, setData] = useState({})
   
    if (stock !== undefined && stocks !== {}) {
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Typography variant="h6"> {stock.company_name} </Typography>
                    <Line data={{
            labels: stocks[stock.ticker].pricesx,
            datasets: [
                {
                    label: "Precio Accion",
                    data: stocks[stock.ticker].pricesy,
                    backgroundColor: "blue",
                    showLine: true,
                    color: blue,
                    fill: false
                }
            ],options : {
                scales: {
                  yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Precio (USD)'
                    }
                  }],
                  xAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Fecha y Hora'
                    }
                  }],
                }
              }
        }} ></Line>
        <br/>
            <Grid container spacing={5}>
              <Grid item xs={2}>
            <Typography variant="p"> Volumen Transado (USD): $ {stocks[stock.ticker].buy.reduce((a, b) => a + b, 0)+stocks[stock.ticker].sell.reduce((a, b) => a + b, 0)} </Typography>
            </Grid>
            <Grid item xs={2}>
            <Typography variant="p"> Precio Maximo (USD): $ {stocks[stock.ticker].max} </Typography>
            </Grid>
            <Grid item xs={2}>
            <Typography variant="p"> Precio Minimo (USD): $ {stocks[stock.ticker].min} </Typography>
            </Grid>
            <Grid item xs={2}>
            <Typography variant="p"> Ultimo precio (USD): $ {stocks[stock.ticker].last} </Typography>
            </Grid>
            <Grid item xs={2}>
            <Typography variant="p" color={stocks[stock.ticker].delta < 0 ? "error": "primary"}> Variación: {stocks[stock.ticker].delta} % </Typography>
            </Grid>
            </Grid>
        </Paper>
            </div>
        );
    }
    else {
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    Loading
            </Paper>

            </div>
        )
    }
}
