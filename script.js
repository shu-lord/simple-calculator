document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const startScreen = document.getElementById('start-screen');
    const bgMusic = document.getElementById('bg-music');
    const canvas = document.querySelector('.canvas');
    const sceneContainer = document.getElementById('scene-container');
    
    // --- Auth Logic ---
    const authScreen = document.getElementById('auth-screen');
    const authSubmitBtn = document.getElementById('auth-submit-btn');
    const magicWordInput = document.getElementById('magic-word-input');
    const authError = document.getElementById('auth-error');

    if (startScreen && authScreen) {
        startScreen.style.display = 'none'; // Hide start screen initially
    }

    function checkAuth() {
        const password = magicWordInput.value.trim();
        // The magic word!
        if (password === 'L0v3Y0u@lways') {
            authScreen.style.opacity = '0';
            setTimeout(() => {
                authScreen.style.display = 'none';
                startScreen.style.display = 'flex'; // Show start screen
            }, 1000);
        } else {
            authError.style.display = 'block';
            magicWordInput.value = '';
            setTimeout(() => {
                authError.style.display = 'none';
            }, 3000);
        }
    }

    if (authSubmitBtn) {
        authSubmitBtn.addEventListener('click', checkAuth);
        magicWordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkAuth();
        });
    }

    let currentScene = 1;
    const totalScenes = 3;

    startBtn.addEventListener('click', () => {
        bgMusic.play().catch(e => console.log('Audio play failed:', e));
        
        startScreen.style.opacity = '0';
        setTimeout(() => {
            startScreen.style.display = 'none';
            canvas.style.display = 'block';
            
            S.init();
            const sequence = `|#countdown 3|HAPPY|BIRTHDAY|MY|LOVE|💗|#hold|`;
            S.UI.simulate(sequence);
        }, 1000);
    });

    // Called by particle.js when heart has formed
    window.onHeartReady = function() {
        // Auto explode after 3 seconds
        setTimeout(() => {
            // EXPLODE the dots!
            S.Shape.explode();
            
            // After the explosion settles, show "The Letter" button
            setTimeout(() => {
                const letterBtn = document.getElementById('letter-btn');
                letterBtn.classList.remove('hidden');
                void letterBtn.offsetWidth;
                letterBtn.classList.add('visible');
            }, 1500);
        }, 3000);
    };

    // "The Letter" button click handler
    document.getElementById('letter-btn').addEventListener('click', () => {
        const letterBtn = document.getElementById('letter-btn');
        letterBtn.classList.remove('visible');
        
        // We NO LONGER fade out the canvas! It stays as the background.
        setTimeout(() => {
            letterBtn.classList.add('hidden');
            sceneContainer.classList.remove('hidden');
            // We ensure sceneContainer has a higher z-index to appear over the canvas
            sceneContainer.style.zIndex = "20";
            
            // Skip Scene 1 (Gift Box), go directly to Scene 2 (Letter)
            currentScene = 2;
            document.getElementById('scene-1').classList.remove('active-scene');
            document.getElementById('scene-1').classList.add('hidden');
            
            const letterScene = document.getElementById('scene-2');
            letterScene.classList.remove('hidden');
            letterScene.classList.add('active-scene');
            initTypewriter();
        }, 500);
    });

    // Keep showMemories as a fallback
    window.showMemories = function() {
        canvas.style.transition = 'opacity 2s ease';
        canvas.style.opacity = '0';
        setTimeout(() => {
            canvas.style.display = 'none';
            sceneContainer.classList.remove('hidden');
            document.body.classList.add('bg-gradient');
            initGiftBox();
        }, 2000);
    };

    window.nextScene = function() {
        document.getElementById(`scene-${currentScene}`).classList.remove('active-scene');
        document.getElementById(`scene-${currentScene}`).classList.add('hidden');
        
        currentScene++;
        
        if (currentScene <= totalScenes) {
            const next = document.getElementById(`scene-${currentScene}`);
            next.classList.remove('hidden');
            // Trigger reflow to restart animations
            void next.offsetWidth;
            next.classList.add('active-scene');
            
            // Initialize logic for specific scenes
            if(currentScene === 2) initTypewriter();
            if(currentScene === 3) initCinematicGallery();
        }
    };

    // --- Scene 1: Gift Box ---
    function initGiftBox() {
        const giftBox = document.getElementById('gift-box');
        giftBox.addEventListener('click', function() {
            this.classList.add('open');
            setTimeout(() => {
                document.querySelector('.gift-text').classList.remove('hidden');
                document.querySelector('#scene-1 .next-btn').classList.remove('hidden');
            }, 1000);
        });
    }

    // --- Scene 2: Typewriter ---
    function initTypewriter() {
        const text = `Dear Parami,

I've met a lot of people in my life. I've talked to many, worked with many, learned from many. But very few people have ever made me feel understood, challenged, cared for, and comfortable all at the same time.
(Very Few = You + Mom + Raheem)
You did.

There is something about you that is different.

Even now, you keep telling me not to care too much about you. You say things like that often. But honestly, I don't think I can do that. Not because I'm trying to be difficult, but because caring about you became natural to me.

And besides, you deserve to be cared for.

You deserve someone who notices when you're tired, who worries when you're carrying too much, who remembers the little things, and who wants to see you smile after a difficult day.

One of the things that surprises me the most about you is how you handle life.

I've seen what you've been through. I've seen the responsibilities you carry, the situations you've had to face, and the way you continue moving forward anyway.

Honestly, there are moments when I look at you and think, "How are you handling all of this so well?"

You handle things better than so many people I know.Even better than me.

And I admire that more than you realize.

I also love how deeply you feel things.

Your kindness.

Your patience.

Your confidence in the things you want.

The way you care for the people around you.

The way you can be playful one minute and emotionally deep the next.

The way you always seem to understand things that most people would miss.

And yes, I think you're unbelievably beautiful.

But there's something I've always wanted you to understand.

Sometimes you compare yourself to people from my past. Sometimes you tell me you're not perfect enough for me, or not up to some standard you think I have.

Honestly, I wish you could see yourself through my eyes.

I've seen beautiful girls before. Beauty alone was never something impossible to find.

But beauty without kindness means very little.

Beauty without a good heart fades quickly.

What makes you different is that you have both.

You're beautiful, and you have one of the most beautiful hearts I've ever known.

The way you care.

The way you understand.

The way you stay.

The way you love.

That's the part that makes you rare.

And that's why comparing yourself to anyone else never made sense to me.

You changed things in me.

You changed the way I look at certain situations.

You changed the way I think about the future.

You pushed me to study harder.

To work harder.

To think bigger.

To become better.

You know that.

I don't think I've ever told you enough how much I appreciate that.

The truth is, the feelings were never the complicated part.

Life is.

You know how much I want to achieve.

You know the goals I'm chasing.

You know how much pressure I put on myself.

And because of that, there are times when I worry.

There are times when I feel like I can't give enough.

There are times when I disappear into work, studies, plans, and responsibilities.

Not because I don't care.

Sometimes because I care too much.

And through all of that, you've stayed.

Thank you for that.

Thank you for understanding someone as complicated as me.

You know exactly what I mean when I say that.

Thank you for your patience.

Thank you for believing in me.

Thank you for staying beside me even when things weren't simple.

I don't know exactly what the future looks like.

Actually, I know what I want my future to look like, but life has its own plans too.

What I do know is this:

I'm really glad you're here.

I'm really glad I met you.

And I'm really glad that some of my favorite memories have you in them.

I want more of those memories.

More conversations.

More laughs.

More random moments.

More sunsets.

More versions of us that haven't happened yet.

And there's something I've been trying to ask you lately.

If one day we met again as complete strangers, and I remembered nothing about us while you remembered everything...

Whatever your answer is, I'll choose you again again and again.

Every single time.

Love,
Shehan ❤️`;
        const el = document.getElementById('typewriter-text');
        el.innerHTML = '';
        let i = 0;
        function type() {
            if (i < text.length) {
                el.innerHTML += text.charAt(i) === '\n' ? '<br>' : text.charAt(i);
                i++;
                // Auto-scroll the parchment as text grows
                el.parentElement.scrollTop = el.parentElement.scrollHeight;
                setTimeout(type, 25);
            } else {
                document.getElementById('letter-next-btn').classList.remove('hidden');
            }
        }
        setTimeout(type, 500);
    }

    // --- Scene 3: Infinite Cinematic Scroll ---
    function initCinematicGallery() {
        const images = [
            "1.jpeg",
            "2.jpeg",
            "3.jpeg",
            "4.jpeg",
            "5.jpeg",
            "14.jpeg",
            "6.jpeg",
            "7.jpeg",
            "8.jpeg",
            "9.jpeg",
            "10.jpeg",
            "11.jpeg",
            "12.jpeg",
            "13.jpeg"
        ];

        const grid = document.getElementById('masonry-grid');
        const scrollContainer = document.getElementById('gallery-scroll-container');
        const modal = document.getElementById('photo-modal');
        const modalImage = document.getElementById('modal-image');
        const closeBtn = document.getElementById('close-modal-btn');

        grid.innerHTML = ''; // Clear just in case

        // Mobile uses 2 columns, Desktop uses 3
        const colCount = window.innerWidth <= 600 ? 2 : 3;
        const columns = [];
        for (let i = 0; i < colCount; i++) {
            const col = document.createElement('div');
            col.className = 'masonry-column';
            grid.appendChild(col);
            columns.push(col);
        }

        let imgIndex = 0;
        let colIndex = 0;

        const captions = {
            "default": `
                <p class="quote-line">A kiss, a touch, a song that made me cry</p>
                <p class="quote-line">The drugs I've done, they never got me higher</p>
                <p class="quote-line">Than the first time we met</p>
                <p class="quote-line highlight">There's nothing like the first time we met</p>
            `,
            "1.jpeg": `
                <p class="quote-line">Oh my beautiful zombie lady, the only one I adore,</p>
                <p class="quote-line">come and take me under so we can live on and on,</p>
                <p class="quote-line">forever yours, dancing together on the other side</p>
                <p class="quote-line highlight">where I wanna play in the dark with you.</p>
            `,
            "3.jpeg": `
                <p class="quote-line">නෙත් පෙරුම් පුරයි දකින්න</p>
                <p class="quote-line">දිව්‍යාංගනාවිය යළි වඩින්න</p>
                <p class="quote-line">වැස්සක් වෙලා හයියෙන් වහින්න</p>
                <p class="quote-line highlight">ඈත් වෙන්න එපා ඉන්න ලඟින් ම</p>
                <p class="quote-line">ආදරෙන් හිස පිරිමදින්න</p>
                <p class="quote-line">සීමාවන් බිඳ දමා හරින්න</p>
                <p class="quote-line">බැඳෙමින් මා සමඟින් තදින් ම</p>
                <p class="quote-line highlight">නවතින්න මා ළඟම ඉන්න</p>
            `,
            "5.jpeg": `
                <p class="quote-line">දෙවියෝ ඇති තරම් කල් අරන් අඹන්න ඇගේ රූපේ</p>
                <p class="quote-line highlight">ඇඳුනොත් හිතේ එක් වරක් මැකෙන්නෑ පින්තූරේ</p>
            `,
            "9.jpeg": `
                <p class="quote-line">Oh my beautiful zombie lady, the only one I adore,</p>
                <p class="quote-line">come and take me under so we can live on and on,</p>
                <p class="quote-line">forever yours, dancing together on the other side</p>
                <p class="quote-line highlight">where I wanna play in the dark with you.</p>
            `,
            "14.jpeg": `
                <p class="quote-line">Does it turn you on when I turn you around, can we make a scene,</p>
                <p class="quote-line">you said you're scared I'll let you down but just stick around,</p>
                <p class="quote-line">I like the way you kiss me, I can tell you miss me</p>
                <p class="quote-line highlight">'cause I'm so proud of you.</p>
            `,
            "11.jpeg": `
                <p class="quote-line">Maybe it's the way that you breathe in me, maybe it's the fragrance of your hair,</p>
                <p class="quote-line">yeah I just wanna kiss you when you're there, I just want you all around me baby,</p>
                <p class="quote-line">can we make that happen please,</p>
                <p class="quote-line highlight">even if you leave I may be fine 'cause you're all that I need.</p>
            `,
            "13.jpeg": `
                <p class="quote-line">A kiss, a touch, a song that made me cry</p>
                <p class="quote-line">The drugs I've done, they never got me higher</p>
                <p class="quote-line">Than the first time we met</p>
                <p class="quote-line highlight">There's nothing like the first time we met</p>
            `,
            "4.jpeg": `
                <p class="quote-line">Rolled you weed and kissed your face, man wanna smoke you out like all-day,</p>
                <p class="quote-line">man wanna do a quickie in the hallway, frame my life and take my soul,</p>
                <p class="quote-line">save me roses,</p>
                <p class="quote-line highlight">you're just one click away from something real or fake.</p>
            `
        };

        // Function to dynamically append photos for true infinite scrolling
        function appendBatch(multiplier = 2) {
            for (let i = 0; i < images.length * multiplier; i++) {
                const imgSrc = images[imgIndex % images.length];
                
                const item = document.createElement('div');
                item.className = 'gallery-item';

                const img = document.createElement('img');
                img.src = `assets/images/${imgSrc}`;
                img.alt = "Memory";
                img.loading = "lazy"; // Important for infinite scroll performance

                item.appendChild(img);
                
                // Add magical frame glow ONLY if this image has a hidden custom quote
                if (captions[imgSrc]) {
                    item.classList.add('has-quote-glow');
                }

                // Handle clicking to open the modal
                item.addEventListener('click', () => {
                    modalImage.src = `assets/images/${imgSrc}`;
                    
                    const captionContainer = document.querySelector('.modal-caption');
                    if(captionContainer) {
                        captionContainer.innerHTML = captions[imgSrc] || captions["default"];
                    }
                    
                    modal.classList.remove('hidden');
                });

                // Add to shortest column (or round-robin)
                columns[colIndex % colCount].appendChild(item);
                
                imgIndex++;
                colIndex++;
            }
        }

        // Initial population (4 batches = 52 images)
        appendBatch(4);

        // Infinite scroll logic
        scrollContainer.addEventListener('scroll', () => {
            if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 500) {
                appendBatch(2); // load more when near bottom
            }
        });

        // Close Photo Modal logic
        closeBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        modal.addEventListener('click', (e) => {
            if(e.target === modal) modal.classList.add('hidden');
        });

        // --- Final Surprise Logic ---
        const finalHeartBtn = document.getElementById('final-heart-btn');
        const finalNoteModal = document.getElementById('final-note-modal');

        // Show heart button after 10 seconds
        setTimeout(() => {
            finalHeartBtn.classList.remove('hidden');
        }, 10000);

        // Open final note
        finalHeartBtn.addEventListener('click', () => {
            finalNoteModal.classList.remove('hidden');
        });

        // Close final note (via clicking background)
        finalNoteModal.addEventListener('click', (e) => {
            if (e.target === finalNoteModal) {
                finalNoteModal.classList.add('hidden');
            }
        });

        // Auto-scroll logic (Cinematic drift)
        let scrollPos = 0;
        let isPaused = false;
        let animationFrameId;

        // Pause scroll on hover over the grid
        grid.addEventListener('mouseenter', () => isPaused = true);
        grid.addEventListener('mouseleave', () => isPaused = false);
        
        // Also pause if they scroll manually
        scrollContainer.addEventListener('wheel', () => isPaused = true, { passive: true });
        scrollContainer.addEventListener('touchstart', () => isPaused = true, { passive: true });
        
        // Resume auto-scroll after a few seconds of no interaction
        let resumeTimeout;
        const resetResumeTimer = () => {
            clearTimeout(resumeTimeout);
            resumeTimeout = setTimeout(() => { isPaused = false; }, 2000);
        };
        scrollContainer.addEventListener('wheel', resetResumeTimer, { passive: true });
        scrollContainer.addEventListener('touchstart', resetResumeTimer, { passive: true });

        function driftUp() {
            if (!isPaused) {
                // Adjust speed by changing the increment
                scrollPos += 0.6;
                scrollContainer.scrollTop = scrollPos;
            } else {
                // Keep scrollPos synced with manual scrolling
                scrollPos = scrollContainer.scrollTop;
            }
            
            // True Infinite Scroll: Add more images when we get near the bottom!
            // No jumping, just endless scrolling.
            if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 1500) {
                appendBatch(2); // Seamlessly append more
            }
            
            animationFrameId = requestAnimationFrame(driftUp);
        }

        // Start drifting
        driftUp();
    }
});
