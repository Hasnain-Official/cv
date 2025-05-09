const { UUIDV4, DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db.config");

const ProjectTech = sequelize.define('projectTech', {
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    projectId: {
        type: DataTypes.UUIDV4,
    },
    techId: {
        type: DataTypes.UUIDV4,
    }
}, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
});

module.exports = ProjectTech;