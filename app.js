const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const logisticsRoutes = require('./routes/logisticsRoutes');

const app = express();

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.use('/api', productRoutes);
app.use('/api', orderRoutes);
app.use('/api', logisticsRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
