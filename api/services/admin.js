const Admin = require("../models/admin");

const get = async () => {
  try {
    const result = await Admin.findAll({
      attributes: [
        "id",
        "image",
        "username",
        "firstName",
        "lastName",
        "isSuperAdmin",
        "email",
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
    const result = await Admin.findByPk(id, {
      attributes: [
        "id",
        "image",
        "username",
        "firstName",
        "lastName",
        "isSuperAdmin",
        "email",
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
    const result = await Admin.findOne({
      where: {
        username,
      },
      attributes: [
        "id",
        "image",
        "password",
        "username",
        "password",
        "firstName",
        "lastName",
        "isSuperAdmin",
        "email",
        "createdAt",
        "updatedAt",
      ],
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const create = async (data) => {
  try {
    const result = await Admin.create(data);
    return result;
  } catch (error) {
    throw error;
  }
};

const update = async (id, data) => {
  try {
    const result = await Admin.update(data, { where: { id } });
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
    const result = await Admin.destroy({
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
