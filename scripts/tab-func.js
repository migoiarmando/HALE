
document.addEventListener("DOMContentLoaded", function() {
    const tabs = document.querySelectorAll('.tab-header');
    
    const allAppointments = document.querySelectorAll('.appointee-container.all');
    const confirmedAppointments = document.querySelectorAll('.appointee-container.confirmed');
    const pendingAppointments = document.querySelectorAll('.appointee-container.pending');
    const cancelledAppointments = document.querySelectorAll('.appointee-container.cancelled');
    
    function showAppointments(appointments) {
        allAppointments.forEach(app => app.style.display = 'none');
        appointments.forEach(app => app.style.display = 'flex');
    }

    function setActiveTab(activeTab) {
        tabs.forEach(tab => tab.classList.remove('active'));
        activeTab.classList.add('active');
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.id;
            setActiveTab(this);
            switch (tabId) {
                case 'all-tab':
                    showAppointments(allAppointments);
                    break;
                case 'confirmed-tab':
                    showAppointments(confirmedAppointments);
                    break;
                case 'pending-tab':
                    showAppointments(pendingAppointments);
                    break;
                case 'cancelled-tab':
                    showAppointments(cancelledAppointments);
                    break;
            }
        });
    });

    // Initial load
    setActiveTab(document.getElementById('all-tab'));
    showAppointments(allAppointments);
});
