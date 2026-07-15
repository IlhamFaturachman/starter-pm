import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";

class GroupPermission extends Model {
  declare groupId: string;
  declare permissionId: string;
}

GroupPermission.init(
  {
    groupId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "groups",
        key: "id",
      },
    },
    permissionId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "permissions",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "group_permissions",
    timestamps: false,
  },
);

export default GroupPermission;
