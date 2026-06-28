/**
 * =========================================================
 * BEN 10 ALIEN GAMING ZONE - LOGIC CONSOLE
 * =========================================================
 */

// Sound Configuration (Aap yahan assets folder me apni mp3 file rakh kar badal sakte hain)
const OMNITRIX_SOUND_PATH = 'assets/omnitrix_click.mp3';

document.addEventListener('DOMContentLoaded', () => {
    // Select all Play Buttons
    const playButtons = document.querySelectorAll('.btn-play');

    // Attach Event Listeners to each play button
    playButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const gameUrl = button.getAttribute('data-url');
            const gameTitle = button.getAttribute('data-game-title');
            
            if (gameUrl) {
                activateOmnitrixPlayer(gameUrl, gameTitle);
            }
        });
    });
});

/**
 * Click sound file trigger karne ka core function.
 * Agar sound file available nahi hai ya browser block karta hai toh yeh error ignore karta hai.
 */
function playOmnitrixSound() {
    try {
        const audio = new Audio(OMNITRIX_SOUND_PATH);
        audio.volume = 0.5; // Sound volume control (0.0 to 1.0)
        audio.play().catch(err => {
            console.warn("Audio playback delayed or file missing: " + OMNITRIX_SOUND_PATH);
        });
    } catch (e) {
        console.error("Audio system error: ", e);
    }
}

/**
 * Activates the central interactive player panel (iframe console).
 * 
 * @param {string} url - The HTML5 game URL to embed in the iframe.
 * @param {string} title - The title of the game.
 */
function activateOmnitrixPlayer(url, title) {
    const playZone = document.getElementById('play-zone');
    const gameIframe = document.getElementById('game-iframe');
    const playerTitle = document.querySelector('#player-title span');
    const flashOverlay = document.getElementById('omnitrix-flash');

    // 1. Play the Omnitrix activation click sound
    playOmnitrixSound();

    // 2. Trigger the neon green flash transition (Ben 10 style transformation)
    if (flashOverlay) {
        flashOverlay.classList.add('active');
        
        // Remove animation class after it completes (0.8s) so it can trigger again next time
        setTimeout(() => {
            flashOverlay.classList.remove('active');
        }, 800);
    }

    // 3. Open the Play Zone panel
    playZone.classList.add('active');

    // 4. Show glowing loading state in the header
    playerTitle.innerHTML = `<i class="fa-solid fa-sync fa-spin"></i> OMNITRIX DNA SYNCING: ${title}...`;
    gameIframe.style.opacity = '0.3';

    // 5. Add a small 200ms delay to mount the iframe. 
    // This allows the neon flash to cover the sudden layout swap.
    setTimeout(() => {
        gameIframe.setAttribute('src', url);
        playZone.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);

    // 6. Reveal iframe when loaded
    gameIframe.onload = () => {
        gameIframe.style.opacity = '1';
        playerTitle.innerHTML = `<i class="fa-solid fa-gamepad"></i> Playing: ${title} (OMNITRIX ACTIVE)`;
    };
}

/**
 * Closes the player and stops the game immediately.
 * This is crucial because if we just hide the panel, 
 * the game will continue running and playing audio in the background.
 */
function closeGame() {
    const playZone = document.getElementById('play-zone');
    const gameIframe = document.getElementById('game-iframe');
    
    // Step 1: Clear the iframe src to kill all audio and background processes
    gameIframe.setAttribute('src', '');
    
    // Step 2: Remove the active class to hide the panel
    playZone.classList.remove('active');
}
