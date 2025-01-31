// Initialize Wized if it doesn't exist yet
window.Wized = window.Wized || [];
window.Wized.push((Wized) => {
 // Set up watchers to track changes on two radio button fields:
 // 1. Product selection radio button 
 // 2. Product infringement choice radio button
 Wized.reactivity.watch(
   [
     () => Wized.data.i.home_orderForm_selectProduct_radio, // Radio for product type selection
     () => Wized.data.i.home_orderForm_productInfringementChoice_radio, // Radio for infringement type
   ],
   // Callback receives both new and old values of the radio selections
   (
     [selectedProduct, productInfringementChoice],
     [oldSelectedProduct, oldProductInfringementChoice],
   ) => {
     // Debug logs to track value changes
     // console.log(
     //   "Selected product changed from",
     //   oldSelectedProduct,
     //   "to",
     //   selectedProduct,
     // );
     // console.log(
     //   "Product infringement choice changed from",
     //   oldProductInfringementChoice,
     //   "to",
     //   productInfringementChoice,
     // );

     // Check if user has selected both:
     // - "product-infringement" as the product type
     // - "description-of-technology" as the infringement type  
     if (
       selectedProduct === "product-infringement" &&
       productInfringementChoice === "description-of-technology"
     ) {
       // Get the description textarea element
       const textareaElement = Wized.elements.get(
         "demo_patentDescription_fileUpload_instructionsInput",
       );

       // If textarea exists, make it required
       if (textareaElement && textareaElement.node) {
         textareaElement.node.setAttribute("required", "required");
         // console.log(
         //   "Marked demo_patentDescription_fileUpload_instructionsInput as required",
         // );
       } else {
         console.warn("Textarea element not found");
       }
     } else {
       // For all other combinations of selections
       const textareaElement = Wized.elements.get(
         "demo_patentDescription_fileUpload_instructionsInput",
       );

       // If textarea exists, remove required validation
       if (textareaElement && textareaElement.node) {
         textareaElement.node.removeAttribute("required");
         // console.log(
         //   "Removed required attribute from demo_patentDescription_fileUpload_instructionsInput",
         // );
       }
     }
   },
 );

 // Log initial form state when page loads
 // console.log(
 //   "Initial selected product:",
 //   Wized.data.i.home_orderForm_selectProduct_radio,
 // );
 // console.log(
 //   "Initial product infringement choice:",
 //   Wized.data.i.home_orderForm_productInfringementChoice_radio,
 // );
});
