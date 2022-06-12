import {useDispatch, useSelector} from "react-redux";
import {IReducerInterface} from "../store/reducerInterface";
import {getUserInformation} from "../store/app/appAction";
import {useEffect} from "react";
import {useHistory} from "react-router-dom";

export const useAuth = () => {
    const dispatch = useDispatch()
    const {app} = useSelector((state: IReducerInterface) => state)
    const {push} = useHistory()
    useEffect(() => {
        if (app.isLogin) {
            dispatch(getUserInformation())
        }
    }, [app.isLogin, dispatch, push])

    return {
        isLogin: app.isLogin,
        userInformation: app.userInformation,
    }
};
