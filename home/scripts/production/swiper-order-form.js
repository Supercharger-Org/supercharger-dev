// Define the base URL
const BASE_URL = "https://supercharger-dev.vercel.app";

let swiperInstance; // Declare Swiper instance

// Dynamically import utilities
Promise.all([
  import(`${BASE_URL}/utilities/external-script-loader.js`),
  import(`${BASE_URL}/utilities/custom-css.js`)
])
  .then(([{ loadStylesheet, loadScript }, { addCustomStyles }]) => {
    try {
      // Add custom CSS for Swiper navigation buttons
      addCustomStyles(`
        .swiper-button-next::after,
        .swiper-button-prev::after {
          display: none; /* Hide the default arrow icons */
        }
      `);
    } catch (error) {
      console.error("Failed to add custom styles for Swiper navigation buttons:", error);
    }

    try {
      // Load Swiper CSS
      loadStylesheet(
        "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css",
        () => {
        }
      );
    } catch (error) {
      console.error("Failed to load Swiper CSS:", error);
    }

    try {
      // Load Swiper JS
      loadScript(
        "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js",
        () => {

          // Initialize Swiper
          try {
            swiperInstance = new Swiper('.order-form_wrapper', {
              loop: false, // No looping for a multistep form
              slidesPerView: 1, // Show one step at a time
              spaceBetween: 0, // No spacing between slides
              allowTouchMove: false, // Prevent manual swiping
              autoHeight: true, // Automatically adjust height based on content
              effect: 'fade',
            });


            // Observe changes in the Swiper slides to adjust height dynamically
            const swiperSlides = document.querySelectorAll('.order-form_wrapper .swiper-slide');
            swiperSlides.forEach((slide, index) => {
              const observer = new MutationObserver(() => {
                swiperInstance.updateAutoHeight(0); // Update Swiper height
              });

              observer.observe(slide, {
                childList: true, // Watch for added/removed child elements
                attributes: true, // Watch for attribute changes
                subtree: true, // Watch all descendants
              });

            });
          } catch (error) {
            console.error("Failed to initialize Swiper:", error);
          }
        }
      );
    } catch (error) {
      console.error("Failed to load Swiper JS:", error);
    }
  })
  .catch((error) => {
    console.error("Failed to dynamically import utilities:", error);
  });

// Export a function to retrieve the Swiper instance
export const getSwiperInstance = () => {
  if (!swiperInstance) {
    console.warn("Swiper instance is not yet initialized.");
  }
  return swiperInstance;
};
