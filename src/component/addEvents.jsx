import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { ImCross } from "react-icons/im";
import { MdOutlineTimer } from "react-icons/md";

Modal.setAppElement('#root');



function AddEvents(props) {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const customStyles = {
        content: {
            width: windowWidth < 420 ? '30vh' : windowWidth < 576 ? '45vh' : '80vh',
            height: (windowWidth < 420 && props?.isCalender) ? '55vh' : windowWidth < 420 ? '55vh' : windowWidth < 576 ? (props?.isCalender ? '65vh ' : '55vh') : '70vh',
            margin: 'auto',
            padding: '20px',
            borderRadius: '10px',
        },

        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: props?.isCalender ? 5 : 0
        }
    };

    return (
        <Modal isOpen={props?.isOpen} style={customStyles} onRequestClose={() => props?.setIsOpen(false)}>
            <div className='enter-container' style={{ justifyContent: "space-between", height: windowWidth < 576 ? '45vh' : '65vh' }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h4 style={{ fontSize: windowWidth < 576 && "14px" }}>{props?.saveEdit ? "Edit your task here!" : "Enter your task here!"}</h4>
                    <ImCross size={windowWidth < 576 ? 10 : 16} style={{ marginBottom: "5px", cursor: 'pointer', }} onClick={() => props?.setIsOpen(false)} />
                </div>
                <div style={{ marginTop: "20px" }}>
                    <div >
                        {
                            props?.isCalender ?
                                <>
                                    <input type="text" placeholder="Title" className="input_title" onChange={props?.handleTitleChange} />
                                    <div className="mb-3 mt-2">
                                        <input
                                            type="time"
                                            id="eventTime"
                                            className="form-control input_title"
                                            onChange={(e) => props?.setTime(e.target.value)}
                                        />
                                    </div>
                                    <div className='mt-2'>
                                        <textarea
                                            placeholder="Enter your message"
                                            className="message-input-box"
                                            onChange={props?.handleMessageChange}
                                            maxLength={200}
                                        />
                                    </div>
                                </>
                                :
                                <>
                                    <input type="text" value={props?.upComingTempList[0].title} placeholder="Title" className="input_title" onChange={props?.handleTitleChange} />
                                    <div className='mt-2'>
                                        <textarea
                                            value={props?.upComingTempList[0].description}
                                            placeholder="Enter your message"
                                            className="message-input-box"
                                            onChange={props?.handleMessageChange}
                                            maxLength={200}
                                        />
                                    </div>
                                </>
                        }

                    </div>
                    <button style={{ border: "0px", width: "100%", height: "40px", marginTop: "38px", fontSize: windowWidth < 576 && "12px" }} className='save_button' onClick={props?.save}>{props?.saveEdit ? "Edit" : "Save"}</button>
                </div>
            </div>
        </Modal>
    )

}

export default AddEvents