window.Wized = window.Wized || [];
window.Wized.push((Wized) => {
  // Get the wrapper element
  const wrapperElement = Wized.elements.get('home_orderForm_jurisdictionSingleSelectWrapper');
  const selectElement = Wized.elements.get('home_orderForm_jurisdictionSingleSelect');

  // Ensure the select element exists
  if (!selectElement || !selectElement.node) {
    console.error('Select element with wized="home_orderForm_jurisdictionSingleSelect" not found.');
    return;
  }

  // Function to toggle the 'required' attribute and reset the selection
  const toggleRequiredAndReset = () => {
    if (wrapperElement && wrapperElement.rendered) {
      selectElement.node.required = true; // Mark the select field as required
    } else {
      selectElement.node.required = false; // Remove the required attribute
      selectElement.node.selectedIndex = -1; // Reset the selection
    }
  };

  // Set an initial state
  toggleRequiredAndReset();

  // Listen for changes in the visibility of the wrapper element
  if (wrapperElement) {
    wrapperElement.on('visibility', (event) => {
      toggleRequiredAndReset();
    });
  }
});
