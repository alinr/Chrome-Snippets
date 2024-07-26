// Highlight initial links
document.querySelectorAll('a').forEach(link => {
    link.style.backgroundColor = 'yellow';
    link.dataset.initial = 'true'; // Mark these as initially present
});

// Highlight initial buttons
document.querySelectorAll('button').forEach(button => {
    button.style.backgroundColor = 'red';
    button.dataset.initial = 'true'; // Mark these as initially present
});

// Create a MutationObserver to detect changes in the DOM
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) { // Check if it's an element node
                    // Find any new <a> tags within the added node
                    node.querySelectorAll('a').forEach(link => {
                        if (!link.dataset.initial) { // Only highlight if not marked as initial
                            link.style.backgroundColor = 'pink';
                        }
                    });

                    // Find any new <button> tags within the added node
                    node.querySelectorAll('button').forEach(button => {
                        if (!button.dataset.initial) { // Only highlight if not marked as initial
                            button.style.backgroundColor = 'red';
                        }
                    });
                }
            });
        }
    });
});

// Start observing the document body for changes
observer.observe(document.body, {
    childList: true,
    subtree: true
});