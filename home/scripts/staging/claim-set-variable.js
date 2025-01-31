// Initialize Wized if it doesn't exist yet
window.Wized = window.Wized || [];
window.Wized.push((Wized) => {
   // Wait for the patent search API request to complete
   Wized.requests.waitFor('searchByPatentNumber3').then(() => {
       // Get the data of patents that were selected by the user
       const selectedPatents = Wized.data.v.home_orderForm_priorArtPreview_selectedPatents;
       
       // Create a deep copy of the patents data to avoid reference issues
       // This ensures we don't accidentally modify the original data
       const modifiedPatents = JSON.parse(JSON.stringify(selectedPatents));
       
       // Process the patents data to mark all claims as selected
       if (modifiedPatents && Array.isArray(modifiedPatents)) {
           modifiedPatents.forEach(patent => {
               // For each patent, if it has claims...
               if (patent.claims && Array.isArray(patent.claims)) {
                   // Mark every claim as selected by default
                   patent.claims = patent.claims.map(claim => ({
                       ...claim,           // Keep all existing claim data
                       selected: true      // Add selected flag
                   }));
               }
           });
       }
       
       // Update Wized state with the modified patents data
       // This will trigger any UI updates that depend on this data
       Wized.data.v.home_orderForm_priorArtPreview_claims = modifiedPatents;
   }).catch(error => {
       // Log any errors that occur during the process
       console.error('Error processing patent data:', error);
   });
});
