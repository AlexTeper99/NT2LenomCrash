import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 3001


// simulo una base de datos en memoria
// monedas

let monedas = [{ ticker: "BTC", nombre: "Bitcoin", precio: 30000.0 }, { ticker: "ETH", nombre: "Ethereum", precio: 2500.0 }, { ticker: "LTC", nombre: "Litecoin", precio: 68.0 },
    { ticker: "XRP", nombre: "Ripple", precio: 0.25 }, { ticker: "ADA", nombre: "Cardano", precio: 0.1 }, { ticker: "USDT", nombre: "Tether", precio: 1.0 }
];

app.get('/api/monedas', (req, res) => {
    // CONSULTA A BASE DE DATOS
    res.json(monedas);
})

app.post('/api/monedas/setmoneda', (req, res) => {
    // INSERTAR EN BASE DE DATOS
    monedas.push(req.body);
    res.json(monedas);
})

app.delete('/api/monedas/:ticker', (req, res) => {
    monedas = monedas.filter(elto => elto.ticker !== req.params.ticker);
    res.json(monedas);
})

app.post('/api/monedas/modificarmoneda', (req, res) => {

    let ticker = req.body.ticker;
    let mbuscada = monedas.find(moneda => moneda.ticker === ticker);

    console.log(mbuscada);

    mbuscada.precio = req.body.precio;

    res.json(monedas);
})

app.get('/api/monedas/:ticker', (req, res) => {
    let ticker = req.params.ticker;
    let mbuscada = monedas.find(moneda => moneda.ticker === ticker);
    res.json(mbuscada);
})

// ---------------------- Wallets ---------------------

let wallets = [{
        id: 1,
        coin: {
            id: 1,
            ticker: "BTC",
            cantidad: 23
        },
    },
    {
        id: 2,
        coin: {
            id: 2,
            ticker: "ETH",
            cantidad: 5
        },
    },
    {
        id: 3,
        coin: {
            id: 3,
            ticker: "LTC",
            cantidad: 78
        },

    },
];

app.get('/api/wallets', (req, res) => {
    res.json(wallets);
})

app.get('/api/getWalletById/:id', (req, res) => {
    let wallet = wallets.find(wallet => wallet.id === Number(req.params.id));
    res.json(wallet);
})

app.put('/api/updatewallet', (req) => {
    let newWallet = req.body;
    let wallet = wallets.find(wallet => wallet.id === Number(newWallet.id));
    wallet.coin.cantidad = newWallet.coin.cantidad;
    wallet.coin.ticker = newWallet.coin.ticker;

});


app.delete('/api/wallet/:id', (req, res) => {
    let walletId = req.params.id;
    console.log(walletId);
    let index = wallets.map(wallet => { return wallet.id; }).indexOf(walletId);
    wallets.splice(index, 1);

});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


// usuarios ---------------------------------------------------------------------------/

const usuarios = [{id: 1, nombre: "Alejo", apellido: "Curello", email: "asd@gmail.com", password: "123456", listawallet: [1,2] },
                  {id: 2, nombre: "Santiago", apellido: "SantaMaria", email: "SS@gmail.com", password: "123456", listawallet: [3] },
                  {id: 3, nombre: "Admin", apellido: "Admin", email: "test@test.com", password: "123456", listawallet: []}
];



app.post('/api/login', (req,res) => {
    console.log('entre al api/login')

    try{
        //METERLO EN UN IF o un try catch
        let usuario = usuarios.find(user => user.email === req.body.email && user.password === req.body.password)
        console.log(usuario)

        let variable = req.body;
        console.log(variable)

        if ( req.body && req.body.email == usuario.email && req.body.password == usuario.password ) {
            res.sendStatus(200);
           // res.send(usuario)
        } else {
            res.sendStatus(400);
        }
    }catch(error){
        console.log(error.error)
        res.sendStatus(500);
    }

})



app.get('/api/usuarios', (req,res) => {
  res.json(usuarios);
})

app.get('/api/getusuariosById/:id', (req, res) => {
    let usuarioBuscado = usuarios.find(user => user.id === Number(req.params.id))
    res.json(usuarioBuscado)
})

app.put('/api/usuarios/modificarcontrasenia', (req,res) => {
    let nuevoUsuario = req.body;

    let usuarioBuscado = usuarios.find(us => us.id === Number(req.params.id))

    usuarioBuscado.password = nuevoUsuario.password;
})


app.delete('/api/usuarios/:id', (req,res) => {
   let userId = req.params.id;

    let index = usuarios.map(user => { return user.id; }).indexOf(userId);
    usuarios.splice(index, 1);
})

