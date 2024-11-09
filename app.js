let items = document.querySelectorAll('.slider .item');
        let active = 0; // Start with the first item

        function loadShow() {
            items.forEach((item) => {
                item.style.transform = `translateX(0) scale(1)`;
                item.style.zIndex = 0;
                item.style.filter = 'none';
                item.style.opacity = 0; // Hide all initially
            });

            items[active].style.transform = `none`;
            items[active].style.zIndex = 1; // Bring the active item to the front
            items[active].style.filter = 'none';
            items[active].style.opacity = 1; // Make the active item visible

            let stt = 0;

            // Show items after the active one
            for (let i = active + 1; i < items.length; i++) {
                stt++;
                items[i].style.transform = `translateX(${120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
                items[i].style.zIndex = -stt; // Stack behind the active item
                items[i].style.filter = 'blur(5px)';
                items[i].style.opacity = stt > 2 ? 0 : 0.6; // Fade out items that are far
            }

            stt = 0;
            // Show items before the active one
            for (let i = active - 1; i >= 0; i--) {
                stt++;
                items[i].style.transform = `translateX(${-120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
                items[i].style.zIndex = -stt; // Stack behind the active item
                items[i].style.filter = 'blur(5px)';
                items[i].style.opacity = stt > 2 ? 0 : 0.6; // Fade out items that are far
            }
        }

        // Initial call to load the first item
        loadShow();

        let next = document.getElementById('next');
        let prev = document.getElementById('prev');

        // Next button functionality
        next.onclick = function() {
            active = (active + 1) % items.length; // Cycle to the first item if at the end
            loadShow();
        }

        // Previous button functionality
        prev.onclick = function() {
            active = (active - 1 + items.length) % items.length; // Cycle to the last item if at the beginning
            loadShow();
        }