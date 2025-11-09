const fileName = 'Achievement Service';
const Achievement = require('../models/achievement.model');
const { errorHandler } = require('../constants/message.constant');
const isUuid = require('is-uuid');
const { STATUS_CODE } = require('../constants/constant');

/**
 * @function save
 * @param {*} body 
 * @param {*} query
 * @returns {Promise<Object>} 
 * @use Save achievement
 */
exports.saveAchievement = async function (body, query) {
    const {
        name,
        companyId,
    } = body;
    const { userId } = query;

    if(!name || !companyId || !userId) 
        return { status: STATUS_CODE.BADREQUEST, message: errorHandler.missing };
    if(!isUuid.v4(companyId) || !isUuid.v4(userId))
        return { status: STATUS_CODE.BADREQUEST, message: errorHandler.invalidData };

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
 * Save achievements in bulk
 * @function save
 * @param {*} body 
 * @param {*} query 
 * @returns {Promise<Object>}
 * @use Save achievements in bulk
 */
exports.saveBulkAchievements = async function (body, query) {
    const {
        achievement
    } = body;
    const { userId } = query;
    const created = [], errorWhileCreating = [];

    if (!achievement) 
        return { status: STATUS_CODE.BADREQUEST, message: errorHandler.missing };

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
        errorWhileCreatin: errorWhileCreating
    }
}

/**
 * Get achievements
 * @function get
 * @param {*} query 
 * @returns {Promise<Object>}
 * @use Get achievements
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

/**
 * Update achievement by id
 * @function update
 * @param {*} body 
 * @param {*} query
 * @returns {Promise<Object>}
 * @use Update achievement record by id
 */
exports.updateAchievementById = async function (body, query) {
    const {
        name,
        isActive,
        isDeleted,
        companyId,
    } = body;
    const { id } = query;

    if( !id ) {
        return { status: STATUS_CODE.BADREQUEST, message: errorHandler.missing };
    }
    if( !isUuid.v4(id)) {
        return { status: STATUS_CODE.BADREQUEST, message: errorHandler.invalidData };
    }

    const updateObj = {};
    if(name) {
        updateObj['name'] = name;
        updateObj['slug'] = name.toLowerCase().trim();
    }
    if(isActive && typeof isActive !== 'boolean') updateObj['isActive'] = isActive;
    if(isDeleted && typeof isDeleted !== 'boolean' ) updateObj['isDeleted'] = isDeleted;
    if(companyId && isUuid.v4(companyId)) updateObj['companyId'] = companyId;

    const updatedData = await Achievement.update(updateObj, { where: { id }});
    return !updatedData ?
            { status: STATUS_CODE.BADREQUEST, message: errorHandler.dataNotFound, data: {} } :
            updatedData;
}

/**
 * Delete achievement by id
 * @function delete
 * @param {*} query 
 * @returns {Promise<Object>}
 * @use Delete achievement record by id
 */
exports.deleteAchievementById = async function (query) {
    const { id } = query;

    if(!id)
        return { status: STATUS_CODE.BADREQUEST, message: errorHandler.missing };
    if(!isUuid.v4(id))
        return { status: STATUS_CODE.BADREQUEST, message: errorHandler.invalidData };

    const deleteObj = { isActive: false, isDeleted: true };
    const deletedData = await Achievement.update(deleteObj, { id });

    return !deletedData ?
            { status: STATUS_CODE.BADREQUEST, message: errorHandler.dataNotFound, data: {} } :
            deletedData;
}

/**
 * Deactivate achievement by id
 * @function disable
 * @param {*} query 
 * @returns {Promise<Object>}
 * @use Deactivate achievement record by id
 */
exports.deactivateAchievementById = async function (query) {
    const { id } = query;

    if(!id)
        return { status: STATUS_CODE.BADREQUEST, message: errorHandler.missing };
    if(!isUuid.v4(id))
        return { status: STATUS_CODE.BADREQUEST, message: errorHandler.invalidData };

    const deactivateObj = { isActive: false };
    const deactivatedData = await Achievement.update(deactivateObj, { id });

    return !deactivatedData ?
        { status: STATUS_CODE.BADREQUEST, message: errorHandler.dataNotFound, data: {} } :
        deactivatedData;
}