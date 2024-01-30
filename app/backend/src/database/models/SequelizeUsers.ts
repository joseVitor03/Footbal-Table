import { Model, InferAttributes, InferCreationAttributes,
  CreationOptional, DataTypes } from 'sequelize';
import db from '.';

class SequelizeUsers extends Model<InferAttributes<SequelizeUsers>,
InferCreationAttributes<SequelizeUsers>> {
  declare id: CreationOptional<number>;

  declare username: string;

  declare role: string;

  declare email: string;

  declare password: string;
}

SequelizeUsers.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
  modelName: 'users',
  tableName: 'users',
  sequelize: db,
});

export default SequelizeUsers;
