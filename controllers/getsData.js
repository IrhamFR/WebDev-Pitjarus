const { User } = require('../models')
const Joi = require('joi');
const db = require('../models');
const { getAll } = require('../helpers/getData');
const ErrorResponse = require('../utilities/ErrorResponse');

module.exports = async (req, res, next) => {
    try {
        let search = []
            let { cities, dateFrom, dateTo } = req.query
            if (!cities) {
                cities = []
            } else {
                cities = cities.split(',')
                cities.forEach(city => {
                    search.push(city)
                });
            }

            if (dateFrom && dateTo) {
                let epochStart = new Date(dateFrom).getTime()
                let epochEnd = new Date(dateTo).getTime()

                if (epochEnd - epochStart < 0) {
                    return next(new ErrorResponse('End Date must be later than Start Date', 401));
                }
            }

            if (dateFrom && !isNaN(new Date(dateFrom).getTime())) {
                search.push(dateFrom)
            }

            if (dateTo && !isNaN(new Date(dateTo).getTime())) {
                search.push(dateTo)
            }
            
            let query = getAll(cities, dateFrom, dateTo)
            const result = await db.sequelize.query(query, {
                type: db.sequelize.QueryTypes.SELECT,
                replacements: search
            })

            let labelCharts = []
            let dataCharts =[]
            let charts = result.map(el => {
                labelCharts.push(`${el.area_name}`)
                dataCharts.push(+((el.rt_comp + el.sk_comp) / el.n_comp * 100).toFixed(1))
            })
            let citiesTable = []
             result.map(el => {
                citiesTable.push({
                    area: el.area_name
                })
            })
            let dataTable = []
             result.map(el => {
                dataTable.push({
                    persent: +((el.rt_comp) / (el.rt_comp + el.rt_ncomp) * 100).toFixed(1),
                    persents:+((el.sk_comp) / (el.sk_comp + el.sk_ncomp) * 100).toFixed(1),
                })
            })
            let storeAreas = await db.StoreArea.findAll();
            res.render("index", {
                    charts: {
                        labelCharts,
                        dataCharts
                    },
                    dataTable,
                    storeAreas,
                    citiesTable
            });
        next();
    } catch (error) {
        console.log(error.message);
        next(error)
    }
}