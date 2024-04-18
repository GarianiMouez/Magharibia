const econtract = require("../models/EntrepriseContract");

const get = async () => {
  try {
    const result = await econtract.findAll({
      attributes: [
        "id",
        "SDate",
        "EDate",
        "Coqu",
        "motor",
        "totalAmount",
        "netAmount",
        "ShipId",
        "CompanyId",
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
    const result = await econtract.findByPk(id, {
      attributes: [
        "id",
        "SDate",
        "EDate",
        "Coqu",
        "motor",
        "totalAmount",
        "netAmount",
        "ShipId",
        "CompanyId",
        "createdAt",
        "updatedAt",
      ],
    });
    return result.dataValues;
  } catch (error) {
    throw error;
  }
};

const getByUsername = async (username) => {
  try {
    const result = await econtract.findOne({
      where: {
        username,
      },
      attributes: ["id", "username", "password", "createdAt", "updatedAt"],
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const create = async (data) => {
  try {
    const result = await econtract.create(data);
    return result;
  } catch (error) {
    throw error;
  }
};

const update = async (id, data) => {
  try {
    const result = await econtract.update(data, { where: { id } });
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
    const result = await econtract.destroy({
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
  getByUsername,
  create,
  update,
  deleteById,
};
