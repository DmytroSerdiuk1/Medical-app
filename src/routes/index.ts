import Consultation from "../page/patientPages/Consultation";
import Login from "../page/authPages/Login";
import Record from "../page/patientPages/Record";
import Register from "../page/authPages/Register";

const LOGIN = {
    component: Login,
    path: '/login',
    protect: false
}
const REGISTER = {
    component:  Register,
    path: '/register',
    protect: false
}
const CONSULTATION = {
    component: Consultation,
    path: '/consultation',
    protect: false
}
const RECORD = {
    component: Record,
    path: '/consultations/:consultationsId/record',
    protect: false
}

export default [LOGIN, REGISTER, CONSULTATION, RECORD]