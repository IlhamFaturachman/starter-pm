import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";

export interface OTPAttributes {
  email: string;
  code: string;
  expiresAt: Date;
  tempUser: Record<string, unknown> | null;
}

class OTP extends Model<OTPAttributes> implements OTPAttributes {
  declare email: string;
  declare code: string;
  declare expiresAt: Date;
  declare tempUser: Record<string, unknown> | null;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

OTP.init(
  {
    email: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tempUser: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "otps",
    timestamps: true,
  },
);

export default OTP;
