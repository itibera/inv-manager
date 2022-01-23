
var Productdb = require('../model/model');

//create and save new product

exports.create = (req, res) => {
    //validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    //new user
    const product = new Productdb({
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
        supplier: req.body.supplier
    })
    //save product in the database
    product
        .save(product)
        .then(data => {
            //res.send(data)
            res.redirect('/add-product');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating a create operation'
            });
        });
}

//retrieve and return all products/ retrive and return a single product

exports.find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;

        Productdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found product with id " + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error retrieving product with id " + id })
            })

    } else {
        Productdb.find()
            .then(product => {
                res.send(product)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error occured while retriving product information" })
            })
    }

}

//update a new identified product by userid

exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Productdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update product with ${id}. Maybe product not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update product information"})
        })
}

//delete a user with specified productid in the request

exports.delete = (req, res) => {
    const id = req.params.id;

    Productdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
            } else {
                res.send({
                    message: "Product was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Product with id=" + id
            });
        });
}