import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../connection";

export interface ProjectAttributes {
  id: string;
  name: string;
  description: string;
  status: "active" | "archived";
  ownerId: string;
  createdAt: Date;
}

export interface ProjectCreationAttributes extends Optional<ProjectAttributes, "id" | "createdAt"> {}

class Project extends Model<ProjectAttributes, ProjectCreationAttributes> implements ProjectAttributes {
  declare id: string;
  declare name: string;
  declare description: string;
  declare status: "active" | "archived";
  declare ownerId: string;
  declare createdAt: Date;
}

Project.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "archived"),
      allowNull: false,
      defaultValue: "active",
    },
    ownerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "projects",
    timestamps: false,
  },
);

export default Project;
