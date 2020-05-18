import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from './stock'
import Chart from './chart'
import Typography from '@material-ui/core/Typography';

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

export default function CenteredGrid({stocks, chosedStock, changeStock}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Chart stock={chosedStock} stocks={stocks}></Chart>
          </Grid>
        <Grid item xs={3}>
        {Object.keys(stocks).map((value)=>{
               return <div><Card stock={stocks[value]} changeStock={changeStock}></Card> <br/></div>
           })}
        </Grid>
      </Grid>
      
    </div>
  );
}
