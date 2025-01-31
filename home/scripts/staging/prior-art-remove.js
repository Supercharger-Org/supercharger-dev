import { initializeTruncationListeners } from 'https://supercharger-dev.vercel.app/home/scripts/staging/prior-art-truncation.js';

window.Wized = window.Wized || [];
window.Wized.push((Wized) => {
    const initializeRemoveListeners = () => {
        console.log("Initializing listeners for patent removal elements...");
        const removeButtons = document.querySelectorAll('[wized="home_orderForm_priorArtPreview_patentRemove"]');

        removeButtons.forEach((button) => {
            const publicationNumber = button.getAttribute("publication-number");
            if (!publicationNumber) {
                console.warn("Remove button is missing the publication-number attribute. Skipping...");
                return;
            }

            // Remove old listener if it exists to prevent duplicates
            const oldListener = button.getAttribute('data-click-listener');
            if (oldListener) {
                button.removeEventListener('click', window[oldListener]);
            }

            // Create a new listener function
            const listenerFunction = () => {
                console.log(`Remove button clicked for publication-number: ${publicationNumber}`);

                // Get the current patents array
                let selectedPatents = Wized.data.v.home_orderForm_priorArtPreview_selectedPatents;
                console.log('Current selected patents:', selectedPatents);

                if (!Array.isArray(selectedPatents)) {
                    console.error("home_orderForm_priorArtPreview_selectedPatents is not an array. Converting to array.");
                    selectedPatents = selectedPatents ? [selectedPatents] : [];
                }

                const initialLength = selectedPatents.length;
                
                // Filter out the patent to be removed
                selectedPatents = selectedPatents.filter(patent => {
                    const currentPubNumber = patent["publication_number"];
                    console.log(`Comparing ${currentPubNumber} with ${publicationNumber}`);
                    return currentPubNumber !== publicationNumber;
                });

                if (selectedPatents.length < initialLength) {
                    console.log(`Successfully removed patent with publication-number: ${publicationNumber}`);
                } else {
                    console.warn(`No matching patent found for publication-number: ${publicationNumber}`);
                }

                // Update Wized variable with modified array
                console.log('Updating selected patents to:', selectedPatents);
                Wized.data.v.home_orderForm_priorArtPreview_selectedPatents = selectedPatents;

                // Update the input field
                const inputField = document.querySelector('[wized="home_orderForm_selectedPatentsInput"]');
                if (inputField) {
                    console.log(`Original input value: "${inputField.value}"`);

                    const updatedInputValue = inputField.value
                        .split(', ')
                        .filter((value) => value !== publicationNumber)
                        .join(', ');

                    inputField.value = updatedInputValue;
                    console.log(`Updated input value: "${updatedInputValue}"`);

                    // Trigger input event
                    const event = new Event('input', { bubbles: true });
                    inputField.dispatchEvent(event);
                    console.log("Dispatched input event");
                } else {
                    console.warn('Input field not found');
                }

                // Reinitialize truncation
                console.log("Reinitializing truncation listeners...");
                initializeTruncationListeners();
            };

            // Store the listener function and add it to the button
            const functionName = `removeListener_${publicationNumber.replace(/[^a-zA-Z0-9]/g, '_')}`;
            window[functionName] = listenerFunction;
            button.setAttribute('data-click-listener', functionName);
            button.addEventListener('click', listenerFunction);
            
            console.log(`Attached new listener to button with publication-number: ${publicationNumber}`);
        });
    };

    // Listen for the searchByPatentNumber3 request
    Wized.on("requestend", (result) => {
        if (result.name === "searchByPatentNumber3") {
            console.log("SearchByPatentNumber3 request completed. Setting up listeners...");
            // Add a small delay to ensure DOM is updated
            setTimeout(() => {
                initializeRemoveListeners();
            }, 200);
        }
    });

    // Set up initial listeners
    console.log("Setting up initial remove listeners...");
    initializeRemoveListeners();
});
