// Initialize Wized if it doesn't exist yet
window.Wized = window.Wized || [];
window.Wized.push((Wized) => {
 // Helper function to check/mark a single checkbox as checked
 function checkCheckbox(checkboxElement) {
   // Validate that we have a valid checkbox element
   if (!checkboxElement || !checkboxElement.node) return;

   // Find and check the actual HTML checkbox input
   const checkbox = checkboxElement.node.querySelector('input[type="checkbox"]');
   if (checkbox) {
     checkbox.checked = true; // Set the native checkbox state
   }

   // Find and style Webflow's custom checkbox visual element
   const customCheckbox = checkboxElement.node.querySelector('.w-checkbox-input');
   if (customCheckbox) {
     // Add Webflow's checked style class
     customCheckbox.classList.add('w--redirected-checked');
   }
 }

 // Function to process all existing checkbox elements on the page
 function processCheckboxes() {
   // Get all checkbox elements with the specified Wized identifier
   const checkboxElements = Wized.elements.getAll('home_orderForm_priorArtPreview_claimCheckbox');
   // Check each checkbox found
   checkboxElements.forEach(checkCheckbox);
 }

 // Watch for new checkbox elements being added to the page
 Wized.on('elementrendered', (element) => {
   // When a new claim checkbox is rendered...
   if (element.name === 'home_orderForm_priorArtPreview_claimCheckbox') {
     // Check it automatically
     checkCheckbox(element);
   }
 });

 // Initially process any checkboxes that exist when script runs
 processCheckboxes();
});
