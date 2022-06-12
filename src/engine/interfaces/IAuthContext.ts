import {Role} from "../enum/Role";

export interface IAuthContext {
    isLogin: boolean;
    role?: Role
}