import { InferAttributes, InferCreationAttributes,
  CreationOptional, Model, DataTypes } from 'sequelize';
import db from '.';

class SequelizeTeams extends Model<InferAttributes<SequelizeTeams>,
InferCreationAttributes<SequelizeTeams>> {
  declare id: CreationOptional<number>;

  declare teamName: string;
}

SequelizeTeams.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'team_name',
  },
}, {
  sequelize: db,
  timestamps: false,
  tableName: 'teams',
  modelName: 'teams',
});

export default SequelizeTeams;
