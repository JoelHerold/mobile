var idleDetector;

function handleIdleChange() {
    const timeBadge = new Date().toTimeString().split(' ')[0];
    const newState = document.createElement('p');
    const {user, screen} = idleDetector.state;
    newState.innerHTML = '' + timeBadge + ' User idle status changed to ' + user + '. Screen idle status changed to ' + screen + '.';
    target.appendChild(newState);
}

function startDetector() {
    if (!window.IdleDetector) {
        alert("Idle Detection API is not available");
        return;
    }

    const target = document.getElementById('target1');

    try {
        idleDetector = new IdleDetector({ threshold: 60 });
        idleDetector.addEventListener('change', handleIdleChange);
        idleDetector.start();
    } catch (e) {
        alert('Idle Detection error:' + e);
    }}