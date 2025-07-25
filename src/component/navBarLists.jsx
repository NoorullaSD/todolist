import { useState, useEffect, useContext } from "react"
import { CiCirclePlus } from "react-icons/ci";
import { MdEditSquare } from "react-icons/md";
import Modal from 'react-modal';
import { MdDelete } from "react-icons/md";
import { MyAppContext } from "./context";
Modal.setAppElement('#root');

function NavBarLists() {

    const { work, setWork } = useContext(MyAppContext);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const customStyles = {
        content: {
            width: windowWidth < 576 ? '40vh' : '80vh',
            height: windowWidth < 576 ? '30vh' : '30vh',
            margin: 'auto',
            padding: '20px',
            borderRadius: '10px',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 5
        }
    };
    const [taskModal, setTaskModal] = useState(false)
    const [selectedTask, setSelectedTask] = useState()
    const [upcomingTempTask, setupcomingTempTask] = useState([{
        id: 0,
        task: "",
        checked: false,
    }])

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const handleChecked = (index) => {
        const updatedList = [...work];
        updatedList[index].checked = !updatedList[index]?.checked;
        setWork(updatedList);
        localStorage.setItem("quickTask", JSON.stringify(updatedList));
    }
    const handleTaskChange = (e) => {
        const updatedList = [...upcomingTempTask];
        updatedList[0].id = selectedTask?.id
        updatedList[0].task = e.target.value;
        setupcomingTempTask(updatedList);
    };

    function add() {
        let temp = []
        const addTask = {
            id: work?.length + 1,
            task: `Enter quick task ${work?.length + 1}`,
            checked: false,
        }
        temp.push(...work, addTask)
        setWork(temp)
    }

    function deleteTask(id) {
        let deletedTask = work.filter((item) => item?.id != id)
        setWork(deletedTask)
        localStorage.setItem("quickTask", JSON.stringify(deletedTask));
    }

    function edit() {
        const updatedItem = upcomingTempTask[0];
        const updatedList = work.map(item => {
            if (item.id === updatedItem.id) {
                return { ...item, ...updatedItem }; // Replace with new data
            }
            return item;
        });
        setWork(updatedList);
        setTaskModal(false)
        localStorage.setItem("quickTask", JSON.stringify(updatedList));
    }

    return (
        <div className="list-container work-container">
            <p className="poppinsHeadText" >Quick Task</p>
            <ul className="list-group list-group-flush">
                {
                    work.map((item, index) => {
                        return (
                            <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: 'center', marginBottom: "10px" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        cursor: "pointer",
                                    }}
                                >
                                    <input className="form-check-input" checked={item?.checked} type="checkbox" id="defaultCheck1" onChange={() => handleChecked(index)} />
                                    <span style={{ display: "flex", alignItems: "center" }}>
                                        <p className="form-check-label poppinsSubHeadText mb-0 truncate-text" htmlFor="defaultCheck1" >{item?.task}</p>
                                    </span>
                                    <p className="mb-0">{item?.title}</p>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <span className="badge rounded-pil p-2" style={{ marginRight: "10px" }}>
                                        <MdDelete color="rgba(255, 0, 0, 0.5)" onClick={() => { deleteTask(item?.id) }} />
                                    </span>
                                    <span className="badge rounded-pil p-2" data-bs-dismiss="offcanvas">
                                        <MdEditSquare onClick={() => { setSelectedTask(item), setTaskModal(true) }} />
                                    </span>
                                </div>
                            </div>
                        )
                    })
                }
                <div
                    onClick={() => { add() }}
                    style={{
                        display: "flex", alignItems: "center", gap: "8px", cursor: "pointer"
                    }}
                >
                    <CiCirclePlus size={20} />
                    <p className="mb-0 " >
                        Add new task
                    </p>
                </div>
            </ul>
            <Modal isOpen={taskModal} style={customStyles} onRequestClose={() => setTaskModal(false)}>
                <input type="text" placeholder="Quick task" className="input_title" onChange={handleTaskChange} />
                <button style={{ border: "0px", width: "100%", height: "40px", marginTop: "38px", fontSize: windowWidth < 576 && "12px" }} className='save_button' onClick={() => { edit(selectedTask?.id) }}>{"Save"}</button>
            </Modal>
        </div>
    )
}

export default NavBarLists;