import { User } from "../store/db";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
