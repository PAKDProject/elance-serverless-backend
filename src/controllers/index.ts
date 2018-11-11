import { UserController } from "./UserController";
import { LoginController } from "./LoginController";
import { JobController } from "./JobController";
import { NewUserController } from "./NewUserController";

// All backend routes listed below
export default [
    new LoginController(),
    new UserController(),
    new JobController(),

    new NewUserController()
]