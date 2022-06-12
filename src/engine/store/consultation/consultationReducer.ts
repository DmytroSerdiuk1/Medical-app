import {IAction} from "../../interfaces/IAction"
import {IConsultationReducerInterface} from "./consultationReducerInterface"
import {ConsultationActionTypes} from "./consultationActionTypes";

const initialState: IConsultationReducerInterface = {
    consultations: [],
    currentDoctorId: null,
    consultation: {},
    consultationCalendar: []
}

const reducer = (state = initialState, action: IAction<any>): IConsultationReducerInterface => {
    switch (action.type) {
        case ConsultationActionTypes.GET_CONSULTATIONS.SUCCESS:
            return {
                ...state,
                consultations: [...action.payload]
            }
        case ConsultationActionTypes.GET_CONSULTATION.SUCCESS:
            return {
                ...state,
                consultation: action.payload
            }
        case ConsultationActionTypes.GET_CALENDAR.SUCCESS:
            return {
                ...state,
                currentDoctorId: action.payload.doctorId,
                consultationCalendar: [...action.payload.data]
            }
        default:
            return state
    }
}

export default reducer