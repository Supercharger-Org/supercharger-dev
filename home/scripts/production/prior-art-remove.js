import { initializeTruncationListeners } from 'https://supercharger-dev.vercel.app/home/scripts/staging/prior-art-truncation.js';

window.Wized = window.Wized || [];
window.Wized.push((Wized) => {
    const initializeRemoveListeners = () => {
        const removeButtons = document.querySelectorAll('[wized="home_orderForm_priorArtPreview_patentRemove"]');

        removeButtons.forEach((button) => {
            const publicationNumber = button.getAttribute("publication-number");
            if (!publicationNumber) {
                console.warn("Remove button is missing the publication-number attribute. Skipping...");
                return;
            }

            if (!button.dataset.listenerAttached) {

                button.addEventListener("click", () => {

                    let selectedPatents = Wized.data.v.home_orderForm_priorArtPreview_selectedPatents;

                    if (!Array.isArray(selectedPatents)) {
                        console.error("home_orderForm_priorArtPreview_selectedPatents is not an array. Cannot proceed with removal.");
                        return;
                    }

                    const initialLength = selectedPatents.length;
                    selectedPatents = selectedPatents.filter(
                        (patent) => patent["publication_number"] !== publicationNumber
                    );

                    if (selectedPatents.length < initialLength) {
                    } else {
                        console.warn(`No matching object found for publication-number: ${publicationNumber}`);
                    }

                    Wized.data.v.home_orderForm_priorArtPreview_selectedPatents = selectedPatents;

                    // Update the input field
                    const inputField = document.querySelector('[wized="home_orderForm_selectedPatentsInput"]');
                    if (inputField) {

                        // Remove the publication number from the input field
                        const updatedInputValue = inputField.value
                            .split(', ')
                            .filter((value) => value !== publicationNumber)
                            .join(', ');

                        inputField.value = updatedInputValue;

                        // Trigger an input event to notify Wized of the change
                        const event = new Event('input', { bubbles: true });
                        inputField.dispatchEvent(event);
                    } else {
                        console.warn('Input field with attribute wized="home_orderForm_selectedPatentsInput" not found.');
                    }

                    // Reinitialize truncation listeners
                    initializeTruncationListeners();
                });

                button.dataset.listenerAttached = true;
            }
        });
    };

    Wized.on("request", (event) => {
        if (event.name === "searchByPatentNumber3") {
            setTimeout(() => {
                initializeRemoveListeners();
            }, 100);
        }
    });

    initializeRemoveListeners();
});

