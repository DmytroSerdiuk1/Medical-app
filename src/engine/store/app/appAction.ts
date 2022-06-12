import {AppActionTypes} from "./appActionTypes";
import axios from "axios";
import {Global} from "../../enum/Global";
import {IAuthSendData} from "../../interfaces/IAuthSendData";
import {Dispatch} from "redux";
import RequestGlobal from "../../api/request";
import {PATH} from "../../enum/Path";
import history from "../../helpers/history";

export const login = (data: IAuthSendData, navigate: any): any => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: AppActionTypes.LOGIN.REQUEST
        })
        await axios.post(`${Global.SERVER_URL}/accounts/token/`, data).then((res) => {
            localStorage.setItem("access", res.data.access)
            localStorage.setItem("refresh", res.data.refresh)
            dispatch({
                type: AppActionTypes.LOGIN.SUCCESS,
                payload: res.data
            })
            navigate(PATH.CONSULTATIONS)
        }).catch(error => {
            dispatch({
                type: AppActionTypes.LOGIN.ERROR,
                payload: error
            })
        })
    }
};

export const register = (data: IAuthSendData, navigate: any): any => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: AppActionTypes.REGISTER.REQUEST,
        })
        await axios.post(`${Global.SERVER_URL}/accounts/register/`, data)
            .then((res) => {
                localStorage.setItem("access", res.data.access)
                localStorage.setItem("refresh", res.data.refresh)
                dispatch({
                    type: AppActionTypes.REGISTER.SUCCESS,
                    payload: res.data
                })
                navigate(PATH.CONSULTATIONS)
            })
            .catch(error => dispatch({
                type: AppActionTypes.REGISTER.ERROR,
                payload: error
            }))
    }
};
export const refresh = (): any => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: AppActionTypes.REFRESH.REQUEST,
        })
        await axios.post(`${Global.SERVER_URL}/accounts/token/refresh/`, {
            refresh: localStorage.getItem("refresh")
        })
            .then((res) => {
                localStorage.setItem("access", res.data.access)
                localStorage.setItem("refresh", res.data.refresh)
                dispatch({
                    type: AppActionTypes.REFRESH.SUCCESS,
                    payload: res.data
                })
            })
            .catch(error => dispatch({
                type: AppActionTypes.REFRESH.ERROR,
                payload: error
            }))
    }
};

export const verify = (token: any,): any => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: AppActionTypes.VERIFY.REQUEST,
        })
        await axios.post(`${Global.SERVER_URL}/accounts/token/verify/`, {
            token
        })
            .then(res => {
                dispatch({
                    type: AppActionTypes.VERIFY.SUCCESS,
                    payload: res.data
                })
                history.replace(PATH.CONSULTATIONS)
            })
            .catch(error => dispatch({
                type: AppActionTypes.VERIFY.ERROR,
                payload: error
            }))
    }
};
export const getUserInformation = (): any => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: AppActionTypes.GET_USER_INFORMATION.REQUEST,
        })
        await RequestGlobal.request().get(`${Global.SERVER_URL}/accounts/me/`,)
            .then(res => {
                dispatch({
                    type: AppActionTypes.GET_USER_INFORMATION.SUCCESS,
                    payload: res.data
                })
            })
            .catch(error => dispatch({
                type: AppActionTypes.GET_USER_INFORMATION.ERROR,
                payload: error
            }))
    }
};
export const logOut = (): any => {
    return async (dispatch: Dispatch) => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        dispatch({
            type: AppActionTypes.LOG_OUT.SUCCESS
        })
    }
};
export const checkTokenAction = (token: any): any => {
    return async (dispatch: Dispatch) => {
        if (token) {
            dispatch({
                type: AppActionTypes.CHECK_TOKEN.SUCCESS
            })
        }
        if (!token) {
            dispatch({
                type: AppActionTypes.CHECK_TOKEN.ERROR
            })
        }
    }
};