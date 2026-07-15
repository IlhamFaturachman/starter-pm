import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../connection";

export interface TaskAttributes {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "review" | "done";
  projectId: string;
  assigneeId: string | null;
  priority: "low" | "medium" | "high";
  order: number;
}

export interface TaskCreationAttributes extends Optional<TaskAttributes, "id"> {}

class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  declare id: string;
  declare title: string;
  declare description: string;
  declare status: "todo" | "in_progress" | "review" | "done";
  declare projectId: string;
  declare assigneeId: string | null;
  declare priority: "low" | "medium" | "high";
  declare order: number;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("todo", "in_progress", "review", "done"),
      allowNull: false,
      defaultValue: "todo",
    },
    projectId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "projects",
        key: "id",
      },
    },
    assigneeId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    priority: {
      type: DataTypes.ENUM("low", "medium", "high"),
      allowNull: false,
      defaultValue: "low",
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "tasks",
    timestamps: true,
  },
);

export default Task;
