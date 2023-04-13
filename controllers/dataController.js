
const Data = require('../models/dataModel')
const mongoose = require('mongoose')

const getData = async (req, res) => {
    // const data1 = await Data.find({}).sort({createdAt: -1})//decending -1

    // res.status(200).json(data1)
    //
    // Data.find({}, function(err, data) {
    //     res.render('home', {
    //         dataList: data
    //     })
    // })
    //
    //
    const data = await Data.find({});
    res.render('home', { dataList: data });
    //
}

module.exports = {
    getData
}