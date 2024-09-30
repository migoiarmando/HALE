
function selectDate(element, date) {
    const selectedDate = document.querySelector('.date.selected');
    if (selectedDate) {
        selectedDate.classList.remove('selected');
    }
    element.classList.add('selected');
    console.log("Selected date:", date); // Handle date selection as needed
}

function getMonthName(monthIndex) {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[monthIndex];
}

function setMonthYear(year, month) {
    const monthYearElement = document.getElementById('month-year');
    monthYearElement.textContent = `${getMonthName(month)} ${year}`;
}

function generateCalendar(year, month) {
    const datesContainer = document.querySelector('.dates');
    datesContainer.innerHTML = ''; // Clear previous dates

    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get the number of days in the month
    const startDay = new Date(year, month, 1).getDay(); // Get the starting day of the week

    // Adjust startDay to match the order of days in the header (Mon-Sun)
    const adjustedStartDay = (startDay + 6) % 7;

    for (let i = 0; i < adjustedStartDay; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('date');
        datesContainer.appendChild(emptyDiv);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateDiv = document.createElement('div');
        const date = new Date(year, month, day).toISOString().split('T')[0];
        dateDiv.classList.add('date');
        dateDiv.textContent = day;
        dateDiv.setAttribute('onclick', `selectDate(this, '${date}')`);
        datesContainer.appendChild(dateDiv);
    }
}

// Generate the current month's calendar and set the month-year display
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();

setMonthYear(currentYear, currentMonth);
generateCalendar(currentYear, currentMonth);
