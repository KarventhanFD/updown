const albums = [
            {
                id: 1,
                title: "Wedding Photography",
                description: "Beautiful moments from our latest wedding shoot",
                coverImage: "img-1.jpg",
                images: [
                    "gallery-1.jpg",
                    "gallery-2.jpg",
                    "gallery-3.jpg",
                    "gallery-4.jpg",
                    "gallery-5.jpg"
                ],
                photoCount: 24,
                date: "June 2023",
                category: "wedding"
            },
            {
                id: 2,
                title: "Portrait Series",
                description: "Stunning portrait collection",
                coverImage: "gallery-2.jpg",
                images: [
                    "gallery-2.jpg",
                    "gallery-3.jpg",
                    "gallery-4.jpg",
                    "gallery-14.jpg",
                    "gallery-12.jpg"
                ],
                photoCount: 18,
                date: "May 2023",
                category: "portrait"
            },
            {
                id: 3,
                title: "Nature & Landscape",
                description: "Breathtaking views from around the world",
                coverImage: "gallery-3.jpg",
                images: [
                    "gallery-3.jpg",
                    "gallery-4.jpg",
                    "gallery-5.jpg",
                    "gallery-6.jpg",
                    "gallery-7.jpg"
                ],
                photoCount: 32,
                date: "April 2023",
                category: "landscape"
            },
            {
                id: 4,
                title: "Urban Exploration",
                description: "Cityscapes and street photography",
                coverImage: "gallery-4.jpg",
                images: [
                    "gallery-4.jpg",
                    "gallery-5.jpg",
                    "gallery-6.jpg",
                    "gallery-7.jpg",
                    "gallery-8.jpg"
                ],
                photoCount: 22,
                date: "March 2023",
                category: "urban"
            },
            {
                id: 5,
                title: "Wildlife Adventures",
                description: "Capturing nature's magnificent creatures",
                coverImage: "gallery-5.jpg",
                images: [
                    "gallery-5.jpg",
                    "gallery-6.jpg",
                    "gallery-7.jpg",
                    "gallery-8.jpg",
                    "gallery-9.jpg"
                ],
                photoCount: 15,
                date: "February 2023",
                category: "wildlife"
            },
            {
                id: 6,
                title: "Fashion Editorial",
                description: "Latest fashion trends and styles",
                coverImage: "gallery-6.jpg",
                images: [
                    "gallery-6.jpg",
                    "gallery-7.jpg",
                    "gallery-8.jpg",
                    "gallery-9.jpg",
                    "gallery-10.jpg"
                ],
                photoCount: 28,
                date: "January 2023",
                category: "fashion"
            },
            {
                id: 7,
                title: "Food Photography",
                description: "Delicious culinary creations",
                coverImage: "gallery-7.jpg",
                images: [
                    "gallery-7.jpg",
                    "gallery-8.jpg",
                    "gallery-9.jpg",
                    "gallery-10.jpg",
                    "gallery-11.jpg"
                ],
                photoCount: 20,
                date: "December 2022",
                category: "food"
            },
            {
                id: 8,
                title: "Travel Diaries",
                description: "Journeys across continents",
                coverImage: "gallery-11.jpg",
                images: [
                    "gallery-11.jpg",
                    "gallery-10.jpg",
                    "gallery-9.jpg",
                    "gallery-8.jpg",
                    "gallery-7.jpg"
                ],
                photoCount: 35,
                date: "November 2022",
                category: "travel"
            },
            {
                id: 9,
                title: "Black & White",
                description: "Timeless monochrome photography",
                coverImage: "gallery-9.jpg",
                images: [
                    "gallery-9.jpg",
                    "gallery-8.jpg",
                    "gallery-7.jpg",
                    "gallery-6.jpg",
                    "gallery-5.jpg"
                ],
                photoCount: 25,
                date: "October 2022",
                category: "monochrome"
            }
        ];

        // Function to create album HTML
        function createAlbumElement(album) {
            return `
                <div class="bg-[#C4B5FD] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div class="relative overflow-hidden">
                        <img src="../Gallery/Home page/${album.coverImage}" alt="${album.title}" class="w-full album-image hover:scale-110">
                        <div class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                            <button class="view-album text-white text-lg font-semibold bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-full transition-colors duration-300" data-album-id="${album.id}">View Album</button>
                        </div>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-semibold text-gray-800 mb-2">${album.title}</h3>
                        <p class="text-gray-600 mb-4">${album.description}</p>
                        <div class="flex justify-between items-center text-sm text-gray-500">
                            <span><i class="fas fa-images mr-1"></i> ${album.photoCount} photos</span>
                            <span><i class="fas fa-calendar-alt mr-1"></i> ${album.date}</span>
                        </div>
                    </div>
                </div>
            `;
        }

        // Function to render albums
        function renderAlbums() {
            const container = document.getElementById('album-container');
            container.innerHTML = albums.map(album => createAlbumElement(album)).join('');
            
            // Add event listeners to all view album buttons
            document.querySelectorAll('.view-album').forEach(button => {
                button.addEventListener('click', function() {
                    const albumId = parseInt(this.getAttribute('data-album-id'));
                    openAlbumPopup(albumId);
                });
            });
        }

        // Popup functionality
        let currentAlbum = null;
        let currentImageIndex = 0;
        
        const popupOverlay = document.getElementById('popup-overlay');
        const popupImage = document.getElementById('popup-image');
        const popupCounter = document.getElementById('popup-counter');
        const popupClose = document.getElementById('popup-close');
        const popupPrev = document.getElementById('popup-prev');
        const popupNext = document.getElementById('popup-next');
        
        function openAlbumPopup(albumId) {
            currentAlbum = albums.find(album => album.id === albumId);
            currentImageIndex = 0;
            updatePopupImage();
            popupOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
        
        function closePopup() {
            popupOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
        }
        
        function updatePopupImage() {
            if (!currentAlbum) return;
            
            const imagePath = `../Gallery/Home page/${currentAlbum.images[currentImageIndex]}`;
            popupImage.src = imagePath;
            popupImage.alt = `${currentAlbum.title} - Image ${currentImageIndex + 1}`;
            popupCounter.textContent = `${currentImageIndex + 1} of ${currentAlbum.images.length}`;
        }
        
        function showNextImage() {
            if (!currentAlbum) return;
            
            currentImageIndex = (currentImageIndex + 1) % currentAlbum.images.length;
            updatePopupImage();
        }
        
        function showPrevImage() {
            if (!currentAlbum) return;
            
            currentImageIndex = (currentImageIndex - 1 + currentAlbum.images.length) % currentAlbum.images.length;
            updatePopupImage();
        }
        
        // Event listeners for popup controls
        popupClose.addEventListener('click', closePopup);
        popupPrev.addEventListener('click', showPrevImage);
        popupNext.addEventListener('click', showNextImage);
        
        // Close popup when clicking outside the image
        popupOverlay.addEventListener('click', function(e) {
            if (e.target === popupOverlay) {
                closePopup();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (!popupOverlay.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                closePopup();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        });
        
        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        popupImage.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        popupImage.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            const threshold = 50; // Minimum swipe distance
            
            if (touchEndX < touchStartX - threshold) {
                // Swipe left - next image
                showNextImage();
            } else if (touchEndX > touchStartX + threshold) {
                // Swipe right - previous image
                showPrevImage();
            }
        }

        // Initialize the gallery when page loads
        document.addEventListener('DOMContentLoaded', renderAlbums);