// Select all radio button containers
const radioButtons = document.querySelectorAll('.product-selection_radio-button');

if (!radioButtons.length) {
  console.error('No radio buttons found. Please check the HTML structure or the selector.');
} else {
  //console.log(`Found ${radioButtons.length} radio buttons.`);
}

// Add event listeners to each radio button
radioButtons.forEach((radioButton, index) => {
  //console.log(`Adding listeners to radio button ${index + 1}.`);

  // Get the label and input elements inside the current radio button
  const radioLabel = radioButton.querySelector('.product-selection_radio-label');
  const radioInput = radioButton.querySelector('.product-selection_radio-select');

  if (!radioLabel || !radioInput) {
    console.error(`Radio label or input not found for radio button ${index + 1}. Skipping this button.`);
    return; // Skip further processing for this button
  }

  // Add hover event listeners only if the radio button is not disabled
  if (!radioButton.classList.contains('is-disabled')) {
    //console.log(`Radio button ${index + 1} is enabled.`);

    // Mouseenter (hover) event
    radioButton.addEventListener('mouseenter', () => {
      try {
        // Check if the radio button is already selected
        const isSelected = radioInput.classList.contains('w--redirected-checked');
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
        // Check if the radio button is selected
        const isSelected = radioInput.classList.contains('w--redirected-checked');
        if (!isSelected) {
          radioLabel.classList.remove('is-active');
        }
      } catch (error) {
        console.error(`Error in mouseleave for radio button ${index + 1}:`, error);
      }
    });

    // Click event to handle selection
    radioButton.addEventListener('click', () => {
      try {
        // Remove 'is-active' class and uncheck all other radio inputs
        radioButtons.forEach((btn, btnIndex) => {
          const label = btn.querySelector('.product-selection_radio-label');
          const input = btn.querySelector('.product-selection_radio-select');
          if (label && input) {
            label.classList.remove('is-active');
            input.checked = false; // Uncheck other radio buttons
          } else {
            console.error(`Radio label or input not found for radio button ${btnIndex + 1} during click processing.`);
          }
        });

        // Check the clicked radio input and add 'is-active' class to its label
        radioInput.checked = true; // Programmatically select the radio input
        radioLabel.classList.add('is-active');
        console.log(`Radio button ${index + 1} selected and is-active class added.`);
      } catch (error) {
        console.error(`Error in click event for radio button ${index + 1}:`, error);
      }
    });
  } else {
    console.error(`Radio button ${index + 1} is disabled. Skipping listeners.`);
  }
});
