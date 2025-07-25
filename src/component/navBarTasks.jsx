import { MyAppContext } from "./context";
import { useState, useContext, useEffect } from "react"
import { FaListCheck } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function NavBarTasks(props) {

    let tempList = [
        {
            id: 1,
            title: "Upcoming",
            icon: <MdKeyboardDoubleArrowRight className="taskIcon" color='rgb(61, 60, 60)' />,
            count: props?.upCominTasks,
        },
        {
            id: 2,
            title: "Today",
            icon: <FaListCheck className="taskIcon" color='rgb(61, 60, 60)' />,
            count: props?.todayTasks,
        },
        {
            id: 3,
            title: "Calender",
            icon: <FaCalendarAlt className="taskIcon" color='rgb(61, 60, 60)' />,
            count: 0
        },
    ]
    const [list, setList] = useState(tempList)

    const { task, setTask, events, setEvents } = useContext(MyAppContext);
    const width = useWindowWidth();
    function useWindowWidth() {
        const [width, setWidth] = useState(window.innerWidth);


        useEffect(() => {
            const handleResize = () => setWidth(window.innerWidth);
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);

        return width;
    }


    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    useEffect(() => {
        setList(tempList)
    }, [props])


    return (
        <div className="list-container">
            <p className="poppinsHeadText" >Tasks</p>
            <ul className="list-group list-group-flush poppinsSubHeadText">
                {
                    list.map((item, index) => {
                        return (
                            <div key={index} className="listcontainer mb-2  p-2 " style={{ backgroundColor: task == item?.title ? '#ccccccff' : '#f0f0f0' }}>
                                <div
                                    data-bs-dismiss="offcanvas"
                                    onClick={() => setTask(item?.title)}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        cursor: "pointer",
                                    }}
                                >
                                    <span style={{ display: "flex", alignItems: "center" }}>
                                        {item?.icon}
                                    </span>
                                    <p className="mb-0">{item?.title}</p>
                                </div>
                                {
                                    item?.count > 0 &&
                                    <span className="badge rounded-pil" >
                                        {item?.count}
                                    </span>
                                }
                                {item?.title == "Calender" && events?.length > 0 &&
                                    < MdDelete size={22} style={{ cursor: 'pointer' }} color="rgba(255, 0, 0, 0.5)"
                                        onClick={() => {
                                            const confirm = window.confirm("Do you want to delete all events?");
                                            if (confirm) {
                                                setEvents([])
                                                localStorage.removeItem("calendarEvents");
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