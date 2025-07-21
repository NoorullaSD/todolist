import { useState } from "react"
import { CiCirclePlus } from "react-icons/ci";
function NavBarLists() {
    let tempWork = [
        {
            id: 1,
            title: "Personal",
            color: 'rgba(221, 93, 93, 0.5)',
            count: 23,
        },
        {
            id: 1,
            title: "Work",
            color: 'rgba(89, 29, 185, 0.5)',
            count: 3,
        },
        {
            id: 1,
            title: "List",
            color: 'rgba(67, 196, 95, 0.5)',
            count: 0,
        },
    ]
    const [work, setWork] = useState(tempWork)
    return (
        <div className="list-container work-container">
            <h6 className="list-tittle">
                Lists
            </h6>
            <ul className="list-group list-group-flush">
                {
                    work.map((item, index) => {
                        return (
                            <div className='listcontainer' key={index}>
                                <a href='#' key={index} className="link-offset-2 link-underline link-underline-opacity-0 list-item">
                                    <div style={{ height: 10, width: 10, backgroundColor: item?.color, borderRadius: '30%', display: 'inline-block', }} />
                                    <li key={index} className="list-group-item" >
                                        {item?.title}
                                    </li>
                                </a>
                                {
                                    item?.count > 0 &&
                                    <span className="badge rounded-pill" >
                                        {item?.count}
                                    </span>
                                }
                            </div>
                        )
                    })
                }

                <a className="link-offset-2 link-underline link-underline-opacity-0" style={{ color: " rgb(61, 60, 60)", fontSize: 16 }} href="#" onClick={(e) => { addList() }}>
                    <div className="list-item" style={{ alignItems: 'center', }}>
                        <CiCirclePlus />
                        <li className="list-group-item" >
                            Add new task
                        </li>
                    </div>
                </a>
            </ul>
        </div>
    )
}

export default NavBarLists;