import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

export const usePreviousRouteUrl = () => {
    const [prevLocation, setPrevLocation] = useState<any>({})
    const location = useLocation()
    useEffect(() => {
        if (location.pathname !== prevLocation.pathname) {
            setPrevLocation(location)
        }
    }, [location, prevLocation.pathname])

    return prevLocation
}