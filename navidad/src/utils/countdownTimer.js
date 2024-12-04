document.addEventListener('DOMContentLoaded', function () {
    function parseTimezoneOffset(offset) {
        const match = offset.match(/([+-])(\d{2}):?(\d{2})/);
        if (!match) return 0;

        const sign = match[1] === '+' ? 1 : -1;
        const hours = parseInt(match[2], 10);
        const minutes = parseInt(match[3], 10);

        return sign * (hours * 60 + minutes);
    }

    function startCountdown(timezoneOffset) {
        const targetDate = new Date('December 25, 2024 00:00:00');
        targetDate.setMinutes(targetDate.getMinutes() - timezoneOffset);

        setInterval(() => {
            const now = new Date();
            const timeRemaining = targetDate - now;

            if (timeRemaining > 0) {
                const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

                document.getElementById('days').textContent = days;
                document.getElementById('hours').textContent = hours;
                document.getElementById('minutes').textContent = minutes;
                document.getElementById('seconds').textContent = seconds;
            } else {
                document.getElementById('countdown').textContent = '¡Feliz Navidad!';
            }
        }, 1000);
    }

    const params = new URLSearchParams(window.location.search);
    const timezone = params.get('timezone') || 'UTC';
    const offset = parseTimezoneOffset(timezone);

    startCountdown(offset);
});
