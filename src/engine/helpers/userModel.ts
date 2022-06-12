import {IUser} from "../interfaces/IUser";
import {Role} from "../enum/Role";

class UserModel {
    userIsPatient (user: IUser) {
        return user.role === Role.Patient
    }
    userIsDoctor (user: IUser) {
        return user.role === Role.Doctor
    }
}

export default new UserModel()