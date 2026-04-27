// Embedded JSON data with dummy images
    const albumsData = {
      "albums": [
        {
          "id": "varun-sindhu",
          "title": "Varun & Sindhu",
          "events": ["Wedding", "Engagement"],
          "featuredImage": "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=500&fit=crop",
          "slides": [
            "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=400&fit=crop"
          ],
          "color": "#f5dbd6"
        },
        {
          "id": "rakesh-priya",
          "title": "Rakesh & Priya",
          "events": ["Haldi", "Mehendi"],
          "featuredImage": "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=400&h=500&fit=crop",
          "slides": [
            "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1507504034443-144535e5bc54?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1520854221256-17451cc330e7?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?w=600&h=400&fit=crop"
          ],
          "color": "#d6e4ff"
        },
        {
          "id": "arun-anjali",
          "title": "Arun & Anjali",
          "events": ["Wedding", "Reception"],
          "featuredImage": "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&h=500&fit=crop",
          "slides": [
            "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1507504034443-144535e5bc54?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1520854221256-17451cc330e7?w=600&h=400&fit=crop"
          ],
          "color": "#ffe6f0"
        },
        {
          "id": "suresh-lakshmi",
          "title": "Suresh & Lakshmi",
          "events": ["Traditional", "Wedding"],
          "featuredImage": "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?w=400&h=500&fit=crop",
          "slides": [
            "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&h=400&fit=crop"
          ],
          "color": "#e6fff5"
        }
      ]
    };

    document.addEventListener('DOMContentLoaded', function() {
      const container = document.getElementById('albums-container');
      
      // Create each album
      albumsData.albums.forEach((album, index) => {
        const isEven = index % 2 === 0;
        
        const albumHTML = `
<div class="flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} w-full album-container max-w-[1200px] mx-auto gap-8 lg:gap-12">
    
    <!-- Static Image Side -->
    <div class="relative w-full lg:w-2/5 image-side flex items-center ${isEven ? 'justify-end lg:justify-end' : 'justify-start lg:justify-start'} px-4 md:px-6" style="background-color: ${album.color}">
        <div class="offset-position ${isEven ? 'lg:right-[-60px] xl:right-[-80px]' : 'lg:left-[-60px] xl:left-[-80px]'} bg-white shadow-lg p-4 featured-image-container rounded z-10">
            <img 
                src="${album.featuredImage}" 
                alt="${album.title}" 
                class="w-full h-full object-cover rounded"
                loading="lazy" 
                decoding="async" 
            />
        </div>
    </div>

    <!-- Slideshow Side -->
    <div class="flex flex-col justify-center w-full lg:w-3/5 text-white content-side px-4 md:px-8 mt-20">
        <div class="w-full mx-auto flex flex-col items-center">
            
            <!-- Title Above Slideshow -->
            <div class="text-center mb-6 w-full">
                <h2 class="text-3xl md:text-4xl font-serif font-semibold">${album.title}</h2>
                <p class="text-lg md:text-xl font-light mt-2">
                    ${album.events.map(event => `<span>${event}</span>`).join('<span class="mx-1">|</span>')}
                </p>
            </div>
            
            <!-- Slideshow -->
            <div class="relative slideshow-container overflow-hidden rounded shadow-lg w-full max-w-[500px]">
                <div class="relative w-full h-full" id="slideshow-${album.id}">
                    ${album.slides.map((slide, slideIndex) => `
                        <div class="slide absolute inset-0 w-full h-full ${slideIndex === 0 ? '' : 'opacity-0'}">
                            <img 
                                src="${slide}"
                                alt="Slide ${slideIndex + 1}" 
                                class="w-full h-full object-cover"
                                loading="lazy"
                                decoding="async"
                            />
                            <div class="gradient-overlay absolute inset-0"></div>
                        </div>
                    `).join('')}
                </div>

                <!-- Navigation Dots -->
                <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
                    ${album.slides.map((_, slideIndex) => `
                        <button 
                            class="w-3 h-3 rounded-full bg-white ${slideIndex === 0 ? 'bg-opacity-100' : 'bg-opacity-70'} hover:bg-opacity-100 dot-btn" 
                            data-slide="${slideIndex}" 
                            data-slideshow="slideshow-${album.id}">
                        </button>
                    `).join('')}
                </div>
            </div>
        </div>
    </div>
</div>
`;

        
        
        container.insertAdjacentHTML('beforeend', albumHTML);
      });
      
      // Initialize all slideshows
      initializeSlideshows();
      
      // Mobile menu functionality
      const menuBtn = document.getElementById('menu-btn');
      const mobileMenu = document.getElementById('mobile-menu');
      const closeMenu = document.getElementById('close-menu');
      
      menuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');
      });
      
      closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('translate-x-full');
      });
    });

    function initializeSlideshows() {
      document.querySelectorAll('[id^="slideshow-"]').forEach(container => {
        const slideshowId = container.id;
        let currentIndex = 0;
        let interval = null;
        const slides = container.querySelectorAll('.slide');
        const dots = document.querySelectorAll(`#${slideshowId} + div .dot-btn`);

        function showSlide(index) {
          currentIndex = (index + slides.length) % slides.length;
          
          slides.forEach((slide, i) => {
            slide.style.opacity = i === currentIndex ? '1' : '0';
          });
          
          dots.forEach((dot, i) => {
            dot.classList.toggle('bg-opacity-100', i === currentIndex);
            dot.classList.toggle('bg-opacity-70', i !== currentIndex);
          });
        }

        function startSlideshow() {
          clearInterval(interval);
          interval = setInterval(() => {
            showSlide(currentIndex + 1);
          }, 3000);
        }

        // Initialize
        showSlide(0);
        startSlideshow();
        
        // Pause on hover
        container.parentElement.addEventListener('mouseenter', () => {
          clearInterval(interval);
        });
        container.parentElement.addEventListener('mouseleave', () => {
          startSlideshow();
        });
        
        // Dot navigation
        dots.forEach(dot => {
          dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.getAttribute('data-slide'));
            showSlide(slideIndex);
          });
        });
      });
    }