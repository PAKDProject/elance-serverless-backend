import { HelloController } from "./HelloController";
import { UserController } from "./UserController";
import { LoginController } from "./LoginController";

// All backend routes listed below
export default [
    new HelloController(),
    new UserController(),
    new LoginController()
]