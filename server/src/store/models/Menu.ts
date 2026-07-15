import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../connection";

export interface MenuAttributes {
  id: string;
  name: string;
  route: string;
  order: number;
}

export interface MenuCreationAttributes extends Optional<MenuAttributes, "id"> {}

class Menu extends Model<MenuAttributes, MenuCreationAttributes> implements MenuAttributes {
  declare id: string;
  declare name: string;
  declare route: string;
  declare order: number;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Menu.init(
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
    route: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "menus",
    timestamps: true,
  },
);

export default Menu;
