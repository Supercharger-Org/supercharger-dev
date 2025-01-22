// Select all radio button containers
const radioButtons = document.querySelectorAll('.product-selection_radio-button');

// Keep track of the currently selected radio button
let currentlySelected = null;

if (!radioButtons.length) {
    console.error('No radio buttons found. Please check the HTML structure or the selector.');
} else {
    // Initial setup to identify any pre-selected radio button
    radioButtons.forEach(button => {
        const isSelected = button.querySelector('.product-selection_radio-select.w--redirected-checked');
        if (isSelected) {
            currentlySelected = button;
            const label = button.querySelector('.product-selection_radio-label');
            if (label) {
                label.classList.add('is-active');
            }
        }
    });
}

// Add event listeners to each radio button
radioButtons.forEach((radioButton, index) => {
    const radioLabel = radioButton.querySelector('.product-selection_radio-label');
    const radioSelect = radioButton.querySelector('.product-selection_radio-select');
    // Get the actual input radio element
    const radioInput = radioButton.querySelector('input[type="radio"]');

    if (!radioLabel || !radioSelect || !radioInput) {
        console.error(`Required elements not found for radio button ${index + 1}. Skipping.`);
        return;
    }

    if (!radioButton.classList.contains('is-disabled')) {
        // Hover handlers
        radioButton.addEventListener('mouseenter', () => {
            if (radioButton !== currentlySelected && radioLabel) {
                radioLabel.classList.add('is-active');
            }
        });

        radioButton.addEventListener('mouseleave', () => {
            if (radioButton !== currentlySelected && radioLabel) {
                radioLabel.classList.remove('is-active');
            }
        });

        // Click handler with debouncing
        let clickTimeout;
        radioButton.addEventListener('click', (event) => {
            // Don't prevent default here to allow native radio behavior
            
            // Clear any pending click timeouts
            if (clickTimeout) {
                clearTimeout(clickTimeout);
            }

            // Debounce the click handling
            clickTimeout = setTimeout(() => {
                try {
                    // Remove selection from previous button
                    if (currentlySelected) {
                        const prevLabel = currentlySelected.querySelector('.product-selection_radio-label');
                        const prevSelect = currentlySelected.querySelector('.product-selection_radio-select');
                        const prevInput = currentlySelected.querySelector('input[type="radio"]');
                        if (prevLabel) prevLabel.classList.remove('is-active');
                        if (prevSelect) prevSelect.classList.remove('w--redirected-checked');
                        if (prevInput) prevInput.checked = false;
                    }

                    // Set new selection
                    currentlySelected = radioButton;
                    radioLabel.classList.add('is-active');
                    radioSelect.classList.add('w--redirected-checked');
                    radioInput.checked = true;

                    // Dispatch both change and input events
                    ['change', 'input'].forEach(eventType => {
                        const event = new Event(eventType, {
                            bubbles: true,
                            cancelable: true
                        });
                        radioInput.dispatchEvent(event);
                    });

                } catch (error) {
                    console.error(`Error in click handler for radio button ${index + 1}:`, error);
                }
            }, 50); // 50ms debounce delay
        });
    }
});

// Optional: Add keyboard navigation
document.addEventListener('keydown', (event) => {
    if (event.key === 'Tab' || event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        const currentIndex = Array.from(radioButtons).indexOf(currentlySelected);
        let nextIndex;

        if (event.key === 'ArrowUp') {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : radioButtons.length - 1;
        } else {
            nextIndex = currentIndex < radioButtons.length - 1 ? currentIndex + 1 : 0;
        }

        const nextButton = radioButtons[nextIndex];
        if (nextButton && !nextButton.classList.contains('is-disabled')) {
            nextButton.click();
        }
    }
});
