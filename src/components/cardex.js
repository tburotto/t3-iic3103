import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function OutlinedCard({exchange, changeExchange}) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {exchange.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {exchange.exchange_ticker}
        </Typography>
        <Typography variant="body2" component="p">
          {exchange.country}
          <br />
          {exchange.address}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>{changeExchange(exchange)}}>Indicadores</Button>
      </CardActions>
    </Card>
  );
}