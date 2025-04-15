const express = require('express')
const cors =  require('cors')
const connectDB = require('./configDB/db')
connectDB()
const consumer = require('./routes/consumer')
const vendor = require('./routes/vendor')
const product = require('./routes/product')
const order = require('./routes/order')
const transportbooking = require('./routes/transportbooking')
const payment = require('./routes/payment')


const app= express()
const port = 5001
app.use(cors())
app.use(express.json())
app.use('/consumers',consumer)
app.use('/vendors',vendor)
app.use('/products',product)
app.use('/orders',order)
app.use('/transportbookings',transportbooking)
app.use('/payment',payment),
app.use('/', require('./routes/nodeMailer'))



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})