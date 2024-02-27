import React, { Children, createContext, useState } from 'react'

export const addProjectResponseContext = createContext()
export const editProjectResponseContext = createContext();
export const isAuthTokenContext = createContext();

function ContextShare({ children }) {
    // children is a predefined used to share data between components
    // create a state that need to be shared
    const [addProjectResponse, setAddProjectResponse] = useState({})
    const [editProjectResponse, setEditProjectResponse] = useState({})
    const [isAuthToken, setIsAuthToken] = useState(false)
    return (
        <>
            <addProjectResponseContext.Provider value={{ addProjectResponse, setAddProjectResponse }}>
                <editProjectResponseContext.Provider value={{ editProjectResponse, setEditProjectResponse }}>
                    <isAuthTokenContext.Provider value={{ isAuthToken, setIsAuthToken }}>
                        {children}
                    </isAuthTokenContext.Provider>
                </editProjectResponseContext.Provider>
            </addProjectResponseContext.Provider>
        </>
    )
}

export default ContextShare