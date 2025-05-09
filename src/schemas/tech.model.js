const { UUIDV4, DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db.config");

const Tech = sequelize.define('tech', {
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    name: {
        type: DataTypes.STRING,
    },
    slug: {
        type: DataTypes.STRING,
    },
    logo: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
});

module.exports = Tech;