import { UserController } from "./UserController";
import { LoginController } from "./LoginController";

// All backend routes listed below
export default [
    new UserController(),
    new LoginController()
]