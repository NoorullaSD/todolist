import { useState, useContext } from "react"
import { CiCirclePlus } from "react-icons/ci";
import { FaListCheck } from "react-icons/fa6";
import { MyAppContext } from "./context";

function Today() {
    const { setTask } = useContext(MyAppContext);
    let toDayList = [
        {
            id: 1,
            title: "Today",
            list: [
                {
                    "id": 1,
                    "title": "Learn React Basics",
                    "description": "Understand components, props, and state",
                    "completed": false
                },
                {
                    "id": 2,
                    "title": "Build a To-Do App",
                    "description": "Create a simple to-do list with add and delete functionality",
                    "completed": false
                },
                {
                    "id": 3,
                    "title": "Explore useEffect Hook",
                    "description": "Use it to fetch data from an API",
                    "completed": true
                },
                {
                    "id": 4,
                    "title": "Style App with CSS",
                    "description": "Use Flexbox and custom styles",
                    "completed": false
                },
                {
                    "id": 5,
                    "title": "Add LocalStorage Support",
                    "description": "Save tasks even after refreshing",
                    "completed": false
                }
            ],
            text: "have lunch at 1 pm",
            icon: <FaListCheck />,
            count: 5
        }
    ]
    const [selectedList, setSelectedList] = useState(toDayList[0])
    const aestheticColors = [
        "#FFDACC", "#FFE4E1", "#FFF0F5", "#FFDACC", "#D6EBD4",
        "#D8A7B1", "#F9E4C8", "#A3B18A", "#DAD2D8", "#BFD8D2",
        "#D8A7B1", "#F9E4C8", "#A3B18A", "#DAD2D8", "#B28D8D"
    ];

    const getRandomHexColor = () => {
        return aestheticColors[Math.floor(Math.random() * aestheticColors.length)];
    };

    return (
        <div className="col-10" >
            <div style={{ backgroundColor: "#f0f0f0", borderRadius: "10px", padding: "10px", height: "96vh", overflowY: "auto" }} >
                <h2 style={{ marginLeft: "10px" }}>{selectedList?.title}</h2>
                <div className="container-fluid info">
                    {
                        selectedList?.list.map((item, index) => {
                            return (
                                <div key={index} className="col-lg-4 col-md-6 col-sm-12">
                                    <div style={{ backgroundColor: getRandomHexColor(), justifyContent: "center", height: "40vh", marginRight: "30px", marginTop: "10px", marginBottom: "20px", borderRadius: "6px", padding: "10px", boxShadow: '5px 5px 8px rgba(0, 0, 0, 0.2)', }}>
                                        <h3 style={{ color: "#2E2E2E", fontSize: "18px", fontWeight: 'bold' }}>{item?.title}</h3>
                                        <p style={{ color: "#2E2E2E", fontSize: "14px", }}>{item?.description}</p>
                                        {item?.subtasks && item?.subtasks.length > 0 &&
                                            <ul style={{ paddingLeft: "20px", listStyleType: "none" }}>
                                                {item?.subtasks.map((sub, subIndex) => (
                                                    <li style={{ color: "#2E2E2E", fontSize: "14px", }} key={subIndex}>
                                                        <span style={{ color: "#2E2E2E", marginRight: "8px" }}>–</span>
                                                        {sub}
                                                    </li>
                                                ))}
                                            </ul>
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="add" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "50vh", height: "40vh", marginTop: "10px", borderRadius: "6px", borderWidth: "2px", borderStyle: "dashed", borderColor: "#4d4a4aff", opacity: 0.5 }} onClick={() => setIsOpen(true)}>
                        <CiCirclePlus size={"120px"} opacity={0.5} />
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Today