import { createContext, useContext, useEffect, useState } from 'react'
import axiosClient from '../axiosClient'


const stateContext = createContext({
    user: null,
    token: null,
    setUser: () => { },
    setToken: () => { },
    badgeCount: null,
    badgeCountRes: null,
    getPendingOrdersCount: () => {}
})

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [token, _setToken] = useState(localStorage.getItem(`ACCESS_TOKEN`))
    const [badgeCount, setBadgeCount] = useState()
    const [ badgeCountRes, setBadgeCountRes ] = useState()

    const setToken = (token) => {
        _setToken(token)
        if (token) {
            localStorage.setItem(`ACCESS_TOKEN`, token)
        }
        else {
            localStorage.removeItem(`ACCESS_TOKEN`)
        }
    }

    useEffect(() => {
      getPendingOrdersCount();
    }, []);

    // Badge notification logic
    const getPendingOrdersCount = async () => {
        try {
            const response = await axiosClient.get("/badge-notification")
            setBadgeCount(response.data.pending_orders);
            setBadgeCountRes(response.data.pending_res);
        } catch (err) {
            setBadgeCount(0)
        }
    }

    return (
        <stateContext.Provider value={{
            user,
            token,
            setUser,
            setToken,
            badgeCount,
            badgeCountRes,
            getPendingOrdersCount
        }}>
            {children}
        </stateContext.Provider>
    )
}

export const useStateContext = () => useContext(stateContext)
