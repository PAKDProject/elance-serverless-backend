import { HelloController } from "./HelloWorldController";
import { UserController } from "./UserController";

// All backend routes listed below
export default [
    new HelloController(),
    new UserController()
]