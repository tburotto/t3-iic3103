import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from './stock'
import Chart from './chart'
import Typography from '@material-ui/core/Typography';
import CardEx from './cardex'
import Table from './table'

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

export default function CenteredGrid({exchanges, chosedExchange, changeExchange, total}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={9}>
        <Paper className={classes.paper}>
        <Typography variant="h3"> {chosedExchange.name} </Typography>
        <br/>
        <Table data={chosedExchange.listed_companies} exchange={chosedExchange} exchanges={exchanges} total={total}></Table>
        </Paper>
          </Grid>
        <Grid item xs={3}>
        {Object.keys(exchanges).map((value)=>{
               return <div><CardEx exchange={exchanges[value]} changeExchange={changeExchange}></CardEx> <br/></div>
           })}
        </Grid>
      </Grid>
      
    </div>
  );
}
