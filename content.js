// Function to block Shorts
function blockShorts() {
    // Block navigation to Shorts URLs
    if (window.location.pathname.includes('/shorts')) {
        window.location.href = 'https://www.youtube.com';
        return;
    }

    // Remove all Shorts-related elements
    const shortsSelectors = [
        '[href*="/shorts/"]',
        '[title="Shorts"]',
        '[aria-label*="Shorts"]',
        'ytd-guide-entry-renderer[title="Shorts"]',
        'ytd-mini-guide-entry-renderer[aria-label="Shorts"]',
        'ytd-reel-shelf-renderer',
        'ytd-rich-shelf-renderer:has([href*="/shorts/"])',
        'ytd-rich-section-renderer[is-shorts]',
        'ytd-reel-video-renderer',
        'ytd-video-renderer:has([href*="/shorts/"])',
        'ytd-rich-grid-media:has([href*="/shorts/"])',
        'ytd-rich-grid-row:has([href*="/shorts/"])',
        'ytd-grid-video-renderer:has([href*="/shorts/"])',
        'tp-yt-paper-item:has([href*="/shorts/"])',
        'ytd-guide-collapsible-entry-renderer:has([title="Shorts"])'
    ];

    shortsSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.remove();
        });
    });
}

// Run on page load
blockShorts();

// Run on dynamic content changes
const observer = new MutationObserver(() => {
    blockShorts();
});

// Start observing
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Block clicks on any Shorts links that might slip through
document.addEventListener('click', (e) => {
    const isShorts = e.target.closest('a[href*="/shorts/"]') || 
                     e.target.closest('[title="Shorts"]') ||
                     e.target.closest('[aria-label*="Shorts"]');
    if (isShorts) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
}, true);

// Block URL changes to Shorts
let lastUrl = location.href;
new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        if (url.includes('/shorts')) {
            window.location.href = 'https://www.youtube.com';
        }
    }
}).observe(document, {subtree: true, childList: true}); 