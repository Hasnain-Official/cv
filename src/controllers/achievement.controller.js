const { errorHandler, successHandler } = require('../constants/message.constant');
const { logger } = require('../utils/winston.logger');
const fileName = 'Achievement Controller';
const { saveAchievement, getAchievements, deleteAchievementById, updateAchievementById, deactivateAchievementById, saveBulkAchievements } = require('../services/achievement.service');

/**
 * Save Achievement
 * @param {*} req 
 * @param {*} res 
 * @returns { achievementData }
 * @use Save Achievement
 */
exports.saveAchievement = async function (req, res) {
    try {
        const { body, query } = req;
        const resp = await saveAchievement(body, query);
        return res.status(resp.status || 200).json({ message: resp.message, data: resp.data || {} });
    } catch(err) {
        logger.error({ message: `Error in ${fileName}`, Error: err });
        return res.status(500).json({ message: errorHandler.internalServerError });
    }
}

/**
 * Save Bulk Achievements
 * @param {*} req 
 * @param {*} res 
 * @returns { achievementData }
 * @use Save achievements in bulk
 */
exports.saveBulkAchievement = async function (req, res) {
    try {
        const { body, query } = req;
        const resp = await saveBulkAchievements(body, query);
        return res.status(resp.status || 200).json({ message: resp.message, data: resp.data || {} });
    } catch(err) {
        logger.error({ message: `Error in ${fileName}`, Error: err });
        return res.status(500).json({ message: errorHandler.internalServerError });
    }
}

/**
 * Get Achievements
 * @param {*} req 
 * @param {*} res 
 * @returns { achievementData }
 * @use Get list of achievements
 */
exports.getAchievements = async function (req, res) {
    try {
        const { query } = req;
        const resp = await getAchievements(query);
        return res.status(resp.status || 200).json({ message: resp.message || successHandler.found, data: resp.data || {} });
    } catch(err) {
        logger.error({ message : `Error in ${fileName} `, Error : err });
        return res.status(500).json({ message: errorHandler.somethingWentWrong, data: {} });
    }
}

/**
 * Delete Achievements by Id
 * @param {*} req 
 * @param {*} res
 * @returns { achievementData }
 * @use Soft delete Achievement by Id 
 */
exports.deleteAchievementById = async function (req, res) {
    try {
        const { query } = req;
        const resp = await deleteAchievementById(query);
        return res.status(resp.status || 200).json({ message: resp.message || successHandler.found, data: resp.data || {} }); 
    } catch(err) {
        logger.error({ message : `Error in ${fileName} `, Error : err });
        return res.status(500).json({ message: errorHandler.somethingWentWrong, data: {} });
    }
}

/**
 * Update Achievement by Id
 * @param {*} req 
 * @param {*} res 
 * @returns { achievementData }
 * @use Update Achievement by Id
 */
exports.updateAchievementById = async function (req, res) {
    try {
        const { body, query } = req;
        const resp = await updateAchievementById(body, query);
        return res.status(resp.status || 200).json({ message: resp.message || successHandler.found, data: resp.data || {} }); 
    } catch(err) {
        logger.error({ message : `Error in ${fileName} `, Error : err });
        return res.status(500).json({ message: errorHandler.somethingWentWrong, data: {} });
    }
}

/**
 * Deactivate Achievement by Id
 * @param {*} req 
 * @param {*} res 
 * @returns { achievementData }
 * @use Deactivate Achievement by Id
 */
exports.deactivateAchievementById = async function (req, res) {
    try {
        const { query } = req;
        const resp = await deactivateAchievementById(query);
        return res.status(resp.status || 200).json({ message: resp.message || successHandler.found, data: resp.data || {} }); 
    } catch(err) {
        logger.error({ message : `Error in ${fileName} `, Error : err });
        return res.status(500).json({ message: errorHandler.somethingWentWrong, data: {} });
    }
}