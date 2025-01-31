// Initialize Wized if it doesn't exist yet
window.Wized = window.Wized || [];
window.Wized.push((Wized) => {
  // Set up watchers on two radio button fields:
  // 1. Product selection radio button
  // 2. Product infringement choice radio button
  Wized.reactivity.watch(
    [
      () => Wized.data.i.home_orderForm_selectProduct_radio,         // Radio button for selecting product type
      () => Wized.data.i.home_orderForm_productInfringementChoice_radio  // Radio button for infringement type
    ],
    // Callback receives both new and previous values of the radio buttons
    ([selectedProduct, productInfringementChoice], [oldSelectedProduct, oldProductInfringementChoice]) => {
      // Debug logs to track changes
      // console.log('Selected product changed from', oldSelectedProduct, 'to', selectedProduct);
      // console.log('Product infringement choice changed from', oldProductInfringementChoice, 'to', productInfringementChoice);

      // If user selects both:
      // - "product-infringement" as the product
      // - "patent-number" as the infringement type
      if (selectedProduct === 'product-infringement' && productInfringementChoice === 'patent-number') {
        // Get the patents input field element
        const patentsInputElement = Wized.elements.get('home_orderForm_selectedPatentsInput');

        if (patentsInputElement) {
          // Make the patents input field required when both conditions are met
          patentsInputElement.node.setAttribute('required', 'required');
          // console.log('Marked home_orderForm_selectedPatentsInput as required');
        } else {
          console.warn('Element home_orderForm_selectedPatentsInput not found');
        }
      } else {
        // For all other combinations of selections
        const patentsInputElement = Wized.elements.get('home_orderForm_selectedPatentsInput');

        if (patentsInputElement) {
          // Remove the required validation when conditions aren't met
          patentsInputElement.node.removeAttribute('required');
          // console.log('Removed required attribute from home_orderForm_selectedPatentsInput');
        }
      }
    }
  );

  // Log initial state on page load
  // console.log('Initial selected product:', Wized.data.i.home_orderForm_selectProduct_radio);
  // console.log('Initial product infringement choice:', Wized.data.i.home_orderForm_productInfringementChoice_radio);
});
