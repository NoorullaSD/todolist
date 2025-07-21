import { useEffect, useState, useContext } from "react"
import { CiCirclePlus } from "react-icons/ci";
import Modal from 'react-modal';
import { MdOutlineTimer } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import { MyAppContext } from "./context";
import { ImCross } from "react-icons/im";
Modal.setAppElement('#root');

function UpComing() {
    const { upComingList, setUpComingList } = useContext(MyAppContext);
    const [saveEdit, setSaveEdit] = useState(false);
    const [upComingTempList, setUpcominTempList] = useState([{
        id: 0,
        title: "",
        description: ""
    }]);

    const [isOpen, setIsOpen] = useState(false);
    const aestheticColors = [
        "#FFDACC", "#FFE4E1", "#FFF0F5", "#FFDACC", "#D6EBD4",
        "#D8A7B1", "#F9E4C8", "#A3B18A", "#DAD2D8", "#BFD8D2",
        "#D8A7B1", "#F9E4C8", "#A3B18A", "#DAD2D8", "#B28D8D"
    ];
    const customStyles = {
        content: {
            width: '500px',
            height: '400px',
            margin: 'auto', // center horizontally
            padding: '20px',
            borderRadius: '10px',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }
    };

    const getRandomAestheticColor = () => {
        return aestheticColors[Math.floor(Math.random() * aestheticColors.length)];
    };

    const handleTitleChange = (e) => {
        const updatedList = [...upComingTempList];
        updatedList[0].title = e.target.value;
        setUpcominTempList(updatedList);
    };

    const handleMessageChange = (e) => {
        const text = e.target.value.slice(0, 400); // trims if pasted > 400
        const updatedList = [...upComingTempList];
        updatedList[0].description = text;
        setUpcominTempList(updatedList);
    };

    function save() {
        if (saveEdit) {
            const updatedItem = upComingTempList[0];
            const updatedList = upComingList.map(item => {
                if (item.id === updatedItem.id) {
                    return { ...item, ...updatedItem }; // Replace with new data
                }
                return item;
            });
            setUpComingList(updatedList);
            localStorage.setItem("userUpcomingList", JSON.stringify(updatedList));
        }
        else {
            const now = new Date();
            const newTask = {
                ...upComingTempList[0],
                id: upComingList.length + 1,
                color: getRandomAestheticColor(),
                date: now.toLocaleDateString(),     // e.g., "7/15/2025"
                time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // e.g., "10:47 PM"
            };
            if (!newTask.title.trim() && !newTask.description.trim()) return;
            const updatedList = [...upComingList, newTask];
            setUpComingList(updatedList);
            localStorage.setItem("userUpcomingList", JSON.stringify(updatedList));
        }
        setUpcominTempList([{
            id: 0,
            title: "",
            description: ""
        }]);
        setIsOpen(false);
    }

    function edit(id) {
        const now = new Date();
        let editList = upComingList.find((item) => item?.id == id)
        const updatedList = [...upComingTempList];
        updatedList[0].id = editList?.id;
        updatedList[0].colo = editList?.color;
        updatedList[0].title = editList?.title;
        updatedList[0].description = editList?.description;
        updatedList[0].date = now.toLocaleDateString(),
            updatedList[0].time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        setUpcominTempList(updatedList);
        setSaveEdit(true)
        setIsOpen(true)
    }

    function deleteTodoList(id) {
        let newList = upComingList.filter((item) => item?.id != id)
        setUpComingList(newList)

    }

    function clearAll() {
        localStorage.removeItem("userUpcomingList");
        setUpComingList([])
    }

    return (
        <div className="col-10" >
            <div style={{ backgroundColor: "#f0f0f0", borderRadius: "10px", padding: "10px", height: "96vh", overflowY: "auto" }} >
                <div className="upcomingHeader" style={{ display: "flex", justifyContent: "space-between", paddingRight: "10px" }}>
                    <h2 style={{ marginLeft: "10px" }}>Upcoming</h2>
                    <button className="btn" onClick={clearAll}>Clear All</button>
                </div>
                <div className="container-fluid info">
                    {
                        upComingList?.map((item, index) => {
                            return (
                                <div key={index} className="col-lg-4 col-md-6 col-sm-12">
                                    <div className="card-container" style={{ backgroundColor: item.color || "#B28D8D" }}>
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
                    <div className="col-lg-4 col-md-6 col-sm-12" style={{ display: "flex", justifyContent: "center", alignItems: "center", opacity: 0.5 }} onClick={() => setIsOpen(true)}>
                        <CiCirclePlus size={"100px"} style={{ marginLeft: "-20px", cursor: 'pointer' }} opacity={0.5} />
                    </div>
                </div>
            </div>
            <Modal isOpen={isOpen} style={customStyles} onRequestClose={() => setIsOpen(false)}>
                <div className='enter-container'>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h4>{saveEdit ? "Edit your task here!" : "Enter your task here!"}</h4>
                        <ImCross style={{ marginBottom: "5px", cursor: 'pointer' }} onClick={() => setIsOpen(false)} />
                    </div>
                    <div style={{ marginTop: "20px" }}>
                        <div>
                            <input type="text" value={upComingTempList[0].title} placeholder="Title" className="input_title" onChange={handleTitleChange} />
                            <div className='mt-2'>
                                <textarea
                                    value={upComingTempList[0].description}
                                    placeholder="Enter your message"
                                    className="message-input-box"
                                    onChange={handleMessageChange}
                                    maxLength={200}
                                />
                            </div>
                        </div>
                        <button style={{ border: "0px", width: "100%", height: "40px", marginTop: "38px" }} className='save_button' onClick={save}>{saveEdit ? "Edit" : "Save"}</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default UpComing