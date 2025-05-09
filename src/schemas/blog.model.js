const { UUIDV4, DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db.config");

const Blog = sequelize.define('blog', {
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    siteURL: {
        type: DataTypes.STRING,
    },
    imageURL: {
        type: DataTypes.STRING,
    },
    title: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
});

module.exports = Blog;