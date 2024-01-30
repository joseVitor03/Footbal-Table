import { Model, DataTypes, InferAttributes,
  InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize';
import { ITeams } from '../../Interfaces/ITeams';
import db from '.';
import SequelizeTeams from './SequelizeTeams';

class SequelizeMatches extends Model<InferAttributes<SequelizeMatches>,
InferCreationAttributes<SequelizeMatches>> {
  declare id: CreationOptional<number>;

  declare homeTeamId: ForeignKey<ITeams['id']>;

  declare homeTeamGoals: number;

  declare awayTeamId: ForeignKey<ITeams['id']>;

  declare awayTeamGoals: number;

  declare inProgress: boolean;
}

SequelizeMatches.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_id',
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_id',
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  underscored: true,
  tableName: 'matches',
  modelName: 'matches',
  sequelize: db,
  timestamps: false,
});

SequelizeMatches.belongsTo(SequelizeTeams, {
  foreignKey: 'home_team_id', // nome da coluna na tabela SequelizeMatches
  targetKey: 'id', // nome da coluna na tabela SequelizeTeams
  as: 'homeTeam', // alias opcional
});

SequelizeMatches.belongsTo(SequelizeTeams, {
  foreignKey: 'away_team_id', // nome da coluna na tabela SequelizeMatches
  targetKey: 'id', // nome da coluna na tabela SequelizeTeams
  as: 'awayTeam', // alias opcional
});

SequelizeTeams.hasMany(SequelizeMatches, {
  sourceKey: 'id', // nome da coluna na tabela SequelizeTeams
  as: 'matches', // alias opcional
});

export default SequelizeMatches;
