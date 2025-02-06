// Initialize Wized
window.Wized = window.Wized || [];
window.Wized.push((Wized) => {
  // Store the selectize instance globally so we can access it in the watcher
  let selectizeInstance;

  // Function to initialize Selectize
  const initializeSelectize = (element) => {
    if (!element || !element.node) {
      // console.log("Element node not found");
      return;
    }

    // console.log("Initializing Selectize for element:", element.name);

    // Initialize Selectize with configuration
    const selectize = $(element.node).selectize({
      // Core configuration
      plugins: ["remove_button"], // Enable the remove button plugin for multiple selections
      maxItems: null, // null allows unlimited selections
      persist: false, // Don't persist selections between page loads

      // Prevent creation of new options
      create: false, // Disable creation of new options
      createOnBlur: false, // Prevent creating options when input loses focus
      createFilter: null, // Disable the creation filter completely
      shouldLoad: () => false, // Prevent looking up new options

      // UI/UX settings
      hideSelected: false, // Keep showing selected items in dropdown
      allowEmptyOption: false, // Don't allow empty options
      closeAfterSelect: true, // Close dropdown after selection for better UX

      // Custom rendering for selected items
      render: {
        item: function (item, escape) {
          return '<div class="item">' + escape(item.value) + "</div>";
        },
      },

      // Handle changes to selections
      onChange: function (values) {
        // Convert array of values to comma-separated string
        const valueString = values ? values.join(", ") : "";

        // Store in Wized variable (not input)
        Wized.data.v.home_orderForm_infringementJurisdictionSelect_options =
          valueString;

        // console.log("Updated jurisdiction options:", valueString);
      },
    });

    // Store selectize instance for later use
    selectizeInstance = element.node.selectize;
    // console.log("Selectize initialized successfully");
  };

  // Watch for changes in the product radio selection
  Wized.reactivity.watch(
    () => Wized.data.i.home_orderForm_selectProduct_radio,
    (newValue) => {
      // console.log("Product selection changed to:", newValue);

      // Clear the selectize input when product changes
      if (selectizeInstance) {
        selectizeInstance.clear();
        // console.log("Cleared jurisdiction selections");

        // Also clear the Wized variable
        Wized.data.v.home_orderForm_infringementJurisdictionSelect_options = "";
        // console.log("Cleared jurisdiction options in Wized variable");
      }
    }
  );

  // Get the Wized element
  const jurisdictionElement = Wized.elements.get(
    "home_orderForm_infringementJurisdictionSelect"
  );

  if (jurisdictionElement) {
    // Listen for visibility changes
    jurisdictionElement.on("visibility", (event) => {
      // console.log("Jurisdiction element visibility changed:", event.displayed);

      if (event.displayed) {
        // Initialize Selectize when element becomes visible
        initializeSelectize(jurisdictionElement);
      }
    });

    // Check if element is already visible and initialize if needed
    if (jurisdictionElement.rendered) {
      // console.log("Jurisdiction element is already visible, initializing...");
      initializeSelectize(jurisdictionElement);
    }
  } else {
    // console.log("Jurisdiction element not found in Wized elements");
  }
});
