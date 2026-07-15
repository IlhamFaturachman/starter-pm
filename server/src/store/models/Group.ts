import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../connection";

export interface GroupAttributes {
  id: string;
  name: string;
  description: string;
}

export interface GroupCreationAttributes extends Optional<GroupAttributes, "id"> {}

class Group extends Model<GroupAttributes, GroupCreationAttributes> implements GroupAttributes {
  declare id: string;
  declare name: string;
  declare description: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Group.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "",
    },
  },
  {
    sequelize,
    tableName: "groups",
    timestamps: true,
  },
);

export default Group;
