document.getElementById('srtForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let speed = parseFloat(document.getElementById('speed').value);
    let distance = parseFloat(document.getElementById('distance').value);
    let timeInterval = 0.1; // Czasowa różnica między każdą linią SRT (w sekundach)
    let totalTime = 600; // Czas trwania w sekundach (10 minut)
    
    let srtContent = '';
    let currentTime = 0;

    for (let i = 1; i <= totalTime / timeInterval; i++) {
        let startTime = formatTime(currentTime);
        let endTime = formatTime(currentTime + timeInterval);
        let currentDistance = (speed * currentTime).toFixed(3);
        
        srtContent += `${i}\n${startTime} --> ${endTime}\n${currentDistance} m\n\n`;
        
        currentTime += timeInterval;
    }

    let blob = new Blob([srtContent], { type: 'text/plain' });
    let link = document.getElementById('downloadLink');
    link.href = URL.createObjectURL(blob);
    link.download = 'subtitles.srt';
    link.style.display = 'block';
});

function formatTime(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;
    let millisecs = Math.round((secs % 1) * 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')},${millisecs.toString().padStart(3, '0')}`;
}
