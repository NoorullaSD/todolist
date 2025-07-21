import { useState } from "react"
import { CiCirclePlus } from "react-icons/ci";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FaListCheck } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { MdOutlineStickyNote2 } from "react-icons/md";


function StickyWall() {
    let tempList = [
        {
            id: 1,
            title: "Upcoming",
            list: [
                {
                    "id": 1,
                    "title": "Learn React Basics",
                    "description": "Start by understanding how React components, props, and state work together to build UI.",
                    "subtasks": [
                        "Watch an introductory video on React",
                        "Read the official React docs",
                        "Create your first Hello World component"
                    ],
                    "completed": false
                },
                {
                    "id": 2,
                    "title": "Build a To-Do App",
                    "description": "Apply your knowledge by building a simple app to manage tasks. This will help you practice state management and rendering lists.",
                    "subtasks": [
                        "Create Add Task functionality",
                        "Implement delete option",
                        "Save tasks in localStorage"
                    ],
                    "completed": false
                },
                {
                    "id": 3,
                    "title": "Explore useEffect Hook",
                    "description": "Hooks allow you to use state and lifecycle methods in functional components. Focus on useState and useEffect first.",
                    "subtasks": [
                        "Use useState to create a counter",
                        "Use useEffect to fetch data from an API",
                        "Read about custom hooks"
                    ],
                    "completed": true
                },
                {
                    "id": 4,
                    "title": "Style App with CSS",
                    "description": "Learn how to use Flexbox, Grid, and responsive design to make your apps look good on all screen sizes.",
                    "subtasks": [
                        "Create a layout with CSS Grid",
                        "Style components with Flexbox",
                        "Make layout responsive with media queries"
                    ],
                    "completed": false
                },
                {
                    "id": 5,
                    "title": "Add LocalStorage Support",
                    "description": "Pick any public API and integrate it into your app to show dynamic data. This will improve your understanding of useEffect and async functions.",
                    "subtasks": [
                        "Choose a free API (e.g., weather, movie)",
                        "Fetch data using fetch or axios",
                        "Display the data in your UI"
                    ],
                    "completed": false
                },
                {
                    "id": 6,
                    "title": "Explore useEffect Hook",
                    "description": "Start by understanding how React components, props, and state work together to build UI.",
                    "subtasks": [
                        "Watch an introductory video on React",
                        "Read the official React docs",
                        "Create your first Hello World component"
                    ],
                    "completed": true
                },
                {
                    "id": 7,
                    "title": "Style App with CSS",
                    "description": "Apply your knowledge by building a simple app to manage tasks. This will help you practice state management and rendering lists.",
                    "subtasks": [
                        "Create Add Task functionality",
                        "Implement delete option",
                        "Save tasks in localStorage"
                    ],
                    "completed": false
                },
                {
                    "id": 8,
                    "title": "Add LocalStorage Support",
                    "description": "Hooks allow you to use state and lifecycle methods in functional components. Focus on useState and useEffect first.",
                    "subtasks": [
                        "Use useState to create a counter",
                        "Use useEffect to fetch data from an API",
                        "Read about custom hooks"
                    ],
                    "completed": false
                }
            ],
            text: "wake up at 6 am",
            icon: <MdKeyboardDoubleArrowRight />,
            count: 8
        },
        {
            id: 2,
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
        },
        {
            id: 3,
            title: "Calender",
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

            ],
            text: "go for a walk at 5 pm",
            icon: <FaCalendarAlt />,
            count: 3
        },
        {
            id: 4,
            title: "Sticky Wall",
            text: "sleep at 10 pm",
            list: [],
            icon: <MdOutlineStickyNote2 />,
            count: 0
        }
    ]
    const [list, setList] = useState(tempList)
    const [selectedList, setSelectedList] = useState(list[0])


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

export default StickyWall