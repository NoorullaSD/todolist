
import { useEffect, useContext, useState } from 'react';
import { MyAppContext } from "./context";
// Components
import Today from './today';
import Calender from './calender';
import UpComing from "./upComing";
import NavBarTasks from './navBarTasks';
import NavBarLists from './navBarLists';

function ToDoList() {
    const { task, upComingList, setUpComingList, setEvents, setTodayList, setWork, todayList } = useContext(MyAppContext);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const quickTask = [
        {
            id: 1,
            task: "Enter qiuck task 1",
            checked: false,
        },
        {
            id: 2,
            task: "Enter qiuck task 2",
            checked: false,
        },
        {
            id: 3,
            task: "Enter qiuck task 3",
            checked: false,
        },
    ]

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const userUpComingList = localStorage.getItem("userUpcomingList");
        const userTodayListList = localStorage.getItem("userTodayList");
        const userQuickTask = localStorage.getItem("quickTask");
        const storedEvents = JSON.parse(localStorage.getItem("calendarEvents")) || [];
        setEvents(storedEvents);
        try {
            const parsedList = JSON.parse(userUpComingList);
            if (Array.isArray(parsedList)) {
                setUpComingList(parsedList);
            } else {
                setUpComingList([]);
            }
        } catch {
            setUpComingList([]);
        }
        try {
            const parsedTodayList = JSON.parse(userTodayListList);
            if (Array.isArray(parsedTodayList)) {
                setTodayList(parsedTodayList);
            } else {
                setTodayList([]);
            }
        } catch {
            setTodayList([]);
        }
        try {
            const parsedTask = JSON.parse(userQuickTask);
            if (Array.isArray(parsedTask) && parsedTask.length) {
                setWork(parsedTask);
            } else {
                setWork(quickTask);
            }
        }
        catch {
            setWork(quickTask);
        }
    }, []);

    return (
        <div className="container-fluid m-0">
            <div className="row full-container">
                <div className="col-2 drawer_container" style={{ height: "96vh", overflowY: "auto" }}>
                    <div className="intro mb-5" >
                        {
                            windowWidth > 800 &&
                            <p className="menu_text poppinsHeadText mb-0" >Noor To Do List</p>
                        }
                        {
                            windowWidth < 800 &&
                            <div className="d-flex justify-content-center" style={{ width: "100%" }}>
                                <button
                                    className="btn"
                                    type="button"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#mobileDrawer"
                                >
                                    ☰
                                </button>
                            </div>
                        }
                    </div>
                    {
                        windowWidth > 800 &&
                        <>
                            <NavBarTasks upCominTasks={upComingList?.length} todayTasks={todayList?.length} />
                            <NavBarLists />
                        </>
                    }

                    <div
                        className="offcanvas offcanvas-start"
                        tabIndex="-1"
                        id="mobileDrawer"
                        style={{ background: "#f0f0f0" }}
                    >
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title">Noor to do list</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="offcanvas"
                            ></button>
                        </div>
                        <div className="offcanvas-body">
                            <NavBarTasks upCominTasks={upComingList?.length} todayTasks={todayList?.length} />
                            <NavBarLists />
                        </div>
                    </div>
                </div >
                {
                    task == "Upcoming"
                        ?
                        <UpComing />
                        :
                        task == "Today" ?
                            <Today />
                            :
                            <Calender />
                }
            </div>
        </div >
    )
}

export default ToDoList;