import {ConsultationActionTypes} from "./consultationActionTypes";
import {Global} from "../../enum/Global";
import {Dispatch} from "redux";
import RequestGlobal from "../../api/request";
import {IUser} from "../../interfaces/IUser";
import history from "../../helpers/history";
import {PATH} from "../../enum/Path";

export const getConsultations = (limit = 20, page = 1): any => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: ConsultationActionTypes.GET_CONSULTATIONS.REQUEST
        })
        await RequestGlobal.request().get(`${Global.SERVER_URL}/consultations/`, {
            params: {
                limit,
                page
            }
        }).then(res => {
            dispatch({
                type: ConsultationActionTypes.GET_CONSULTATIONS.SUCCESS,
                payload: res.data.results
            })
        }).catch(error => {
            dispatch({
                type: ConsultationActionTypes.GET_CONSULTATIONS.ERROR,
                payload: error
            })
        })
    }
};
export const getConsultation = (id: number): any => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: ConsultationActionTypes.GET_CONSULTATION.REQUEST
        })
        await RequestGlobal.request().get(`${Global.SERVER_URL}/consultations/${id}/`).then(res => {
            dispatch({
                type: ConsultationActionTypes.GET_CONSULTATION.SUCCESS,
                payload: res.data
            })
        }).catch(error => {
            dispatch({
                type: ConsultationActionTypes.GET_CONSULTATION.ERROR,
                payload: error
            })
        })
    }
};

export const viewCalendar = (id: number | undefined): any => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: ConsultationActionTypes.GET_CALENDAR.REQUEST
        })
        await RequestGlobal.request().get(`${Global.SERVER_URL}/schedule/view/client/`, {
            params: {
                doctor: id
            }
        }).then(res => {
            dispatch({
                type: ConsultationActionTypes.GET_CALENDAR.SUCCESS,
                payload: {
                    doctorId: id,
                    data: res.data
                }
            })
        }).catch(error => {
            dispatch({
                type: ConsultationActionTypes.GET_CALENDAR.ERROR,
                payload: error
            })
        })
    }
};
export const sendAppointment = (data: any): any => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: ConsultationActionTypes.SEND_APPOINTMENT.REQUEST
        })
        await RequestGlobal.request().post(`${Global.SERVER_URL}/appointments/`, data).then(res => {
            dispatch({
                type: ConsultationActionTypes.SEND_APPOINTMENT.SUCCESS,
                payload: res.data
            })
            history.replace(PATH.CONSULTATIONS)
        }).catch(error => {
            dispatch({
                type: ConsultationActionTypes.SEND_APPOINTMENT.ERROR,
                payload: error
            })
        })
    }
};
