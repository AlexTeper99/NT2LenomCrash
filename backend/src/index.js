import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 3001

// sistema prototipo

app.post('/api/login', (req,res) => {

  // simulo traer un usuario de la base de datos
  // este prototipo es monousuario para este ejemplo
  console.log(req.body);
  const usuario = { email : 'test@test.com' , password : '123456'};
  if ( req.body && req.body.email == usuario.email && req.body.password == usuario.password ) {
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
})


// simulo una base de datos en memoria
// vendedores

const monedas = [{ticker:"BTC",nombre:"Bitcoin",precio: 30000.0},{ticker:"ETH",nombre:"Ethereum",precio: 2500.0},{ticker:"LTC",nombre:"Litecoin",precio: 68.0},
{ticker:"XRP",nombre:"Ripple",precio: 0.25},{ticker:"ADA",nombre:"Cardano",precio: 0.1},{ticker:"USDT",nombre:"Tether",precio: 1.0}];

app.get('/api/monedas', (req,res) => {
  // CONSULTA A BASE DE DATOS
  res.json(monedas);
})

app.post('/api/monedas/setmoneda', (req,res) => {
  // INSERTAR EN BASE DE DATOS
  monedas.push(req.body);
  res.json(monedas);
})
/*
app.delete('/api/monedas/:ticker', (req,res) => {
  // ELIMINAR EN BASE DE DATOS
  const ticker = req.params.ticker;
  const index = monedas.findIndex(m => m.ticker == ticker);
  if (index > -1) {
    monedas.splice(index,1);
  };
  res.json(monedas);
})
*/

app.delete('/api/monedas/:ticker', (req,res) => {
  const listaMonedas = monedas.map( e => { return e.ticker } )
  const indice = listaMonedas.indexOf(m.ticker == req.params.ticker);
  lista.splice(indice,1);
})

app.put('/api/monedas', (req,res) => {
  // MODIFICAR EN BASE DE DATOS
  monedas.push(req.body);
  res.json(monedas);
})


/*
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/setvendedor', (req,res) => {
  req.body.codigo = Number(req.body.codigo)
  lista.push(req.body);
})

app.delete('/api/vendedor/:codigo', (req,res) => {
  const listaCodigos = lista.map( e => { return e.codigo } )
  const indice = listaCodigos.indexOf(Number(req.params.codigo))
  lista.splice(indice,1);
})

app.post('/api/setvendedor', (req,res) => {
  // revisar
})


 */

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})