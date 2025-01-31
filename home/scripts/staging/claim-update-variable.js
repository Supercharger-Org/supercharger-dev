// Initialize Wized if it doesn't exist yet
window.Wized = window.Wized || [];
window.Wized.push((Wized) => {
   // This code runs when Wized is ready and initialized
   
   // Set up a listener for when API requests complete
   Wized.on('requestend', (result) => {
       // Specifically watch for the patent search request completion
       if (result.name === 'searchByPatentNumber3') {
           // When patent search completes, set up checkbox listeners
           setupCheckboxListeners();
       }
   });
   
   // Function to set up click listeners on all claim checkboxes
   function setupCheckboxListeners() {
       // Find all checkbox labels with the specified Wized attribute
       const checkboxes = document.querySelectorAll('label[wized="home_orderForm_priorArtPreview_claimCheckbox"]');
       
       // Add click handler to each checkbox
       checkboxes.forEach(checkbox => {
           checkbox.addEventListener('click', handleCheckboxClick);
       });
   }
   
   // Handler for checkbox click events
   function handleCheckboxClick(event) {
       // Get the clicked checkbox label element
       const label = event.currentTarget;
       
       // Get the unique claim ID from the label's attribute
       const claimId = label.getAttribute('claim-id');
       
       // Determine if checkbox is now checked
       // Note: The checked state is inverted due to Webflow's checkbox implementation
       const isChecked = !label.querySelector('.w-checkbox-input').classList.contains('w--redirected-checked');
       
       // Make a deep copy of the current claims data to avoid reference issues
       const currentClaims = JSON.parse(JSON.stringify(Wized.data.v.home_orderForm_priorArtPreview_claims));
       
       // Update the claims data with new checkbox state
       let modifiedClaims = currentClaims.map(patent => {
           if (patent.claims) {
               // Look through each patent's claims
               patent.claims = patent.claims.map(claim => {
                   if (claim.uniqueID === claimId) {
                       // When matching claim is found, update its selected state
                       return { ...claim, selected: isChecked };
                   }
                   return claim;
               });
           }
           return patent;
       });
       
       // Update the Wized state variable with modified claims data
       Wized.data.v.home_orderForm_priorArtPreview_claims = modifiedClaims;
   }
});
