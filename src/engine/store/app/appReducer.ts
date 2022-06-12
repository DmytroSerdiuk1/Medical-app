import {IAction} from "../../interfaces/IAction"
import {IAppReducerInterface} from "./appReducerInterface"
import {AppActionTypes} from "./appActionTypes";

const initialState: IAppReducerInterface = {
    isLogin: true,
    userInformation: {},
}

const reducer = (state = initialState, action: IAction<any>): IAppReducerInterface => {
    switch (action.type) {
        case AppActionTypes.LOGIN.SUCCESS:
        case AppActionTypes.REGISTER.SUCCESS:
        case AppActionTypes.REFRESH.SUCCESS:
            return {
                ...state,
                isLogin: true,
            }
        case AppActionTypes.LOGIN.ERROR:
        case AppActionTypes.REGISTER.ERROR:
            return {
                ...state,
                isLogin: false,
            }
        case AppActionTypes.VERIFY.SUCCESS:
            return {
                ...state,
                isLogin: true,
            }
        case AppActionTypes.VERIFY.ERROR:
            return {
                ...state,
                isLogin: false,
            }
        case AppActionTypes.GET_USER_INFORMATION.SUCCESS:
            return {
                ...state,
                userInformation: action.payload
            }
        case AppActionTypes.LOG_OUT.SUCCESS:
            return {
                ...state,
                isLogin: false
            }
        case AppActionTypes.CHECK_TOKEN.SUCCESS:
            return {
                ...state,
                isLogin: true,
                userInformation: {},
            }
        case AppActionTypes.CHECK_TOKEN.ERROR:
            return {
                ...state,
                isLogin: false
            }
        default:
            return state
    }
}

export default reducer