"use strict";

module.exports = (db, DataTypes) => {
    return db.define("product", {
        product_id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        product_name: DataTypes.STRING,
        brand_id: DataTypes.INTEGER,
    }, {
        freezeTableName: true,
        timestamps: false,
    })
}