import actionTypeCreator from "../../helpers/actionCreator";

export const ConsultationActionTypes = {
    GET_CONSULTATIONS: actionTypeCreator("GET_CONSULTATIONS"),
    GET_CONSULTATION: actionTypeCreator("GET_CONSULTATION"),
    GET_CALENDAR: actionTypeCreator("GET_CALENDAR"),
    SEND_APPOINTMENT: actionTypeCreator("SEND_APPOINTMENT"),
}