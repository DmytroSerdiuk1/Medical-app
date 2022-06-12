import {IUser} from "../../interfaces/IUser";

export interface  IConsultation {
    id?: number,
    image?: string,
    description?: string,
    doctors?: IUser[],
    title?: string,
    duration_minutes?: number,
    available_time?: {
        day?: string,
        receptions?: string[]
    }
}

export interface IReceptions {
    id: number
    is_available: boolean
    time: string
}

export interface  ISchedule {
    day: string,
    is_available: boolean,
    receptions: IReceptions[]
}

export interface IConsultationReducerInterface {
    consultation: IConsultation,
    consultations: IConsultation[],
    consultationCalendar: ISchedule[],
    currentDoctorId: number | null
}