import React, {FC} from 'react';
import {useAuth} from "../../../engine/hooks/useAuth";
import {Redirect, Route} from "react-router-dom";
import {PATH} from '../../../engine/enum/Path';

interface IProps {
    path: string,
    component: any,
    isProtected?: boolean,
    exact?: boolean,
}

const ProtectRoute: FC<IProps> = ({path, exact, component, isProtected}) => {
    const {isLogin} = useAuth()

    return <Route exact={exact} path={path} render={
        () => {
            if (!isLogin && isProtected) {
                debugger
                return <Redirect to={PATH.LOGIN}/>
            }
            return component
        }
    }/>
};

export default ProtectRoute;