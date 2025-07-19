async function fetchLogs() {
    try {
        const response = await fetch('https://automate-render.onrender.com/sms');
        const logs = await response.json();
        const logsDiv = document.getElementById('logs');
        logsDiv.innerHTML = ''; // పాత డేటా శుభ్రం చేయు
        if (logs.length === 0) {
            logsDiv.innerHTML = '<p>ఎలాంటి SMS లాగ్‌లు లేవు.</p>';
        } else {
            logs.forEach(log => {
                const logEntry = document.createElement('div');
                logEntry.className = 'log-entry';
                logEntry.innerHTML = `<strong>From:</strong> ${log.from}<br><strong>Message:</strong> ${log.message}<br><strong>Time:</strong> ${new Date(log.receivedAt).toLocaleString()}`;
                logsDiv.appendChild(logEntry);
            });
        }
    } catch (error) {
        console.error('Error fetching logs:', error);
        document.getElementById('logs').innerHTML = '<p>లాగ్‌లు లభ్యం కాలేదు. సేవర్‌ని చెక్ చేయండి.</p>';
    }
}

// పేజ్ లోడ్ అయినప్పుడు లాగ్‌లు fetch చేయు
window.onload = fetchLogs;

// రిఫ్రెష్ బటన్ క్లిక్ చేసినప్పుడు కూడా fetch
document.querySelector('button').addEventListener('click', fetchLogs);
