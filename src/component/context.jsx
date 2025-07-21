// context/MyAppContext.js
import React, { createContext, useState } from "react";

// Create context
export const MyAppContext = createContext();

// Provider component
export const MyAppProvider = ({ children }) => {
    const [task, setTask] = useState("Upcoming");
    const [upComingList, setUpComingList] = useState([]);
    const [events, setEvents] = useState([]);


    return (
        <MyAppContext.Provider value={{ task, setTask, upComingList, setUpComingList, events, setEvents }}>
            {children}
        </MyAppContext.Provider>
    );
};
