// Initialize Wized
window.Wized = window.Wized || [];
window.Wized.push((Wized) => {
  /**
   * Updates the requirement state of the search time period radio input based on specific conditions:
   * - Makes it required when the product type is 'product-infringement' AND a date is selected
   * - Makes it optional for all other cases
   * 
   * This function handles the dynamic form validation logic where certain fields
   * become required based on user selections in other fields.
   */
  const updateRadioRequirement = () => {
    // Get the current values from the form inputs
    const productValue = Wized.data.i.home_orderForm_selectProduct_radio;  // Selected product type
    const dateValue = Wized.data.i.home_orderForm_date_input;             // Selected date
    
    // Get the radio element that we need to make required/optional
    const searchTimePeriodRadio = Wized.elements.get('home_orderForm_searchTimePeriod_radio');
    
    // Log current values for debugging
    console.log('Current product value:', productValue);
    console.log('Current date value:', dateValue);
    
    // Check if both conditions are met:
    // 1. Product type is specifically 'product-infringement'
    // 2. Date input has a value and is not just whitespace
    if (productValue === 'product-infringement' && dateValue && dateValue.trim() !== '') {
      // Make the search time period radio required
      searchTimePeriodRadio.node.setAttribute('required', 'required');
      console.log('Search time period radio marked as required');
    } else {
      // Make the search time period radio optional
      searchTimePeriodRadio.node.removeAttribute('required');
      console.log('Search time period radio requirement removed');
    }
  };

  /**
   * Clear the search time period radio selection when product type changes
   */
  const clearSearchTimePeriod = () => {
    // Clear the Wized input value
    Wized.data.i.home_orderForm_searchTimePeriod_radio = '';
    
    // Get all radio inputs for search time period
    const searchTimePeriodRadio = Wized.elements.get('home_orderForm_searchTimePeriod_radio');
    if (searchTimePeriodRadio && searchTimePeriodRadio.node) {
      // Find all radio inputs within the element
      const radioInputs = searchTimePeriodRadio.node.querySelectorAll('input[type="radio"]');
      // Uncheck all radio inputs
      radioInputs.forEach(input => {
        input.checked = false;
      });
      console.log('Search time period radio selection cleared');
    }
  };

  // Watch for changes in the product selection
  Wized.reactivity.watch(
    () => Wized.data.i.home_orderForm_selectProduct_radio,
    (newValue) => {
      console.log('Product selection changed to:', newValue);
      // Clear search time period whenever product selection changes
      clearSearchTimePeriod();
    }
  );

  // Set up watchers to monitor changes for requirement logic
  Wized.reactivity.watch(
    [
      // Watch for changes in the product selection radio
      () => Wized.data.i.home_orderForm_selectProduct_radio,
      // Watch for changes in the date input
      () => Wized.data.i.home_orderForm_date_input
    ],
    () => {
      console.log('Input values changed, checking conditions...');
      updateRadioRequirement();
    }
  );

  // Perform initial check when the script loads
  console.log('Initializing form validation...');
  updateRadioRequirement();
});
