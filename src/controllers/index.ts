import { UserController } from "./UserController";
import { LoginController } from "./LoginController";
import { JobController } from "./JobController";

// All backend routes listed below
export default [
    new LoginController(),
    new UserController(),
    new JobController(),
]