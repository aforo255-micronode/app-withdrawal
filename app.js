require('dotenv').config()
const express = require('express')
const app = express()

// const PORT = process.env.SERVER_PORT_WITHDRAWAL || 3004

// app.use(express.json())
// app.use('/api', require('./src/app/routes'))

// app.listen(PORT, () => {
//     console.log('Application running on port ', PORT)
// })

const appPromise = require('./src/app/middlewares/configprovider').appPromise

const client = require('prom-client');
const counter = new client.Counter({
    name: 'http_request_counter_health',
    help: 'Metrics to count hits on the health api ',
});
const register = new client.Registry();
register.registerMetric(counter)
register.setDefaultLabels({
    app: 'app-withdrawal',
    prefix: 'node_'
  })
client.collectDefaultMetrics({ register })
 
appPromise.then(function(app) {
    const PORT = process.env.SERVER_PORT_WITHDRAWAL || 3004
    app.use('/api', require('./src/app/routes'))
    app.get('/metrics', async (req, res) => {
        res.setHeader('Content-Type', register.contentType)
        res.send(await register.metrics())
    });
    app.get('/health', async (req, res) => {
        counter.inc()
        res.send({message: 'Account App healty'});
    });
    app.listen(PORT, () => {
        console.log('Application running on port ', PORT)
    })
});
 