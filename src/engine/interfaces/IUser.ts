import {Role} from "../enum/Role";

export interface IUser {
    avatar?: string
    birthday?: string
    code?: string
    code_expiration?: string
    count_appointment?: string
    created_at?: string
    email?: string
    first_name?: string
    gender?: any
    id?: number
    last_login?: string
    last_name?: string
    number_conducted_consultations?: number
    patronymic?: string
    phone?: string
    role?: Role
    specialty?: string
    years_experience?: number
}