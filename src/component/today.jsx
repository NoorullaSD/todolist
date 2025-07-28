import { useState, useContext, useEffect } from "react"
import { MyAppContext } from "./context";
import todayImages from "../assets/images/today.png"
import AddEvents from "./addEvents";
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdOutlineTimer } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";

function Today() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const { setTodayList, todayList } = useContext(MyAppContext);
    const [todayTempList, setTodayTempList] = useState([{
        id: 0,
        title: "",
        description: ""
    }]);

    const [isOpen, setIsOpen] = useState(false);
    const [saveEdit, setSaveEdit] = useState(false);


    const handleTitleChange = (e) => {
        const updatedList = [...todayTempList];
        updatedList[0].title = e.target.value;
        setTodayTempList(updatedList);
    };

    const handleMessageChange = (e) => {
        const text = e.target.value.slice(0, 400); // trims if pasted > 400
        const updatedList = [...todayTempList];
        updatedList[0].description = text;
        setTodayTempList(updatedList);
    };

    function clearAll() {
        localStorage.removeItem("userTodayList");
        setTodayList([])
    }

    function save() {
        if (saveEdit) {
            const updatedItem = todayTempList[0];
            const updatedList = todayList.map(item => {
                if (item.id === updatedItem.id) {
                    return { ...item, ...updatedItem }; // Replace with new data
                }
                return item;
            });
            setTodayList(updatedList);
            localStorage.setItem("userTodayList", JSON.stringify(updatedList));
            setSaveEdit(false)
        }
        else {
            const now = new Date();
            const newTask = {
                ...todayTempList[0],
                id: todayList.length + 1,
                date: now.toLocaleDateString(),     // e.g., "7/15/2025"
                time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // e.g., "10:47 PM"
            };
            if (!newTask.title.trim() && !newTask.description.trim()) return;
            const updatedList = [...todayList, newTask];
            setTodayList(updatedList);
            localStorage.setItem("userTodayList", JSON.stringify(updatedList));
        }
        setTodayTempList([{
            id: 0,
            title: "",
            description: ""
        }]);
        setIsOpen(false);
    }


    function edit(id) {
        const now = new Date();
        let editList = todayList.find((item) => item?.id == id)
        const updatedList = [...todayTempList];
        updatedList[0].id = editList?.id;
        updatedList[0].colo = editList?.color;
        updatedList[0].title = editList?.title;
        updatedList[0].description = editList?.description;
        updatedList[0].date = now.toLocaleDateString(),
            updatedList[0].time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        setTodayTempList(updatedList);
        setSaveEdit(true)
        setIsOpen(true)
    }

    function deleteTodoList(id) {
        let newList = todayList.filter((item) => item?.id != id)
        setTodayList(newList)
        localStorage.setItem("userTodayList", JSON.stringify(newList));
    }

    return (
        <div className="col-10" >
            <div style={{ backgroundColor: "#f0f0f0", borderRadius: "10px", padding: "10px", height: "96vh", overflowY: "auto" }} >
                <div className="upcomingHeader" style={{ display: "flex", justifyContent: "space-between", paddingRight: "10px" }}>
                    <h2 style={{ marginLeft: "10px" }}>Today</h2>
                    {
                        todayList.length > 0 &&
                        <button className="btn" onClick={clearAll}>Clear All</button>
                    }
                </div>
                {
                    todayList.length > 0 ?
                        <div className="container-fluid info">
                            {
                                todayList?.map((item, index) => {
                                    return (
                                        <div key={index} className="col-lg-4 col-md-6 col-sm-12 col-12">
                                            <div className="card-container" style={{ backgroundColor: "#F9E4C8", marginRight: windowWidth < 576 ? "0px" : "10px", marginLeft: windowWidth < 576 ? "0px" : "10px" }}>
                                                <div>
                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <p style={{ fontSize: "12px", color: "#555", }}>Date: {item.date}</p>
                                                        <div>
                                                            <MdEditSquare style={{ cursor: 'pointer' }} color="#2E2E2E" size={22} onClick={() => { edit(item?.id) }} />
                                                            <MdDelete color="rgba(255, 0, 0, 0.5)" style={{ cursor: 'pointer' }} size={22} onClick={() => { deleteTodoList(item?.id) }} />
                                                        </div>
                                                    </div>
                                                    <h3 style={{ color: "#2E2E2E", fontSize: "18px", fontWeight: 'bold' }}>{item?.title}</h3>
                                                    <hr className="styled-line" />
                                                    <p style={{ color: "#2E2E2E", fontSize: "14px", marginTop: "10px" }}>{item?.description}</p>
                                                </div>
                                                <div style={{ display: "flex", justifyContent: "start" }}>
                                                    <MdOutlineTimer />
                                                    <p style={{ fontSize: "12px", color: "#555", paddingLeft: "5px" }}>Time: {item.time}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div className="col-lg-4 col-md-6 col-sm-12" style={{ display: "flex", justifyContent: "center", alignItems: "center", opacity: 0.5, height: "40vh", width: "50vh" }} onClick={() => setIsOpen(true)}>
                                <CiCirclePlus size={"100px"} style={{ marginLeft: "-20px", cursor: 'pointer' }} opacity={0.5} />
                            </div>
                        </div>
                        :
                        <div style={{ display: "flex", height: "90%", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            <img src={todayImages} style={{ width: windowWidth < 576 ? "20vh" : "40vh", height: windowWidth < 576 ? "20vh" : "35vh" }} alt="BigCo Inc. logo" />
                            <h4 style={{ marginTop: "10px", fontSize: windowWidth < 576 && "16px" }}>Nothing to do... yet</h4>
                            <p style={{ marginTop: "20px", fontSize: windowWidth < 576 && "12px", textAlign: "center" }}>Stay focused by scheduling today tasks.</p>
                            <button type="button" style={{ marginTop: "20px", fontSize: windowWidth < 576 && "12px", width: windowWidth < 576 && "30vh", height: windowWidth < 576 && "5vh" }} className="btn btn-outline-dark btn-radius rounded-pill" onClick={() => setIsOpen(true)} >Add New Today Task</button>
                        </div>
                }
                <AddEvents setIsOpen={setIsOpen} isOpen={isOpen} saveEdit={saveEdit} upComingTempList={todayTempList} handleTitleChange={handleTitleChange} handleMessageChange={handleMessageChange} save={save} />

            </div>
        </div>
    )

}
export default Today