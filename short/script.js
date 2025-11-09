let userName = '';

document.getElementById('name-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name-input').value.trim();
    if (name) {
        userName = name;
        document.getElementById('input-section').style.display = 'none';
        document.getElementById('message').textContent = `Richard Loves You ${name} — Mmuah 💋`;
        document.getElementById('message-section').style.display = 'block';

        // Change background to a different love image after name entry
        document.body.style.backgroundImage = "url('love background 2.jpg')";
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';

        // Trigger heart animation by adding a class to restart if needed, but CSS handles it
        const hearts = document.querySelectorAll('.heart');
        hearts.forEach(heart => {
            heart.style.animationPlayState = 'running';
        });
        // Show questions after a delay
        setTimeout(() => {
            document.getElementById('questions-section').style.display = 'block';
        }, 3000); // 3 seconds after message appears
    }
});

function playRomanticSong() {
    // Create hidden video element for local Ed Sheeran "Perfect" mp4 file (play as audio)
    const video = document.createElement('video');
    video.src = 'Ed Sheeran.mp4';
    video.autoplay = true;
    video.loop = true;
    video.controls = false;
    video.style.display = 'none';
    video.addEventListener('loadeddata', () => {
        console.log('Video loaded and ready to play');
        video.play().then(() => console.log('Video playback started')).catch(e => console.error('Autoplay failed:', e));
    });
    video.addEventListener('error', (e) => {
        console.error('Video load error:', e);
    });
    document.body.appendChild(video);
    console.log('Attempting to play Ed Sheeran - Perfect from local file');
}

// Add event listener for date radios
document.addEventListener('DOMContentLoaded', function() {
    const dateRadios = document.querySelectorAll('input[name="date"]');
    dateRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const conditional = document.getElementById('date-conditional');
            if (this.checked) {
                conditional.style.display = 'block';
            } else {
                conditional.style.display = 'none';
            }
        });
    });
});

// Handle answers form submission
document.getElementById('answers-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Validation
    const likeMost = document.getElementById('like_most').value.trim();
    const annoying = document.getElementById('annoying').value.trim();
    const smile = document.getElementById('smile').value.trim();
    const memory = document.getElementById('memory').value.trim();
    const change = document.getElementById('change').value.trim();
    const different = document.getElementById('different').value.trim();
    const neverStop = document.getElementById('never_stop').value.trim();
    const threeWords = document.getElementById('three_words').value.trim();

    if (!likeMost) {
        alert('Please answer what you like most about Richard.');
        return;
    }
    if (!annoying) {
        alert('Please answer what makes Richard annoying sometimes.');
        return;
    }
    if (!smile) {
        alert('Please answer what’s one thing Richard does that makes you smile.');
        return;
    }
    if (!memory) {
        alert('Please answer what’s your favorite memory with Richard.');
        return;
    }
    if (!change) {
        alert('Please answer what would you change about Richard (if anything).');
        return;
    }
    if (!different) {
        alert('Please answer what makes Richard different from other guys.');
        return;
    }
    if (!neverStop) {
        alert('Please answer what’s one thing Richard should never stop doing.');
        return;
    }
    if (!threeWords) {
        alert('Please describe Richard in three words.');
        return;
    }

    const formData = new FormData(this);
    formData.set('name', userName); // Set the hidden name field
    try {
        const response = await fetch('https://formspree.io/f/mwpaeogq', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        if (response.ok) {
            // Hide questions and show response
            document.getElementById('questions-section').style.display = 'none';
            document.getElementById('response-message').textContent = 'Will you be in a relationship with him?';
            document.getElementById('response-section').style.display = 'block';
        } else {
            alert('There was an error submitting your answers. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error submitting your answers. Please try again.');
    }
});

// Handle relationship form submission
document.getElementById('relationship-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const answer = event.submitter.value;
    const formData = new FormData(event.target);
    formData.set('name', userName);
    formData.set('relationship_answer', answer);
    try {
        const response = await fetch('https://formspree.io/f/mwpaeogq', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        if (response.ok) {
            // Hide response and show final message
            document.getElementById('response-section').style.display = 'none';
        if (answer === 'Yes') {
            const finalMessage = document.createElement('h2');
            finalMessage.innerHTML = 'You just made Richard\'s heart smile 💘';
            finalMessage.className = 'final-yes-message';
            document.getElementById('message-section').appendChild(finalMessage);

            const paragraph = document.createElement('p');
            paragraph.innerHTML = 'Your "yes" means the world to him.<br>He promises to cherish you, laugh with you, and walk beside you — through every sunrise and every storm.<br>This is the beginning of something beautiful 🌹';
            paragraph.className = 'final-yes-paragraph';
            document.getElementById('message-section').appendChild(paragraph);

            // Play romantic background song
            playRomanticSong();
        } else {
            const finalMessage = document.createElement('h2');
            finalMessage.textContent = 'That\'s okay, Richard understands. 😊';
            finalMessage.style.fontFamily = 'Dancing Script, cursive';
            finalMessage.style.fontSize = '2.5rem';
            finalMessage.style.color = '#d63384';
            finalMessage.style.marginTop = '20px';
            document.getElementById('message-section').appendChild(finalMessage);
        }
        } else {
            alert('There was an error submitting your response. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error submitting your response. Please try again.');
    }
});

// Removed local button handlers since form now submits to email
