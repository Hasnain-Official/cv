const { UUIDV4, DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db.config");

const Certification = sequelize.define('achievement', {
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    title: {
        type: DataTypes.STRING,
    },
    siteURL: {
        type: DataTypes.STRING,
    },
    companyId: {
        type: DataTypes.UUIDV4,
    }
}, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
});

module.exports = Certification;