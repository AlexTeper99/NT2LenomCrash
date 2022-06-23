import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 3001


// simulo una base de datos en memoria
// monedas
let usuarios = [{ id: 1, nombre: "Alejo", apellido: "Curello", email: "asd@gmail.com", password: "123456", listawallets: [1, 2] },
    { id: 2, nombre: "Santiago", apellido: "SantaMaria", email: "SS@gmail.com", password: "123456", listawallets: [3] },
    { id: 3, nombre: "Admin", apellido: "Admin", email: "test@test.com", password: "123456", listawallets: [] }
];

let monedas = [{ ticker: "BTC", nombre: "Bitcoin", precio: 30000.0 }, { ticker: "ETH", nombre: "Ethereum", precio: 2500.0 }, { ticker: "LTC", nombre: "Litecoin", precio: 68.0 },
    { ticker: "XRP", nombre: "Ripple", precio: 0.25 }, { ticker: "ADA", nombre: "Cardano", precio: 0.1 }, { ticker: "USDT", nombre: "Tether", precio: 1.0 }
];

let wallets = [{
        id: 1,
        coin: {
            ticker: "BTC",
            cantidad: 23
        },
    },
    {
        id: 2,
        coin: {
            ticker: "ETH",
            cantidad: 5
        },
    },
    {
        id: 3,
        coin: {
            ticker: "LTC",
            cantidad: 78
        },
    },
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

    mbuscada.precio = req.body.precio;

    res.json(monedas);
})

app.get('/api/monedas/:ticker', (req, res) => {
    let ticker = req.params.ticker;
    let mbuscada = monedas.find(moneda => moneda.ticker === ticker);
    res.json(mbuscada);
})

// ---------------------- Wallets ---------------------

// Get last wallet id
app.get('/api/wallets/getLastId', (req, res) => {
    let value = wallets.length + 1;
    res.send(value.toString());
});

// Create a wallet
app.post('/api/wallets/createwallet', (req, res) => {
    console.log('creando wallet .. ');
    let userid = req.body.data.userid;
    let newWallet = req.body.data.wallet;

    wallets.push(newWallet);
    let user = usuarios.find(user => user.id === userid);
    user.listawallets.push(newWallet.id);

});

app.get('/api/allwallets', (req, res) => {
    res.json(wallets);
});

// get wallets for a given user
app.get('/api/wallets/:userId', async(req, res) => {
    let userWallets;
    let walletIds = [];
    let usuario = {};
    usuario = usuarios.find(usuario => usuario.id === Number(req.params.userId));
    walletIds = usuario.listawallets;
    userWallets = walletIds.map(function(walletId) {
        return wallets.find(wallet => wallet.id === walletId);
    });

    res.json(userWallets);

});

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

// DELETE A WALLET BY ID
app.post('/api/wallet/deleteWallet', (req, res) => {
    let walletId = Number(req.body.walletId);
    let userId = Number(req.body.userId);

    wallets = wallets.filter(wallet => wallet.id !== walletId);
    let user = usuarios.find(user => user.id === userId);
    user.listawallets = user.listawallets.filter(id => id !== walletId);

});




// usuarios ---------------------------------------------------------------------------/


app.post('/api/login', (req, res) => {
    try {

        let usuario = usuarios.find(user => user.email === req.body.email && user.password === req.body.password)

        if (req.body && req.body.email == usuario.email && req.body.password == usuario.password) {
            res.sendStatus(200);
        } else {
            res.sendStatus(400);
        }
    } catch (error) {
        console.log(error.error)
        res.sendStatus(500);
    }

})

app.get('/api/wallets', (req, res) => {
    res.json(wallets);
})

app.get('/api/usuarios', (req, res) => {
    res.json(usuarios);
})

app.get('/api/getusuariosById/:id', (req, res) => {
    let usuarioBuscado = usuarios.find(user => user.id === Number(req.params.id))
    res.json(usuarioBuscado)
})


app.post('/api/usuarios/findUserByEmail/', (req, res) => {
    let usuarioBuscado = usuarios.find(user => user.email === req.body.email);
    res.json(usuarioBuscado);
});


app.delete('/api/usuarios/:id', (req, res) => {
    let userId = req.params.id;

    let index = usuarios.map(user => { return user.id; }).indexOf(userId);
    usuarios.splice(index, 1);
})



app.post('/api/usuarios/setusuarios', (req, res) => {
    // INSERTAR EN BASE DE DATOS
    usuarios.push(req.body);
    res.json(usuarios);
})

app.put('/api/usuarios/updateusuario', (req) => {
    let newUsuario = req.body;
    // console.log("new usuarioo " + newUsuario)
    let usuario = usuarios.find(usuario => usuario.id === Number(newUsuario.id));
    // console.log("usuario buscado en la BD" + usuario)
    usuario.nombre = newUsuario.nombre;
    usuario.apellido = newUsuario.apellido;
    usuario.email = newUsuario.email;
    usuario.password = newUsuario.password;
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})