// Select all radio button containers
const radioButtons = document.querySelectorAll('.product-selection_radio-button');

if (!radioButtons.length) {
  console.error('No radio buttons found. Please check the HTML structure or the selector.');
} else {
}

// Add event listeners to each radio button
radioButtons.forEach((radioButton, index) => {

  // Get the label element inside the current radio button
  const radioLabel = radioButton.querySelector('.product-selection_radio-label');
  if (!radioLabel) {
    console.error(`Radio label not found for radio button ${index + 1}. Skipping this button.`);
    return; // Skip further processing for this button
  }

  // Add hover event listeners only if the radio button is not disabled
  if (!radioButton.classList.contains('is-disabled')) {

    // Mouseenter (hover) event
    radioButton.addEventListener('mouseenter', () => {
      
      try {
        // Check if the radio button is already selected
        const isSelected = radioButton.querySelector('.product-selection_radio-select').classList.contains('w--redirected-checked');
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
        const isSelected = radioButton.querySelector('.product-selection_radio-select').classList.contains('w--redirected-checked');
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
        // Remove 'is-active' class from all labels
        radioButtons.forEach((btn, btnIndex) => {
          const label = btn.querySelector('.product-selection_radio-label');
          if (label) {
            label.classList.remove('is-active');
          } else {
            console.error(`Radio label not found for radio button ${btnIndex + 1} during click processing.`);
          }
        });

        // Add 'is-active' class to the clicked button's label
        radioLabel.classList.add('is-active');
      } catch (error) {
        console.error(`Error in click event for radio button ${index + 1}:`, error);
      }
    });
  } else {
    console.error(`Radio button ${index + 1} is disabled. Skipping listeners.`);
  }
});
