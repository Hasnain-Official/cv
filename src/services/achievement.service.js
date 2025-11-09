const fileName = 'Achievement Service';
const Achievement = require('../models/achievement.model');
const { errorHandler } = require('../constants/message.constant');
const isUuid = require('is-uuid');
const { STATUS_CODE } = require('../constants/constant');

/**
 * @function save
 * @param {*} body 
 * @param {*} user
 * @returns {Promise<Object>} 
 * @use Save Achievement
 */
exports.saveAchievement = async function (body) {
    const {
        name,
        companyId,
        userId
    } = body;
    if (!name || !companyId || !isUuid.v4(companyId) || !userId || !isUuid.v4(userId)) {
        return { status: STATUS_CODE.BADREQUEST, message: errorHandler.missing };
    }
    const newData = {
        name,
        slug: name.toLowerCase().trim(),
        companyId,
        userId
    };
    await Achievement.create(newData);
    return newData;
}

/**
 * Save Acheivements in bulk
 * @function save
 * @param {*} body 
 * @param {*} user 
 * @returns {Promise<Object>}
 * @use saveBulkAchievements
 */
exports.saveBulkAchievements = async function (body) {
    const {
        achievement,
        userId
    } = body;
    if (!achievement) return { status: STATUS_CODE.BADREQUEST, message: errorHandler.missing };
    const created = [], errorWhileCreating = [];

    achievement.map(async val => {
        try {
            const obj = {
                name: val.name,
                companyId: val.companyId,
                userId: userId
            }
            const resp = await saveAchievement(obj);
            if (!resp || resp.status === STATUS_CODE.BADREQUEST) created.push(resp);
            else errorWhileCreating.push({ name: val.name, message: resp.message });
        } catch (err) {
            errorWhileCreating.push({ name: val.name, message: err.message });
        }
    });
    return {
        created: created,
        errorWhileCreating: errorWhileCreating
    }
}

/**
 * Get Achievements
 * @param {*} query 
 * @param {*} user 
 * @returns {Promise<Object>}
 * @use Get Achievements
 */
exports.getAchievements = async function (query) {
    const {
        id,
        slug,
        isActive,
        isDeleted,
        companyId,
        userId
    } = query;

    const queryObj = {
        where: {},
        attributes: ['id', 'name', 'slug']
    };

    if (id && isUuid.v4(id)) queryObj['where']['id'] = id;
    else if (slug) queryObj['where']['slug'] = slug;
    else if (isActive) queryObj['where']['isActive'] = isActive;
    else if (isDeleted) queryObj['where']['isDeleted'] = isDeleted;
    else if (companyId && isUuid.v4(companyId)) queryObj['where']['companyId'] = companyId;
    else if (userId && isUuid.v4(userId)) queryObj['where']['userId'] = userId;

    const getData = await Achievement.findAndCountAll(query);
    return !getData.error ? getData : { status: 500, message: errorHandler.somethingWentWrong };
}

exports.updateAchievementsById = async function () {
    return {};
}

exports.deleteAchievementById = async function ({ id }) {
    return {};
}

exports.deactivateAchievementsById = async function (query) {
    const {id, companyId} = query;
    
    return {};
}