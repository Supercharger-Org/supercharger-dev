import { getSwiperInstance } from 'https://supercharger-dev.vercel.app/home/scripts/staging/swiper-order-form.js';


const waitForSwiper = () => {
  const swiper = getSwiperInstance();
  if (swiper) {
    setupNavigation(swiper);
  } else {
    setTimeout(waitForSwiper, 500); // Retry after 500ms
  }
};

// Helper to validate and log results
const validateFieldGroup = (groupName, validator, currentSlide) => {
  const result = validator(currentSlide);
  return result;
};

// Validate radio inputs
const validateRadios = (currentSlide) => {
  const radios = currentSlide.querySelectorAll("input[type='radio']");
  
  if (radios.length === 0) {
    return true; // No radios to validate, return true
  }

  const isRadioChecked = Array.from(radios).some((radio) => {
    const parentLabel = radio.closest("label");
    return parentLabel && parentLabel.querySelector(".w-radio-input").classList.contains("w--redirected-checked");
  });

  const errorElement = currentSlide.querySelector(".form-field_error");
  if (!isRadioChecked) {
    if (errorElement) {
      errorElement.removeAttribute("custom-cloak"); // Show error
    }
    return false;
  } else {
    if (errorElement) {
      errorElement.setAttribute("custom-cloak", "true"); // Hide error
    }
    return true;
  }
};

// Helper function to validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation regex
  return emailRegex.test(email);
};

// Validate email inputs
const validateEmailInputs = (currentSlide) => {
  const emailInputs = currentSlide.querySelectorAll("input[type='email'][required]");
  let isValid = true;

  emailInputs.forEach((input) => {
    const errorElement = input.closest(".form-field_wrapper")?.querySelector(".form-field_error");
    if (!input.value.trim() || !isValidEmail(input.value.trim())) {
      if (errorElement) {
        errorElement.removeAttribute("custom-cloak"); // Show error
      }
      isValid = false;
    } else {
      if (errorElement) {
        errorElement.setAttribute("custom-cloak", "true"); // Hide error
      }
    }
  });

  return isValid;
};

// Validate text inputs
const validateTextInputs = (currentSlide) => {
  const inputs = currentSlide.querySelectorAll("input[type='text'][required], input[type='email'][required], input[type='number'][required]");
  let isValid = true;

  inputs.forEach((input) => {
    const errorElement = input.closest(".form-field_wrapper")?.querySelector(".form-field_error");
    if (!input.value.trim()) {
      if (errorElement) {
        errorElement.removeAttribute("custom-cloak"); // Show error
      }
      isValid = false;
    } else {
      if (errorElement) {
        errorElement.setAttribute("custom-cloak", "true"); // Hide error
      }
    }
  });

  return isValid;
};

// Validate textareas
const validateTextareas = (currentSlide) => {
  const textareas = currentSlide.querySelectorAll("textarea[required]");
  let isValid = true;

  textareas.forEach((textarea) => {
    const errorElement = textarea.closest(".form-field_wrapper")?.querySelector(".form-field_error");
    if (!textarea.value.trim()) {
      if (errorElement) {
        errorElement.removeAttribute("custom-cloak"); // Show error
      }
      isValid = false;
    } else {
      if (errorElement) {
        errorElement.setAttribute("custom-cloak", "true"); // Hide error
      }
    }
  });

  return isValid;
};

// Validate select inputs
const validateSelectInputs = (currentSlide) => {
  const selects = currentSlide.querySelectorAll("select[required]");
  let isValid = true;

  selects.forEach((select) => {
    const errorElement = select.closest(".form-field_wrapper")?.querySelector(".form-field_error");
    if (!select.value || select.value === "") {
      if (errorElement) {
        errorElement.removeAttribute("custom-cloak"); // Show error
      }
      isValid = false;
    } else {
      if (errorElement) {
        errorElement.setAttribute("custom-cloak", "true"); // Hide error
      }
    }
  });

  return isValid;
};

// Validate current slide
const validateCurrentSlide = (swiper) => {
  const currentSlide = swiper.slides[swiper.activeIndex];
  const isRadiosValid = validateFieldGroup("Radios", validateRadios, currentSlide);
  const isTextInputsValid = validateFieldGroup("Text Inputs", validateTextInputs, currentSlide);
  const isEmailInputsValid = validateFieldGroup("Email Inputs", validateEmailInputs, currentSlide);
  const isTextareasValid = validateFieldGroup("Textareas", validateTextareas, currentSlide);
  const isSelectsValid = validateFieldGroup("Selects", validateSelectInputs, currentSlide);

  const allValid = isRadiosValid && isTextInputsValid && isEmailInputsValid && isTextareasValid && isSelectsValid;
  console.log(`Overall validation result for slide ${swiper.activeIndex + 1}: ${allValid}`);
  return allValid;
};

const setupNavigation = (swiper) => {
  const formElement = document.querySelector('.order-form_wrapper');

  const scrollToTop = () => {
    if (formElement) {
      const offset = 300; // Adjust scroll position above the element
      const elementPosition = formElement.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  document.querySelectorAll('[wized="home_orderForm_navigation_next"]').forEach((nextButton) => {
    nextButton.addEventListener('click', () => {
      if (validateCurrentSlide(swiper)) {
        if (swiper.activeIndex < swiper.slides.length - 1) {
          swiper.slideNext();
          swiper.updateAutoHeight();
          scrollToTop(); // Scroll up after navigation
        } else {
          console.warn("Already on the last slide.");
        }
      } else {
        console.error("Validation failed. Staying on the current slide.");
      }
    });
  });

  document.querySelectorAll('[wized="home_orderForm_navigation_previous"]').forEach((prevButton) => {
    prevButton.addEventListener('click', () => {
      if (swiper.activeIndex > 0) {
        swiper.slidePrev();
        swiper.updateAutoHeight();
        scrollToTop(); // Scroll up after navigation
      } else {
        console.warn("Already on the first slide.");
      }
    });
  });

  swiper.on('slideChange', () => {
    swiper.updateAutoHeight();
  });

  document.querySelectorAll("input[type='radio'], input[type='text'], textarea, select").forEach((field) => {
    field.addEventListener('input', () => {
      const errorElement = field.closest(".form-field_wrapper")?.querySelector(".form-field_error");
      if (errorElement && field.value.trim() !== "") {
        errorElement.setAttribute("custom-cloak", "true");
      }
    });
  });
};


// Wait for Swiper instance to be ready
waitForSwiper();
