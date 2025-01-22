// Select all radio button containers
const radioButtons = document.querySelectorAll('.product-selection_radio-button');

if (!radioButtons.length) {
  console.error('No radio buttons found. Please check the HTML structure or the selector.');
} else {
  console.log(`Found ${radioButtons.length} radio buttons.`);
}

// Add event listeners to each radio button
radioButtons.forEach((radioButton, index) => {
  console.log(`Adding listeners to radio button ${index + 1}.`);

  // Get the label and input elements inside the current radio button
  const radioLabel = radioButton.querySelector('.product-selection_radio-label');
  const radioInput = radioButton.querySelector('input[type="radio"]');
  const radioSelect = radioButton.querySelector('.product-selection_radio-select');

  if (!radioLabel || !radioInput || !radioSelect) {
    console.error(`Required elements not found for radio button ${index + 1}. Skipping this button.`);
    return; // Skip further processing for this button
  }

  // Add hover event listeners only if the radio button is not disabled
  if (!radioButton.classList.contains('is-disabled')) {
    console.log(`Radio button ${index + 1} is enabled.`);

    // Mouseenter (hover) event
    radioButton.addEventListener('mouseenter', () => {
      try {
        const isSelected = radioSelect.classList.contains('w--redirected-checked');
        if (!isSelected) {
          radioLabel.classList.add('is-active');
        }
      } catch (error) {
        console.error(`Error in mouseenter for radio button ${index + 1}:`, error);
      }
    });

    // Mouseleave event
    radioButton.addEventListener('mouseleave', () => {
      try {
        const isSelected = radioSelect.classList.contains('w--redirected-checked');
        if (!isSelected) {
          radioLabel.classList.remove('is-active');
        }
      } catch (error) {
        console.error(`Error in mouseleave for radio button ${index + 1}:`, error);
      }
    });

    // Click event to handle selection
    radioButton.addEventListener('click', () => {
      console.log(`Radio button ${index + 1} clicked.`);

      try {
        // Deselect all other radio buttons
        radioButtons.forEach((btn, btnIndex) => {
          const otherInput = btn.querySelector('input[type="radio"]');
          const otherLabel = btn.querySelector('.product-selection_radio-label');
          const otherSelect = btn.querySelector('.product-selection_radio-select');

          if (otherInput && otherLabel && otherSelect) {
            otherInput.checked = false; // Uncheck the radio input
            otherSelect.classList.remove('w--redirected-checked'); // Remove the custom checked class
            otherLabel.classList.remove('is-active'); // Remove the active class
            console.log(`Radio button ${btnIndex + 1}: deselected.`);
          }
        });

        // Select the clicked radio button
        radioInput.checked = true; // Check the radio input
        radioSelect.classList.add('w--redirected-checked'); // Add the custom checked class
        radioLabel.classList.add('is-active'); // Add the active class
        console.log(`Radio button ${index + 1}: selected.`);
      } catch (error) {
        console.error(`Error in click event for radio button ${index + 1}:`, error);
      }
    });
  } else {
    console.error(`Radio button ${index + 1} is disabled. Skipping listeners.`);
  }
});
