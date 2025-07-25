// context/MyAppContext.js
import React, { createContext, useState } from "react";

// Create context
export const MyAppContext = createContext();

// Provider component
export const MyAppProvider = ({ children }) => {
    const [task, setTask] = useState("Upcoming");
    const [upComingList, setUpComingList] = useState([]);
    const [todayList, setTodayList] = useState([]);
    const [events, setEvents] = useState([]);
    const [colors, setColors] = useState()
    const [work, setWork] = useState([])
    return (
        <MyAppContext.Provider value={{ task, setTask, upComingList, setUpComingList, todayList, setTodayList, events, setEvents, setColors, colors, setWork, work }}>
            {children}
        </MyAppContext.Provider>
    );
};
