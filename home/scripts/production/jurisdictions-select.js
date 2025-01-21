window.Wized = window.Wized || [];
window.Wized.push((Wized) => {
  // Get the select element with the specified Wized attribute
  const jurisdictionSelectElement = Wized.elements.get('home_orderForm_jurisdictionSelect');

  if (jurisdictionSelectElement && jurisdictionSelectElement.node) {
    // Ensure the DOM node is present and accessible
    const selectNode = jurisdictionSelectElement.node;

    // Check if the first option exists and disable it
    if (selectNode.options.length > 0) {
      selectNode.options[0].disabled = true;
    }
  } else {
    console.error('Select element with wized="home_orderForm_jurisdictionSelect" not found.');
  }
});

