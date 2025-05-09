const { UUIDV4, DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db.config");

const Journey = sequelize.define('journey', {
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    name: {
        type: DataTypes.STRING,
    },
    empId: {
        type: DataTypes.STRING
    },
    companyName: {
        type: DataTypes.STRING
    },
    startDate: {
        type: DataTypes.DATE
    },
    endDate: {
        type: DataTypes.DATE
    },
    companyAddress: {
        type: DataTypes.STRING
    },
    designation: {
        type: DataTypes.STRING,
    },
    workDescription: {
        type: DataTypes.TEXT,
    },
    isCurrentCompany: {
        type: DataTypes.BOOLEAN
    }
}, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
});

module.exports = Journey;