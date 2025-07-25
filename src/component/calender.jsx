// src/component/Calendar.jsx

import React, { useState, useContext } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-modal';
import { MyAppContext } from './context';
import AddEvents from './addEvents';
import { MdOutlineTimer } from "react-icons/md";
import { ImCross } from "react-icons/im";


// Modal.setAppElement('#root');


export default function Calendar() {
    const { events, setEvents } = useContext(MyAppContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    // const [events, setEvents] = useState([]);
    const [time, setTime] = useState("");
    const [selectedDate, setSelectedDate] = useState()
    const [isModalOpen, setIsModalOpen] = useState()

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [upComingTempList, setUpcominTempList] = useState([{
        id: 0,
        title: "",
        description: ""
    }]);

    const handleSave = () => {
        const now = new Date();
        const newEvent = {
            id: Date.now().toString(),
            title: title,
            description: description,
            date: now.toLocaleDateString(),
            time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            start: `${selectedDate}T${time}`,
            end: `${selectedDate}T${time}`,
        };
        const updatedEvents = [...events, newEvent];
        setEvents(updatedEvents);
        localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));
        setIsModalOpen(false);
    };

    function renderEventContent(eventInfo) {
        return (
            <div
                style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#000000aa",
                    backgroundColor: "#FFDACC",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    maxWidth: "90px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: 'inline-block'
                }}
            >
                {eventInfo.event.title}
            </div>
        );
    }

    const handleEventClick = ({ event }) => {
        setSelectedEvent({
            title: event?._def?.title,
            description: event?._def?.extendedProps?.description, // if you have custom field
            date: event?._def?.extendedProps?.date,
            time: event?._def?.extendedProps?.time
        });
        setIsEventModalOpen(true); // open modal
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    };

    const handleMessageChange = (e) => {
        setDescription(e.target.value.slice(0, 400))
    };

    return (
        <div className="col-10" >
            <FullCalendar
                events={events}
                editable={true}
                selectable={true}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                dateClick={(info) => {
                    setSelectedDate(info.dateStr);
                    setIsModalOpen(true);
                }}
                eventClick={handleEventClick}
                eventContent={renderEventContent}
                initialView="dayGridMonth"
                height="auto"
                eventBackgroundColor="#ff7f50"
                eventTextColor="#000000"
            />

            {
                selectedEvent &&
                <Modal
                    isOpen={isEventModalOpen}
                    onRequestClose={() => setIsEventModalOpen(false)}
                    style={{
                        content: {
                            width: '80vh',
                            height: '60vh',
                            backgroundColor: "transparent",
                            margin: 'auto', // center horizontally
                            padding: '20px',
                            borderRadius: '10px',
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between"
                        },
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 5
                        }
                    }}
                >
                    <div style={{ display: "flex", width: "90%", justifyContent: "space-between", alignItems: "center" }}>
                        <h4 className='display-6 text-light'>{"Your task here!"}</h4>
                        <ImCross className='text-light' style={{ marginBottom: "5px", cursor: 'pointer' }} onClick={() => setIsEventModalOpen(false)} />
                    </div>
                    <div className="card-container" style={{ backgroundColor: "#A3B18A", width: "65vh", marginRight: "0px" }}>
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p className='text-light' style={{ fontSize: "12px", }}>Date: {selectedEvent?.time}</p>
                            </div>
                            <h3 className='text-light' style={{ fontSize: "18px", fontWeight: 'bold' }}>{selectedEvent?.title}</h3>
                            <hr className="styled-line" />
                            <p className='text-light' style={{ fontSize: "14px", marginTop: "10px" }}>{selectedEvent?.description}</p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "start" }}>
                            <MdOutlineTimer className='text-light' />
                            <p className='text-light' style={{ fontSize: "12px", paddingLeft: "5px" }}>Time: {selectedEvent?.time}</p>
                        </div>
                    </div>
                </Modal>
            }

            <AddEvents isCalender={true} setIsOpen={setIsModalOpen} isOpen={isModalOpen} saveEdit={false} upComingTempList={upComingTempList} handleMessageChange={handleMessageChange} handleTitleChange={handleTitleChange} save={handleSave} setTime={setTime} />
        </div >
    );
}
