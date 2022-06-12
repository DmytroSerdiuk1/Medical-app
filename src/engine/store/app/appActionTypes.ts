import actionTypeCreator from "../../helpers/actionCreator";

export const AppActionTypes = {
    CHECK_TOKEN: actionTypeCreator("CHECK_TOKEN"),
    LOGIN: actionTypeCreator("LOGIN"),
    REGISTER: actionTypeCreator("REGISTER"),
    REFRESH: actionTypeCreator("REFRESH"),
    VERIFY: actionTypeCreator("VERIFY"),
    LOG_OUT: actionTypeCreator("LOG_OUT"),
    GET_USER_INFORMATION: actionTypeCreator("GET_USER_INFORMATION"),
}