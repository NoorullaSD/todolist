
import { useEffect, useContext } from 'react';
import { IoMenu, IoSearch } from "react-icons/io5";
import { MyAppContext } from "./context";
// Components
import Tags from './tags';
import Today from './today';
import Calender from './calender';
import UpComing from "./UpComing";
import StickyWall from './stickyWall';
import NavBarTasks from './navBarTasks';
import NavBarLists from './navBarLists';

function ToDoList() {
    const { task, upComingList, setUpComingList, setEvents } = useContext(MyAppContext);

    useEffect(() => {
        const userUpComingList = localStorage.getItem("userUpcomingList");
        let userEvent = localStorage.getItem("calendarEvents");
        setEvents(JSON.parse(userEvent))
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
    }, []);

    return (
        <div className="container-fluid m-0">
            <div className="row full-container">
                <div className="col-2 drawer_container" style={{ height: "96vh" }}>
                    <div className="intro" >
                        <h6 className="menu_text" >Noor To Do List</h6>
                        <IoMenu />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><IoSearch /></span>
                        <input type="text" className="form-control" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <NavBarTasks upCominTasks={upComingList?.length} />
                    <NavBarLists />
                    <Tags />
                </div >
                {
                    task == "Upcoming"
                        ?
                        <UpComing />
                        :
                        task == "Today" ?
                            <Today />
                            :
                            task == "Calender" ?
                                <Calender />
                                :
                                task == "Sticky Wall" ?
                                    <StickyWall />
                                    :
                                    null
                }
            </div>
        </div >
    )
}

export default ToDoList;