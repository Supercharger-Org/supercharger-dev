import { loadStylesheet, loadScript } from 'https://supercharger-dev.vercel.app/utilities/external-script-loader.js';
import { getSwiperInstance } from 'https://supercharger-dev.vercel.app/home/scripts/staging/swiper-order-form.js'; // Import the Swiper instance

// Step 1: Load Flatpickr CSS
loadStylesheet("https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css", () => {
});

// Step 2: Load Flatpickr JS
loadScript("https://cdn.jsdelivr.net/npm/flatpickr", () => {

  const waitForSwiper = () => {
    const swiper = getSwiperInstance();
    if (swiper) {
      setupFlatpickr(swiper); // Call your Flatpickr setup logic
    } else {
      setTimeout(waitForSwiper, 500); // Retry after 500ms
    }
  };

  const setupFlatpickr = (swiper) => {

    const initializeFlatpickrOnActiveSlide = () => {

      // Get active slide
      const activeSlide = swiper.slides[swiper.activeIndex];
      if (!activeSlide) {
        console.error("No active slide found.");
        return;
      }


      // Look for the inputs inside the active slide
      const dateInput = activeSlide.querySelector("[wized='home_orderForm_date_input']");
      const priorityDateInput = activeSlide.querySelector("[wized='home_orderForm_date_priorityDateInput']");

      // Choose the input to initialize Flatpickr on
      const targetInput = dateInput || priorityDateInput;

      if (!targetInput) {
        console.warn("No date input or priority date input found in the active slide.");
        return;
      }

      try {
        // Destroy any existing Flatpickr instance
        if (targetInput._flatpickr) {
          targetInput._flatpickr.destroy();
        }

        // Initialize Flatpickr
        flatpickr(targetInput, {
          dateFormat: "m-d-Y",
          onChange: (selectedDates, dateStr) => {
          },
        });

      } catch (error) {
        console.error("Error initializing Flatpickr:", error);
      }
    };

    // Attach to Swiper's slide change event
    swiper.on('slideChange', () => {
      initializeFlatpickrOnActiveSlide();
    });

    // Initial Flatpickr setup for the current active slide
    initializeFlatpickrOnActiveSlide();
  };

  // Wait for Swiper instance to be ready
  waitForSwiper();
});
