const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const hero = document.getElementById('hero');
        const dot = document.getElementById('dot');
        const ring = document.getElementById('ring');

        let particles = [];
        let animationID;
        const mouse = { x: -1000, y: -1000, radius: 150 };

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        }

        // LÓGICA DE MOVIMENTO E VISIBILIDADE
        window.addEventListener('mousemove', (e) => {
            const heroRect = hero.getBoundingClientRect();
            
            // Verifica se o rato está dentro dos limites do Hero
            if (e.clientY >= heroRect.top && e.clientY <= heroRect.bottom) {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
                
                // Mostra cursor personalizado
                dot.style.opacity = "1";
                ring.style.opacity = "1";
                
                // Posicionamento
                dot.style.left = e.clientX + 'px';
                dot.style.top = e.clientY + 'px';
                ring.style.left = e.clientX + 'px';
                ring.style.top = e.clientY + 'px';
            } else {
                // Esconde cursor personalizado ao cruzar a borda
                dot.style.opacity = "0";
                ring.style.opacity = "0";
                // Move o ponto de interação para longe das partículas
                mouse.x = -1000;
                mouse.y = -1000;
            }
        });

        // Suporte para Touch (Deslize)
        window.addEventListener('touchmove', (e) => {
            const touch = e.touches[0];
            const heroRect = hero.getBoundingClientRect();

            if (touch.clientY <= heroRect.bottom) {
                mouse.x = touch.clientX;
                mouse.y = touch.clientY;
                dot.style.opacity = "1";
                ring.style.opacity = "1";
                dot.style.left = touch.clientX + 'px';
                dot.style.top = touch.clientY + 'px';
            } else {
                dot.style.opacity = "0";
                ring.style.opacity = "0";
                mouse.x = -1000;
            }
        }, { passive: true });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5 + 0.5;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 25) + 2;
            }
            draw() {
                ctx.fillStyle = 'rgba(212, 175, 55, 0.7)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
            update() {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    let force = (mouse.radius - distance) / mouse.radius;
                    let directionX = (dx / distance) * force * this.density;
                    let directionY = (dy / distance) * force * this.density;
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    this.x -= (this.x - this.baseX) / 20;
                    this.y -= (this.y - this.baseY) / 20;
                }
            }
        }

        function init() {
            particles = [];
            const numberOfParticles = (canvas.width * canvas.height) / 3500;
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        }

        function connect() {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    let dx = particles[a].x - particles[b].x;
                    let dy = particles[a].y - particles[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        ctx.strokeStyle = `rgba(212, 175, 55, ${0.15 * (1 - distance/100)})`;
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            connect();
            animationID = requestAnimationFrame(animate);
        }

        // Observer para pausar animação fora de vista
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) animate();
                else cancelAnimationFrame(animationID);
            });
        }, { threshold: 0.01 });

        observer.observe(hero);
        window.addEventListener('resize', resize);
        resize();