async function fetchLogs() {
    try {
        const response = await fetch('https://automate-render.onrender.com');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const logs = await response.json();
        console.log('Fetched Logs:', logs); // డేటాను చూడు
        const logsDiv = document.getElementById('logs');
        logsDiv.innerHTML = '';
        if (logs.length === 0 || !logs) {
            logsDiv.innerHTML = '<p>ఎలాంటి SMS లాగ్‌లు లేవు.</p>';
        } else {
            logs.forEach(log => {
                const logEntry = document.createElement('div');
                logEntry.className = 'log-entry';
                logEntry.innerHTML = `<strong>From:</strong> ${log.from || 'N/A'}<br><strong>Message:</strong> ${log.message || 'N/A'}<br><strong>Time:</strong> ${log.receivedAt ? new Date(log.receivedAt).toLocaleString() : 'N/A'}`;
                logsDiv.appendChild(logEntry);
            });
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('logs').innerHTML = '<p>లాగ్‌లు లభ్యం కాలేదు. సేవర్‌ని చెక్ చేయండి.</p>';
    }
}
window.onload = fetchLogs;
document.querySelector('button').addEventListener('click', fetchLogs);
