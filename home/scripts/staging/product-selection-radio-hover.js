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
  const radioInput = radioButton.querySelector('.product-selection_radio-select');

  if (!radioLabel || !radioInput) {
    console.error(`Radio label or input not found for radio button ${index + 1}. Skipping this button.`);
    return; // Skip further processing for this button
  }

  // Add hover event listeners only if the radio button is not disabled
  if (!radioButton.classList.contains('is-disabled')) {
    console.log(`Radio button ${index + 1} is enabled.`);

    // Mouseenter (hover) event
    radioButton.addEventListener('mouseenter', () => {
      if (!radioInput.checked) {
        radioLabel.classList.add('is-active');
        console.log(`Radio button ${index + 1} hover: added 'is-active' class.`);
      }
    });

    // Mouseleave event
    radioButton.addEventListener('mouseleave', () => {
      if (!radioInput.checked) {
        radioLabel.classList.remove('is-active');
        console.log(`Radio button ${index + 1} hover: removed 'is-active' class.`);
      }
    });

    // Click event to handle selection
    radioButton.addEventListener('click', () => {
      console.log(`Radio button ${index + 1} clicked.`);

      // Ensure the corresponding input gets selected
      if (!radioInput.checked) {
        radioInput.checked = true; // Check the current input
        console.log(`Radio button ${index + 1}: input checked.`);
      }

      // Remove 'is-active' class and uncheck other radio inputs
      radioButtons.forEach((btn, btnIndex) => {
        const label = btn.querySelector('.product-selection_radio-label');
        const input = btn.querySelector('.product-selection_radio-select');
        if (label && input) {
          if (btn === radioButton) {
            label.classList.add('is-active'); // Add 'is-active' to the clicked button
            console.log(`Radio button ${index + 1}: added 'is-active' class.`);
          } else {
            input.checked = false; // Deselect other inputs
            label.classList.remove('is-active'); // Remove 'is-active' from other buttons
            console.log(`Radio button ${btnIndex + 1}: removed 'is-active' class.`);
          }
        }
      });
    });
  } else {
    console.error(`Radio button ${index + 1} is disabled. Skipping listeners.`);
  }
});
