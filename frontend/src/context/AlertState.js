import React, { createContext, useState } from 'react'

export const AlertContext = createContext()

export function AlertProvider(props) {

    const [alertMsg, setAlertMsg] = useState('')

    return (
        <AlertContext.Provider value={{ alertMsg, setAlertMsg }}>
            {props.children}
        </AlertContext.Provider>
    )
}