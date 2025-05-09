const { UUIDV4, DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db.config");

const Project = sequelize.define('project', {
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    name: {
        type: DataTypes.STRING,
    },
    subName: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    workDescription: {
        type: DataTypes.STRING
    },
    frontendTech: {
        type: DataTypes.STRING
    },
    backendTech: {
        type: DataTypes.STRING
    },
    companyId: {
        type: DataTypes.UUIDV4
    },
    siteURL: {
        type: DataTypes.STRING
    },
    imageURL: {
        type: DataTypes.STRING
    }
}, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
});

module.exports = Project;