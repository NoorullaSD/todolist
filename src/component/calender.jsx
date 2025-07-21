// src/component/Calendar.jsx

import React, { useState, useContext } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-modal';
import { MyAppContext } from './context';
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
    const [isModalOpen1, setIsModalOpen1] = useState(false);

    const customStyles = {
        content: {
            width: '500px',
            height: '400px',
            margin: 'auto', // center horizontally
            padding: '20px',
            borderRadius: '10px',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 5
        }
    };
    const handleSave = () => {
        const newEvent = {
            id: Date.now().toString(),
            title: title,
            description: description,
            start: `${selectedDate}T${time}`,
            end: `${selectedDate}T${time}`, // or calculate based on duration
        };

        const updatedEvents = [...events, newEvent];
        console.log("updatedEvents-->>", updatedEvents);

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
        });
        setIsModalOpen1(true); // open modal
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
                    isOpen={isModalOpen1}
                    onRequestClose={() => setIsModalOpen(false)}
                    style={customStyles}
                >
                    <h3>{selectedEvent.title}</h3>
                    <p>{selectedEvent.description}</p>
                    <button onClick={() => setIsModalOpen1(false)}>Close</button>
                </Modal>
            }

            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                style={customStyles}
            >
                <h2>Add Event</h2>
                <input onChange={(e) => setTitle(e.target.value)} />
                <input type="time" onChange={(e) => setTime(e.target.value)} />
                <textarea onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                <button onClick={handleSave}>Save</button>
            </Modal>
        </div>
    );
}
