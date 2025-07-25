import React, { useState, useEffect } from 'react';
import axiosClient from '../../../axiosClient';
import '../../../Assets/CSS/forCalendar/calendar_styling.css';
import { Button } from '../../../Exporter/Component_Exporter';

const ReservationCalendar = ({ selectedDate, onDateSelect, minDate }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [availability, setAvailability] = useState({});
    const [loading, setLoading] = useState(false);

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    useEffect(() => {
        fetchMonthAvailability();
    }, [currentMonth]);

    const fetchMonthAvailability = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get('/reservations/availability', {
                params: {
                    month: currentMonth.getMonth() + 1,
                    year: currentMonth.getFullYear()
                }
            });
            setAvailability(response.data);
        } catch (error) {
            console.error('Error fetching availability:', error);
        } finally {
            setLoading(false);
        }
    };

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(day);
        }

        return days;
    };

    const formatDate = (year, month, day) => {
        return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    };

    const isDateDisabled = (day) => {
        if (!day) return true;

        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return date < today;
    };

    const getDateAvailability = (day) => {
        if (!day) return null;

        const dateString = formatDate(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            day
        );

        return availability[dateString];
    };

    const handleDateClick = (day) => {
        if (!day || isDateDisabled(day)) return;

        const dateAvailability = getDateAvailability(day);
        if (dateAvailability && !dateAvailability.available) return;

        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const formattedDate = formatDate(date.getFullYear(), date.getMonth(), date.getDate());
        onDateSelect(formattedDate);
    };

    const navigateMonth = (direction) => {
        setCurrentMonth(prev => {
            const newMonth = new Date(prev);
            newMonth.setMonth(prev.getMonth() + direction);
            return newMonth;
        });
    };

    const isSelectedDate = (day) => {
        if (!day || !selectedDate) return false;

        const dateString = formatDate(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            day
        );

        return selectedDate === dateString;
    };

    const days = getDaysInMonth(currentMonth);

   return (
        <div className="reservation-calendar">
            <div className="calendar-header">
                <Button
                    Title='←'
                    Onclick={() => navigateMonth(-1)}
                />

                <h3>
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
                <Button
                    Title='→'
                    Onclick={() => navigateMonth(1)}
                />
            </div>

            <div className="calendar-grid">
                {daysOfWeek.map(day => (
                    <div key={day} className="day-header">
                        {day}
                    </div>
                ))}

                {days.map((day, index) => {
                    const dateAvailability = getDateAvailability(day);
                    const isDisabled = isDateDisabled(day);
                    const isFullyBooked = dateAvailability && !dateAvailability.available;
                    const isSelected = isSelectedDate(day);

                    let dayClasses = 'calendar-day';
                    if (!day) dayClasses += ' empty';
                    if (isDisabled) dayClasses += ' disabled';
                    if (isFullyBooked) dayClasses += ' fully-booked';
                    if (isSelected) dayClasses += ' selected';
                    if (day && !isDisabled && !isFullyBooked) dayClasses += ' available';

                    return (
                        <div
                            key={index}
                            className={dayClasses}
                            onClick={() => handleDateClick(day)}
                        >
                            {day}
                            {dateAvailability && (
                                <div className="capacity-indicator">
                                    {dateAvailability.capacity_used}/{dateAvailability.max_capacity}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="calendar-legend">
                <div className="legend-item">
                    <div className="legend-color available"></div>
                    <span>Available</span>
                </div>
                <div className="legend-item">
                    <div className="legend-color fully-booked"></div>
                    <span>Fully Booked</span>
                </div>
                <div className="legend-item">
                    <div className="legend-color disabled"></div>
                    <span>Past Date</span>
                </div>
            </div>

            {loading && <div className="loading">Loading availability...</div>}
        </div>
    );
};

export default ReservationCalendar;
