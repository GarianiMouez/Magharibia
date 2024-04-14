const pcontract = require("../models/personalContract");

const get = async () => {
  try {
    const result = await pcontract.findAll({
      attributes: [
        "id",
        "SDate",
        "EDate",
        "Coqu",
        "motor",
        "totalAmount",
        "netAmount",
        "ClientId",
        "ShipId",
        "createdAt",
        "updatedAt",
      ],
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const getById = async (id) => {
  try {
    const result = await pcontract.findByPk(id, {
      attributes: [
        "id",
        "SDate",
        "EDate",
        "Coqu",
        "motor",
        "totalAmount",
        "netAmount",
        "ClientId",
        "ShipId",
        "createdAt",
        "updatedAt",
      ],
    });
    return result.dataValues;
  } catch (error) {
    throw error;
  }
};

const create = async (data) => {
  try {
    const result = await pcontract.create(data);
    return result;
  } catch (error) {
    throw error;
  }
};

const update = async (id, data) => {
  try {
    const result = await pcontract.update(data, { where: { id } });
    if (!result || result[0] != 1) {
      return false;
    }
    return true;
  } catch (error) {
    throw error;
  }
};

const deleteById = async (id) => {
  try {
    const result = await pcontract.destroy({
      where: {
        id,
      },
    });
    if (result === 0) {
      return false;
    }
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  get,
  getById,
  create,
  update,
  deleteById,
};
