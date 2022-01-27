const axios = require('axios');
var products = {};
var sales = {};
exports.homeRoutes = async (req, res) => {
    // Make a get request to /api/users
    try {
        await axios.get(`http://localhost:${process.env.PORT}/api/products`)
            .then(function (response) {
                products = response.data;
                // res.render('index', { products: response.data });
            })
            .catch(err => {
                res.send(err);
            })

        await axios.get(`http://localhost:${process.env.PORT}/api/sales?id=61f040fa19ce5cfd39fcbb29`)
            .then(function (response) {
                sales = response.data;
                // res.render('index', { products: response.data });
            })
            .catch(err => {
                res.send(err);
            })
            res.render('index', { products, sales });
    } catch { }
    
}


exports.add_product = (req, res) => {
    res.render('add_product');
}

exports.update_product = (req, res) => {
    axios.get(`http://localhost:${process.env.PORT}/api/products`, { params: { id: req.query.id } })
        .then(function (productdata) {
            // console.log(userdata.data);
            res.render('update_product', { product: productdata.data });
        })
        .catch(err => {
            // console.log(err);
            res.send(err);
        })
    // res.render('update_user');
}
