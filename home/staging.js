// INITIALISE SWIPER JS ON THE ORDER FORM
import 'https://supercharger-dev.vercel.app/home/scripts/staging/swiper-order-form.js';
console.log('Swiper order form script loaded!');


// SET ACTIVE COMBO CLASS TO RADIO BUTTONS ON HOVER AND CLICKED STATE
// SELETORS: .product-selection_radio-select
// COMBO CLASS: .is-active
import 'https://supercharger-dev.vercel.app/home/scripts/staging/product-selection-radio-hover.js';
console.log('Product selection hover and clicked Function is loaded');


// ATTACHES LISTENER TO SEARCH PATENT INPUT SO IT CAN BE TRIGGGERED ON KEYBOARD ENTER PRESS
// SELECTORS: wized=home_orderForm_searchPatent_input, wized=home_orderForm_searchPatent_trigger
import 'https://supercharger-dev.vercel.app/home/scripts/staging/search-add-patent.js';
console.log('Search add patent function is loaded');


// SET WIZED VARIABLE WHEN WIZED REQUEST HAS BEEN EXECUTED SUCCESSFULLY
// WIZED VARIABLE: home_orderForm_priorArtPreview_selectedPatents
// WIZED REQUEST: searchByPatentNumber3
// import 'https://supercharger-dev.vercel.app/home/scripts/staging/prior-art-preview-set-variable.js';
// console.log('Set Prior art Preview variable function is loaded');


// TRUNCATE TEXT, "VIEW MORE" "VIEW LESS" FUNCTIONALITY ADDED TO LINKS IN PRIOR ART UI CARDS
// SELECTORS: wized=home_orderForm_priorArtPreview_patentAbstract, 
// wized=home_orderForm_priorArtPreview_patentAbstractReadMore, wized=home_orderForm_priorArtPreview_patentClaims,
// wized=home_orderForm_priorArtPreview_patentClaimsReadMore 
// WIZED REQUEST: searchByPatentNumber3
import 'https://supercharger-dev.vercel.app/home/scripts/staging/prior-art-truncation.js';
console.log('Prior Art Truncation function is loaded');


// REMOVES PRIOR ART FROM UI AND WIZED VARIABLE
// SELECTORS: wized=home_orderForm_priorArtPreview_patentRemove
// WIZED REQUEST: searchByPatentNumber3
// WIZED VARIABLE: home_orderForm_priorArtPreview_selectedPatents
import 'https://supercharger-dev.vercel.app/home/scripts/staging/prior-art-remove.js';
console.log('Prior art remove function is loaded');


// SET PUBLICATION NUMBERS FROM SELECTED PRIOR ART INTO HIDDEN INPUT
// SELECTORS: wized=home_orderForm_selectedPatentsInput
// WIZED REQUEST: searchByPatentNumber3
import 'https://supercharger-dev.vercel.app/home/scripts/staging/selected-patent-input.js';
console.log('Selected Patent Input function is loaded');


// SELECTING THE PRODUCT RADIO OPTIONS, THE SCRIPT MARKS THE FORM FIELDS AS "REQUIRED". INSTRUCTIONS ARE PROVIDED
// ...IN THE CODE ON THE ATTRIBUTE SETUP
import 'https://supercharger-dev.vercel.app/home/scripts/staging/set-fields-required.js';
console.log('Set Fields Required function is loaded');


// INITIALISES FLATPICKR JS ON DATE INPUTS
// SELECTORS: wized=home_orderForm_date_input, wized='home_orderForm_date_priorityDateInput'
import 'https://supercharger-dev.vercel.app/home/scripts/staging/datepicker.js';
console.log('datepicker function is loaded');


// DISABLES ALL THE OPTIONS ON THE SELECT AND PRESELECTS ONE OPTION
// SELECTORS: wized=home_orderForm_jurisdictionSelect
import 'https://supercharger-dev.vercel.app/home/scripts/staging/jurisdictions-select.js';
console.log('jurisdictions select function is loaded');

// MARK SELECT FIELD AS "REQUIRED"
// SELECTORS: wized=home_orderForm_jurisdictionSingleSelectWrapper, wized=home_orderForm_jurisdictionSingleSelect
import 'https://supercharger-dev.vercel.app/home/scripts/staging/jurisdiction-single-select.js';
console.log('jurisdictions single select function is loaded');

// HANDLES THE MULTISTEP SWIPER FORM NAVIGATION AND VALIDATION
// SELECTORS: wized=home_orderForm_navigation_previous, wized="home_orderForm_navigation_next
import 'https://supercharger-dev.vercel.app/home/scripts/staging/order-form-validation-navigation.js';
console.log('Order form validation & navigation is loaded');

// SETS WIZED VARIABLE
// WIZED VARIABLE SELECTORS: v.home_orderForm_priorArtPreview_selectedPatents,v.home_orderForm_priorArtPreview_claims
// WIZED REQUEST: searchByPatentNumber3
import 'https://supercharger-dev.vercel.app/home/scripts/staging/claim-set-variable.js';
console.log('Claim set variable is loaded');

// UPDATE WIZED VARIABLE
// WIZED SELECTOR: wized=home_orderForm_priorArtPreview_claimCheckbox, 
// WIZED VARIABLE SELECTORS: v.home_orderForm_priorArtPreview_claims
// WIZED REQUEST: searchByPatentNumber3
import 'https://supercharger-dev.vercel.app/home/scripts/staging/claim-update-variable.js';
console.log('Claim update variable is loaded');

// CHECKBOX ARE CHECKED BY DEFAULT
// WIZED SELECTOR: home_orderForm_priorArtPreview_claimCheckbox, 
import 'https://supercharger-dev.vercel.app/home/scripts/staging/claims-checkbox-checked.js';
console.log('Claim checkbox checked is loaded');

// MARK TEXT AREA FIELD AS REQUIRED
// WIZED SELECTOR: demo_patentDescription_fileUpload_instructionsInput, 
import 'https://supercharger-dev.vercel.app/home/scripts/staging/instruction-input-required.js';
console.log('insutruction input is required is loaded');

// MARK INPUT FIELD AS REQUIRED
// WIZED SELECTOR: home_orderForm_selectedPatentsInput, 
import 'https://supercharger-dev.vercel.app/home/scripts/staging/patent-input-required.js';
console.log('patent input required is loaded');
