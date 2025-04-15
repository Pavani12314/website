/**
 * Event Tracker Script
 * This script captures all click events and page views across HTML tags and CSS objects.
 * It logs events to the console in the format: Timestamp_of_click, type of event (click/view), event object
 */

document.addEventListener('DOMContentLoaded', function() {
    // Log the page view event when the page loads
    logEvent('view', 'page');
    
    // Add click event listener to the entire document
    document.addEventListener('click', function(event) {
        const target = event.target;
        
        // Determine the type of clicked element
        let objectType = getElementType(target);
        
        // Log the click event to console
        logEvent('click', objectType);
    });
    
    // Track when elements enter the viewport (for view events)
    setupIntersectionObserver();
});

/**
 * Determine the type of HTML element
 * @param {HTMLElement} element - The HTML element to check
 * @return {string} The element type description
 */
function getElementType(element) {
    // Check for common element types
    if (element.tagName === 'A') return 'link: ' + (element.textContent || element.href);
    if (element.tagName === 'BUTTON') return 'button: ' + element.textContent;
    if (element.tagName === 'IMG') return 'image: ' + element.alt || element.src;
    if (element.tagName === 'INPUT') return 'input: ' + element.type;
    if (element.tagName === 'SELECT') return 'dropdown';
    if (element.tagName === 'TEXTAREA') return 'text area';
    
    // Check if element has an ID
    if (element.id) return element.tagName.toLowerCase() + ' with id: ' + element.id;
    
    // Check if element has classes
    if (element.className) return element.tagName.toLowerCase() + ' with class: ' + element.className;
    
    // Default to element tag name
    return element.tagName.toLowerCase();
}

/**
 * Log an event to the console
 * @param {string} eventType - The type of event (click/view)
 * @param {string} objectType - The type of object that triggered the event
 */
function logEvent(eventType, objectType) {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp}, ${eventType}, ${objectType}`);
}

/**
 * Set up an intersection observer to track when elements enter the viewport
 */
function setupIntersectionObserver() {
    // Define elements to observe for view events
    const elementsToObserve = [
        ...document.querySelectorAll('section'),
        ...document.querySelectorAll('img'),
        ...document.querySelectorAll('.education-item'),
        ...document.querySelectorAll('.skills-category')
    ];
    
    // Create map to track elements that have already been viewed
    const viewedElements = new Map();
    
    // Set up the intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const elementId = element.id || element.className || element.tagName;
                
                // Only log view event if element hasn't been viewed before
                if (!viewedElements.has(elementId)) {
                    viewedElements.set(elementId, true);
                    
                    let objectType = getElementType(element);
                    logEvent('view', objectType);
                }
            }
        });
    }, { threshold: 0.5 }); // Element is considered "viewed" when 50% is visible
    
    // Start observing elements
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
}