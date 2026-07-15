import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";

class UserGroup extends Model {
  declare userId: string;
  declare groupId: string;
}

UserGroup.init(
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    groupId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "groups",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "user_groups",
    timestamps: false,
  },
);

export default UserGroup;
