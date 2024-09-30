
    const staffDetails = [
        {
            id: 'staff1',
            name: 'Merlee Alarcon, RN',
            title: 'AHEHSO Administrator',
            schedule: 'Monday to Friday\n9:00AM to 5:00PM\n\nSaturdays\n8:00AM to 12:00NN'
        },
        {
            id: 'staff2',
            name: 'Vanessa Federis, RN',
            title: 'Program Coordinator',
            schedule: 'Monday to Friday\n8:00AM to 5:00PM\n'
        },
        {
            id: 'staff3',
            name: 'Dr. Theone Ramirez',
            title: 'School Physician',
            schedule: 'Monday to Friday\n8:00AM to 10:00AM'
        },
        {
            id: 'staff4',
            name: 'Dr. Miriam Daluro',
            title: 'School Physician',
            schedule: 'Monday to Friday\n10:00AM to 2:00PM'
        },
        {
            id: 'staff5',
            name: 'Dr. Rein Gapit-Perez',
            title: 'School Dentist',
            schedule: 'Monday to Friday\n1:00AM to 3:00PM'
        },
        {
            id: 'staff6',
            name: 'Dr. Gracia Antonio',
            title: 'School Dentist',
            schedule: 'Monday to Friday\n10:00AM to 12:00NN'
        },
        {
            id: 'staff7',
            name: 'Metchill Hallare, RN',
            title: 'School Nurse',
            schedule: 'Monday to Friday\n7:30AM to 3:30PM\n\nSaturdays\n2:00AM to 6:00PM'
        },
        {
            id: 'staff8',
            name: 'Mark Solano, RN',
            title: 'School Nurse',
            schedule: 'Monday to Friday\n10:30AM to 2:30PM\n4:30AM to 8:30PM\n\nSaturdays\n10:00AM to 2:00PM'
        }
        // Add other staff details here
    ];

    let currentIndex = 0;

    function showStaffDetails(index) {
        const staff = staffDetails[index];
        const detailsContainer = document.querySelector('.staff-chosen-details');
        const scheduleContainer = document.querySelector('.staff-specific-schedule');
        
        detailsContainer.classList.remove('fade-in');
        scheduleContainer.classList.remove('fade-in');
        
        setTimeout(() => {
            detailsContainer.querySelector('span').innerText = staff.name;
            detailsContainer.querySelector('p').innerText = staff.title;
            scheduleContainer.innerText = staff.schedule;

            detailsContainer.classList.add('fade-in');
            scheduleContainer.classList.add('fade-in');
        }, 500); // Delay to allow fade-out effect
    }

    function selectStaff(index) {
        currentIndex = index;
        showStaffDetails(index);
        updateSelectedClass();
    }

    function updateSelectedClass() {
        document.querySelectorAll('.staff-container').forEach((el, idx) => {
            if (idx === currentIndex) {
                el.classList.add('selected');
            } else {
                el.classList.remove('selected');
            }
        });
    }

    function switchStaffDetails() {
        currentIndex = (currentIndex + 1) % staffDetails.length;
        showStaffDetails(currentIndex);
        updateSelectedClass();
    }

    // Initial load
    showStaffDetails(currentIndex);
    updateSelectedClass();


    setInterval(switchStaffDetails, 5000);
