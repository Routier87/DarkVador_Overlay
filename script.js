// Sons de transition
function playTransitionSound() {
    const sound = document.getElementById('transition-sound');
    sound.currentTime = 0;
    sound.play();
}

// Effet lightsaber
function playLightsaberEffect() {
    const saber = document.getElementById('lightsaber');
    const sound = document.getElementById('lightsaber-sound');
    
    saber.classList.add('active');
    sound.currentTime = 0;
    sound.play();
    
    setTimeout(() => {
        saber.classList.remove('active');
    }, 1000);
}

// Mise à jour des stats (exemple)
function updateStats() {
    // Simuler des données
    document.getElementById('viewers').textContent = Math.floor(Math.random() * 100) + 50;
    document.getElementById('followers').textContent = Math.floor(Math.random() * 1000) + 500;
    
    // Temps de stream
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('stream-time').textContent = `${hours}:${minutes}`;
}

// Alertes
function showAlert(type, username) {
    const container = document.getElementById('alerts-container');
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    
    let icon, message, color;
    
    switch(type) {
        case 'follow':
            icon = 'fas fa-user-plus';
            message = `${username} a rejoint l'Empire !`;
            color = '#00ff00';
            break;
        case 'sub':
            icon = 'fas fa-crown';
            message = `${username} est maintenant un Seigneur Sith !`;
            color = '#ffcc00';
            break;
        case 'donation':
            icon = 'fas fa-coins';
            message = `${username} a soutenu la Galaxie !`;
            color = '#00ccff';
            break;
    }
    
    alert.innerHTML = `
        <i class="${icon}"></i>
        <span>${message}</span>
    `;
    alert.style.borderLeftColor = color;
    
    container.insertBefore(alert, container.firstChild);
    
    // Limiter à 3 alertes maximum
    if (container.children.length > 3) {
        container.removeChild(container.lastChild);
    }
    
    // Jouer le son de transition pour les alertes importantes
    if (type === 'sub' || type === 'donation') {
        playTransitionSound();
        playLightsaberEffect();
    }
    
    // Supprimer après 10 secondes
    setTimeout(() => {
        if (alert.parentNode) {
            alert.style.opacity = '0';
            setTimeout(() => {
                if (alert.parentNode) {
                    alert.parentNode.removeChild(alert);
                }
            }, 500);
        }
    }, 10000);
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Mettre à jour les stats toutes les 30 secondes
    updateStats();
    setInterval(updateStats, 30000);
    
    // Jouer la respiration de Vador en boucle douce
    const breathSound = document.getElementById('breath-sound');
    breathSound.volume = 0.3;
    
    function playBreath() {
        breathSound.currentTime = 0;
        breathSound.play();
        setTimeout(playBreath, 15000); // Toutes les 15 secondes
    }
    
    // Démarrer après 5 secondes
    setTimeout(playBreath, 5000);
    
    // Simuler des alertes pour le test (à enlever en production)
    setTimeout(() => showAlert('follow', 'LukeSkywalker'), 3000);
    setTimeout(() => showAlert('sub', 'PrincessLeia'), 8000);
    setTimeout(() => showAlert('donation', 'HanSolo'), 13000);
    
    // Ajouter un événement de clic pour tester la transition
    document.body.addEventListener('click', function() {
        playTransitionSound();
        playLightsaberEffect();
    });
});

// CSS pour les alertes
const style = document.createElement('style');
style.textContent = `
.alert {
    background: rgba(20, 20, 30, 0.9);
    padding: 12px;
    margin-bottom: 10px;
    border-radius: 5px;
    border-left: 4px solid #c00;
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 18px;
    animation: slideIn 0.5s ease-out;
    transition: opacity 0.5s;
}

.alert i {
    font-size: 24px;
}

@keyframes slideIn {
    from { transform: translateX(100px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}
`;
document.head.appendChild(style);
