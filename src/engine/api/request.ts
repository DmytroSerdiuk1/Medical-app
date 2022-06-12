import axios from "axios";
import {Global} from "../enum/Global";
import {store} from "../store/store";
import {refresh} from "../store/app/appAction";



class RequestGlobal {

    request() {
        const access = localStorage.getItem('access')
        const request = axios.create({
            baseURL: Global.SERVER_URL,
            headers: {
                'Authorization': `Bearer ${access}`
            }
        })
        request.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            if (401 === error.response.status) {
                localStorage.removeItem('access')
                store.dispatch(refresh())
            } else {
                return Promise.reject(error);
            }
        });
        return request
    }
}

export default new RequestGlobal()