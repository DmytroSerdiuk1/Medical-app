import React, {useEffect} from 'react';
import Login from "./page/authPages/Login";
import {useAuth} from "./engine/hooks/useAuth";
import {Switch} from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute/ProtectRoute";
import Register from "./page/authPages/Register";
import {PATH} from "./engine/enum/Path";
import {checkTokenAction} from "./engine/store/app/appAction";
import Consultation from "./page/patientPages/Consultation";
import Record from "./page/patientPages/Record";
import {useDispatch} from "react-redux";
import Profile from "./page/globalPages/Profile";
import userModel from "./engine/helpers/userModel";


function App() {
    const {userInformation, isLogin} = useAuth();
    const dispatch = useDispatch()
    const accessToken = localStorage.getItem("access")
    useEffect(() => {
        dispatch(checkTokenAction(accessToken))
    }, [accessToken, dispatch])

    return (
       <>
           {
               !isLogin ? <Switch>
                   <ProtectRoute path={PATH.LOGIN} isProtected={false} component={<Login/>}/>
                   <ProtectRoute path={PATH.REGISTER} isProtected={false} component={<Register/>}/>
               </Switch> : null
           }

           {
               userModel.userIsPatient(userInformation) ? <Switch>
                   <ProtectRoute path={PATH.RECORD} isProtected={true} exact={true} component={<Record/>}/>
                   <ProtectRoute path={PATH.MY_PROFILE} isProtected={true} exact={true}
                                 component={<Profile/>}/>
                   <ProtectRoute path={PATH.CONSULTATIONS} isProtected={true} exact={true}
                                 component={<Consultation/>}/>
               </Switch> : null
           }
           {
               userModel.userIsDoctor(userInformation) ? <Switch>
                   <ProtectRoute path={PATH.CONSULTATIONS} isProtected={true} exact={true}
                                 component={<Consultation/>}/>
               </Switch> : null
           }
       </>

    );
}

export default App;
