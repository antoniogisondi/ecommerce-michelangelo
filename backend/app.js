const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const home = require('./routes/home')
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');
const adminHomeRoutes = require('./routes/adminHomeRoutes')
const { sequelize } = require('./models/index');
const path = require('path');

dotenv.config();

const app = express();

// Imposta EJS come motore di template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(home)
app.use(adminRoutes)
app.use(adminHomeRoutes)

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

