window.Wized = window.Wized || [];
window.Wized.push((Wized) => {
    /**
     * Function to update the Wized variable with new data, ensuring no duplicates based on publication_number.
     */
    const updateSelectedPatents = (result) => {
        try {
            console.log("Processing data from searchByPatentNumber3 request...");

            // Extract publication_number and the entire result data
            const publicationNumber = result.data?.publication_number;
            if (!publicationNumber) {
                console.error("publication_number is missing in the request response. Cannot process the data.");
                return;
            }


            // Access the Wized variable
            let selectedPatents = Wized.data.v.home_orderForm_priorArtPreview_selectedPatents;

            // Ensure the variable is an array
            if (!Array.isArray(selectedPatents)) {
                console.warn("home_orderForm_priorArtPreview_selectedPatents is not an array. Initializing it as an array.");
                selectedPatents = [];
            }

            // Check if the publication_number already exists in the array
            const exists = selectedPatents.some((patent) => patent.publication_number === publicationNumber);
            if (!exists) {
                selectedPatents.push(result.data);
            } else {
                console.warn(`Duplicate detected. Skipping data with publication_number: ${publicationNumber}`);
            }

            // Update the Wized variable
            Wized.data.v.home_orderForm_priorArtPreview_selectedPatents = selectedPatents;

            console.log("Updated home_orderForm_priorArtPreview_selectedPatents variable:", selectedPatents);
        } catch (error) {
            console.error("Error while processing data from searchByPatentNumber3 request:", error);
        }
    };

    /**
     * Listen for the execution of the searchByPatentNumber3 request.
     */
    Wized.on("request", (event) => {
        if (event.name === "searchByPatentNumber3") {
            if (event.ok && event.data) {
                updateSelectedPatents(event);
            } else {
                console.error("searchByPatentNumber3 request did not succeed or returned invalid data.");
            }
        }
    });

});
