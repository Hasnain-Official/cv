const { errorHandler, successHandler } = require('../constants/message.constant');
const { logger } = require('../utils/winston.logger');
const fileName = 'Achievement Controller';
const { saveAchievement, getAchievements, deleteAchievementById, updateAchievementsById, deactivateAchievementsById } = require('../services/achievement.service');

/**
 * Save Achievement
 * @param {*} req 
 * @param {*} res 
 * @returns { achievementData }
 * @use Save Achievement
 */
exports.saveAchievement = async function (req, res) {
    try {
        const { body, user } = req;
        const resp = await saveAchievement(body, user);
        return res.status(resp.status || 200).json({ message: resp.message, data: resp.data });
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
        return res.status(resp.status || 200).json({ message: resp.message || successHandler.found, data: resp.data });
    } catch(err) {
        logger.error({ message : `Error in ${fileName} `, Error : err });
        return res.status(500).json({ message: errorHandler.somethingWentWrong, data: [] });
    }
}

/**
 * Delete Achievements by Id
 * @param {*} req 
 * @param {*} res
 * @returns {achievementData}
 * @use Soft delete Achievement by Id 
 */
exports.deleteAchievementById = async function (req, res) {
    try {
        const { query } = req;
        const resp = await deleteAchievementById(query);
        return res.status(resp.status || 200).json({ message: resp.message || successHandler.found, data: resp.data }); 
    } catch(err) {
        logger.error({ message : `Error in ${fileName} `, Error : err });
        return res.status(500).json({ message: errorHandler.somethingWentWrong, data: [] });
    }
}

/**
 * Update Achievements by Id
 * @param {*} req 
 * @param {*} res 
 * @returns {achievementData}
 * @use Update Achievement by Id
 */
exports.updateAchievementsById = async function (req, res) {
    try {
        const { body } = req;
        const resp = await updateAchievementsById(body);
        return res.status(resp.status || 200).json({ message: resp.message || successHandler.found, data: resp.data }); 
    } catch(err) {
        logger.error({ message : `Error in ${fileName} `, Error : err });
        return res.status(500).json({ message: errorHandler.somethingWentWrong, data: [] });
    }
}

/**
 * Deactivate Achievement by Id
 * @param {*} req 
 * @param {*} res 
 * @returns {achievementData}
 * @use Deactivate Achievement by Id
 */
exports.deactivateAchievementsById = async function (req, res) {
    try {
        const { body } = req;
        const resp = await deactivateAchievementsById(body);
        return res.status(resp.status || 200).json({ message: resp.message || successHandler.found, data: resp.data }); 
    } catch(err) {
        logger.error({ message : `Error in ${fileName} `, Error : err });
        return res.status(500).json({ message: errorHandler.somethingWentWrong, data: [] });
    }
}