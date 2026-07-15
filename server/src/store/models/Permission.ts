import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../connection";

export type PermissionAction = "create" | "read" | "update" | "delete";

export interface PermissionAttributes {
  id: string;
  key: string;
  name: string;
  menuId: string;
  action: PermissionAction;
}

export interface PermissionCreationAttributes extends Optional<PermissionAttributes, "id"> {}

class Permission extends Model<PermissionAttributes, PermissionCreationAttributes> implements PermissionAttributes {
  declare id: string;
  declare key: string;
  declare name: string;
  declare menuId: string;
  declare action: PermissionAction;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Permission.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    menuId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "menus",
        key: "id",
      },
    },
    action: {
      type: DataTypes.ENUM("create", "read", "update", "delete"),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "permissions",
    timestamps: true,
  },
);

export default Permission;
