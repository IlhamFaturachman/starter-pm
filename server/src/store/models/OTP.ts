import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";

export interface OTPAttributes {
  email: string;
  code: string;
  expiresAt: Date;
  /** @deprecated Leftover from a planned OTP Signup flow that was never implemented. Do not use. */
  tempUser: Record<string, unknown> | null;
  attempts: number;
}

class OTP extends Model<OTPAttributes> implements OTPAttributes {
  declare email: string;
  declare code: string;
  declare expiresAt: Date;
  /** @deprecated Leftover from a planned OTP Signup flow that was never implemented. Do not use. */
  declare tempUser: Record<string, unknown> | null;
  declare attempts: number;

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
    /** @deprecated Leftover from a planned OTP Signup flow that was never implemented. Do not use. */
    tempUser: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    attempts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "otps",
    timestamps: true,
  },
);

export default OTP;
