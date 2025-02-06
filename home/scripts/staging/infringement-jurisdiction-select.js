// Import loading functions and custom CSS function
import { loadStylesheet, loadScript } from 'https://supercharger-dev.vercel.app/utilities/external-script-loader.js';
import { addCustomStyles } from 'https://supercharger-dev.vercel.app/utilities/custom-css.js';

// Initialize Wized
window.Wized = window.Wized || [];
window.Wized.push((Wized) => {
  // Store the selectize instance globally so we can access it in the watcher
  let selectizeInstance;

  // Custom CSS for Selectize styling
  const customSelectizeCSS = `
    .selectize-control.multi .selectize-input [data-value] {
      background-color: #3532b5;
      background-image: linear-gradient(to bottom, #ffffff00, #ffffff00);
    }
    .selectize-control.plugin-remove_button .item .remove {
      border-left: 1px solid #cacaca;
    }
    .selectize-dropdown .selected {
      background-color: #3431b5;
    }
    .selectize-control.multi .selectize-input>div {
      border: 0px solid #ffffff00;
    }
  `;

  // Function to initialize Selectize
  const initializeSelectize = (element) => {
    if (!element || !element.node) {
      console.log("Element node not found");
      return;
    }

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
        Wized.data.v.home_orderForm_infringementJurisdictionSelect_options = valueString;
      },
    });

    // Store selectize instance for later use
    selectizeInstance = element.node.selectize;
  };

  // Watch for changes in the product radio selection
  Wized.reactivity.watch(
    () => Wized.data.i.home_orderForm_selectProduct_radio,
    (newValue) => {
      // Clear the selectize input when product changes
      if (selectizeInstance) {
        selectizeInstance.clear();
        // Also clear the Wized variable
        Wized.data.v.home_orderForm_infringementJurisdictionSelect_options = "";
      }
    }
  );

  // Function to set up the jurisdiction element
  const setupJurisdictionElement = () => {
    const jurisdictionElement = Wized.elements.get(
      "home_orderForm_infringementJurisdictionSelect"
    );
    
    if (jurisdictionElement) {
      // Listen for visibility changes
      jurisdictionElement.on("visibility", (event) => {
        if (event.displayed) {
          // Initialize Selectize when element becomes visible
          initializeSelectize(jurisdictionElement);
        }
      });

      // Check if element is already visible and initialize if needed
      if (jurisdictionElement.rendered) {
        initializeSelectize(jurisdictionElement);
      }
    }
  };

  // Load Selectize resources and initialize
  const selectizeCSS = "https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.15.2/css/selectize.default.min.css";
  const selectizeJS = "https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.15.2/js/selectize.min.js";

  // Load CSS first
  loadStylesheet(selectizeCSS, () => {
    // After default CSS is loaded, add our custom CSS
    addCustomStyles(customSelectizeCSS);
    
    // Then load the JS
    loadScript(selectizeJS, () => {
      // After both resources are loaded, set up the jurisdiction element
      setupJurisdictionElement();
    });
  });
});
