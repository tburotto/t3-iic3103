import React, { Component, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar'
import { blue } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import IO from 'socket.io-client'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Grid from './components/grid'
import Card from './components/stock'
import Chart from './components/chart'
import moment from 'moment'
import GridEx from './components/grid-exchange'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#75ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});


const styles = {
  toolbarButtons: {
    marginLeft: "auto",

  }
}

const socket = IO('wss://le-18262636.bitzonte.com', {
  path: '/stocks'

})

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: true,
      stocks: [],
      total: 0,
      exchanges: {},
      actualView: 'Stocks',
      chosedStock: undefined,
      prices: {},
      chosedExchange: undefined,
    }
    this.callback = this.callback.bind(this);
    this.callbackView = this.callbackView.bind(this);
    this.callbackStock = this.callbackStock.bind(this);
    this.callbackExchange = this.callbackExchange.bind(this);
  }

  callback(value) {
    this.setState({ checked: value })
    if (value === false) {
      socket.off("UPDATE")
      socket.off("BUY")
      socket.off("SELL")
    }
    else {
      socket.on('UPDATE', (data) => {
        let time = moment(data.time)
        time = time.format("DD/MM/YY HH:mm:ss")
        let max = this.state.stocks[data.ticker].max
        if (data.value > max) {
          max = data.value
        }
        let min = this.state.stocks[data.ticker].min
        if (data.value < min) {
          min = data.value
        }
        let last = this.state.stocks[data.ticker].last
        this.setState({
          stocks: {
            ...this.state.stocks, [data.ticker]:
            {
              ...this.state.stocks[data.ticker], pricesx: this.state.stocks[data.ticker].pricesx.concat([time]),
              pricesy: this.state.stocks[data.ticker].pricesy.concat([data.value]), last: data.value, max: max, min: min,
              delta: (((data.value - last) / (last)) * 100).toFixed(2)
            }
          }
        })
      })
      socket.on('BUY', (data) => {
        let stock_help = this.state.stocks[data.ticker]
        this.setState({total: this.state.total + data.volume})
        Object.keys(this.state.exchanges).forEach(key =>{
          this.state.exchanges[key].listed_companies.forEach(element=>{
            if (element === stock_help.company_name){

              this.setState({
                exchanges: {
                  ...this.state.exchanges,
                  [key]: {
                    ...this.state.exchanges[key],
                    compra: this.state.exchanges[key].compra + data.volume
                  }
                }
              })
            }
          })
        })
        this.setState({
          stocks: {
            ...this.state.stocks,
            [data.ticker]: {
              ...this.state.stocks[data.ticker], buy: this.state.stocks[data.ticker].buy.concat([data.volume])
            }
          }
        })
      })
      socket.on('SELL', (data) => {
        this.setState({total: this.state.total + data.volume})
        let stock_help = this.state.stocks[data.ticker]
        Object.keys(this.state.exchanges).forEach(key =>{
          this.state.exchanges[key].listed_companies.forEach(element=>{
            if (element === stock_help.company_name){
              this.setState({
                exchanges: {
                  ...this.state.exchanges,
                  [key]: {
                    ...this.state.exchanges[key],
                    venta: this.state.exchanges[key].venta + data.volume
                  }
                }
              })
            }
          })
        })
        this.setState({
          stocks: {
            ...this.state.stocks,
            [data.ticker]: {
              ...this.state.stocks[data.ticker], sell: this.state.stocks[data.ticker].sell.concat([data.volume])
            }
          }
        })
      })

    }
  }

  callbackExchange(exchange) {
    this.setState({ chosedExchange: exchange })
  }

  callbackView(view) {
    this.setState({ actualView: view })
  }

  callbackStock(stock) {
    this.setState({ chosedStock: stock })
  }
  componentWillMount() {
    if (this.state.checked) {
      socket.emit('EXCHANGES' /* */)
      socket.on('EXCHANGES', (data)=>{
        Object.keys(data).forEach(key =>{
          data[key]["compra"] = 0
          data[key]["venta"] = 0
        })
        this.setState({exchanges: data})
        this.setState({ chosedExchange: this.state.exchanges[Object.keys(this.state.exchanges)[0]]})
      })
      socket.emit('STOCKS' /* */)
      socket.on('STOCKS', (data) => {
        var result = {}
        data.forEach(element => {
          element["pricesx"] = []
          element["pricesy"] = []
          element["buy"] = []
          element["sell"] = []
          element["max"] = 0
          element["min"] = 10000
          element["delta"] = 0
          element["last"] = 0
          result[element.ticker] = element
        });
        this.setState({ stocks: result })
        this.setState({ chosedStock: this.state.stocks[Object.keys(this.state.stocks)[0]] })
        socket.on('UPDATE', (data) => {
          let time = moment(data.time)
          time = time.format("DD/MM/YY HH:mm:ss")
          let max = this.state.stocks[data.ticker].max
          if (data.value > max) {
            max = data.value
          }
          let min = this.state.stocks[data.ticker].min
          if (data.value < min) {
            min = data.value
          }
          let last = this.state.stocks[data.ticker].last
          this.setState({
            stocks: {
              ...this.state.stocks, [data.ticker]:
              {
                ...this.state.stocks[data.ticker], pricesx: this.state.stocks[data.ticker].pricesx.concat([time]),
                pricesy: this.state.stocks[data.ticker].pricesy.concat([data.value]), last: data.value, max: max, min: min,
                delta: (((data.value - last) / (last)) * 100).toFixed(2)
              }
            }
          })
        })
        socket.on('BUY', (data) => {
          let stock_help = this.state.stocks[data.ticker]
          this.setState({total: this.state.total + data.volume})
          Object.keys(this.state.exchanges).forEach(key =>{
            this.state.exchanges[key].listed_companies.forEach(element=>{
              if (element === stock_help.company_name){
  
                this.setState({
                  exchanges: {
                    ...this.state.exchanges,
                    [key]: {
                      ...this.state.exchanges[key],
                      compra: this.state.exchanges[key].compra + data.volume
                    }
                  }
                })
              }
            })
          })
          this.setState({
            stocks: {
              ...this.state.stocks,
              [data.ticker]: {
                ...this.state.stocks[data.ticker], buy: this.state.stocks[data.ticker].buy.concat([data.volume])
              }
            }
          })
        })
        socket.on('SELL', (data) => {
          this.setState({total: this.state.total + data.volume})
          let stock_help = this.state.stocks[data.ticker]
          Object.keys(this.state.exchanges).forEach(key =>{
            this.state.exchanges[key].listed_companies.forEach(element=>{
              if (element === stock_help.company_name){
                this.setState({
                  exchanges: {
                    ...this.state.exchanges,
                    [key]: {
                      ...this.state.exchanges[key],
                      venta: this.state.exchanges[key].venta + data.volume
                    }
                  }
                })
              }
            })
          })
          this.setState({
            stocks: {
              ...this.state.stocks,
              [data.ticker]: {
                ...this.state.stocks[data.ticker], sell: this.state.stocks[data.ticker].sell.concat([data.volume])
              }
            }
          })
        })
      })

    }
  }

  render() {
    if (this.state.actualView === "Stocks") {
      return (
        <div>
          <ThemeProvider theme={theme}>
            <Navbar styles={styles} parentCallback={this.callback} parentChecked={this.state.checked} view={this.state.actualView} parentView={this.callbackView} />
            <br />
            <Grid stocks={this.state.stocks} chosedStock={this.state.chosedStock} changeStock={this.callbackStock}></Grid>
          </ThemeProvider>
        </div>
      )
    } else {
      return (
        <div>
          <ThemeProvider theme={theme}>
            <Navbar styles={styles} parentCallback={this.callback} parentChecked={this.state.checked} view={this.state.actualView} parentView={this.callbackView} />
            <br />
            <GridEx exchanges={this.state.exchanges} chosedExchange={this.state.chosedExchange} changeExchange={this.callbackExchange} total={this.state.total}></GridEx>
          </ThemeProvider>
        </div>
      )
    }
  }
}



