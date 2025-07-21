import { MyAppContext } from "./context";
import { useState, useContext, useEffect } from "react"
import { FaListCheck } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function NavBarTasks(props) {

    let tempList = [
        {
            id: 1,
            title: "Upcoming",
            icon: <MdKeyboardDoubleArrowRight />,
            count: props?.upCominTasks
        },
        {
            id: 2,
            title: "Today",
            icon: <FaListCheck />,
            count: 5
        },
        {
            id: 3,
            title: "Calender",
            icon: <FaCalendarAlt />,
            count: 0
        },
        {
            id: 4,
            title: "Sticky Wall",
            icon: <MdOutlineStickyNote2 />,
            count: 0
        }
    ]
    const [list, setList] = useState(tempList)
    const { task, setTask, events, setEvents } = useContext(MyAppContext);


    useEffect(() => {
        setList(tempList)
    }, [props])


    return (
        <div className="list-container">
            <h6 className="list-tittle">
                Tasks
            </h6>
            <ul className="list-group list-group-flush">
                {
                    list.map((item, index) => {
                        return (
                            <div key={index} className="listcontainer" style={{ backgroundColor: task == item?.title ? '#ccccccff' : '#f0f0f0', borderRadius: "6px", paddingLeft: "5px", paddingRight: "5px" }}>
                                <a onClick={() => setTask(item?.title)} href='#' className='link-offset-2 link-underline link-underline-opacity-0 list-item'>
                                    <span style={{ color: 'rgb(61, 60, 60)' }}>
                                        {item?.icon}
                                    </span>
                                    <li className="list-group-item" style={{ backgroundColor: task == item?.title ? '#ccccccff' : '#f0f0f0', color: 'rgb(61, 60, 60)' }} >
                                        {item?.title}
                                    </li>
                                </a>
                                {
                                    item?.count > 0 &&
                                    <span className="badge rounded-pill" >
                                        {item?.count}
                                    </span>
                                }
                                {item?.title == "Calender" && events.length > 0 &&
                                    < MdDelete size={22} style={{ cursor: 'pointer' }} color="rgba(255, 0, 0, 0.5)"
                                        onClick={() => {
                                            const confirm = window.confirm("Do you want to delete all events?");
                                            if (confirm) {
                                                setEvents([])
                                            }
                                        }}
                                    />
                                }
                            </div>
                        )
                    })
                }
            </ul>
        </div>
    )
}
export default NavBarTasks