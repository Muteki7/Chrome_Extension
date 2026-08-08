// ⚠️ SECURITY IMPORTANT: Do NOT hardcode API keys in client-side code
// YouTube Data API key should be stored securely on a backend server
// This prevents credential exposure and rate-limiting attacks
//
// RECOMMENDED APPROACH:
// 1. Create a backend endpoint (Node.js, Python, etc.)
// 2. Store your API key securely in environment variables
// 3. Call your backend from this extension instead of calling YouTube API directly
// 
// Example backend call:
// async function getVideoMetadata(videoId) {
//   const response = await fetch('https://your-backend.com/api/video-metadata', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ videoId })
//   });
//   return response.json();
// }
//
// For now, you must set your API key in the getChannelName function before testing

// Listener for when a tab is updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Check if the tab is fully loaded
    if (changeInfo.status === 'complete' && tab.url) {
        // Check if the URL is a YouTube watch page
        if (isYouTubeWatchPage(tab.url)) {
            const videoId = extractVideoId(tab.url);
            if (videoId) {
                // Call the YouTube API to get channel information
                getChannelName(videoId, tabId);
            }
        }
    }
});

// Function to check if the current page is a YouTube watch page
function isYouTubeWatchPage(url) {
    return url.includes('youtube.com/watch');
}

// Function to extract the video ID from the URL
function extractVideoId(url) {
    const urlParams = new URL(url).searchParams;
    return urlParams.get('v'); // Get the video ID from the URL
}

// Function to get the channel name and category from the YouTube API
// IMPORTANT: Replace this with a backend call to your secure server
function getChannelName(videoId, tabId) {
    // TODO: Call your backend endpoint instead
    // const response = await fetch('YOUR_BACKEND/api/video-metadata', { ... })
    
    // For development only - you need to provide your own API key securely
    // Do not commit your API key to version control
    const apiKey = chrome.runtime.getManifest().api_key; // Load from manifest if needed
    if (!apiKey) {
        console.error('API key not configured. Please set up backend proxy.');
        return;
    }

    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                const channelName = data.items[0].snippet.channelTitle; // Extract channel name
                const categoryId = data.items[0].snippet.categoryId;   // Extract category ID
                console.log(`Channel Name: ${channelName}`); // Log channel name
                console.log(`Channel category: ${categoryId}`);

                // Retrieve toggle states from local storage
                chrome.storage.sync.get('nuclearModeEnabled', function(data) {
                    const blockToggle = data.nuclearModeEnabled;
                    console.log("blackList MODE:ON");
                    checkblacklist(channelName, tabId); // Check against blacklist

                    if (blockToggle) {
                        console.log("whitelist MODE:ON");
                        checkwhitelist(channelName, tabId); // Check against whitelist
                        checkWhitelistCategory(categoryId, tabId); // Check category against whitelist
                    } else {
                        console.log("blackList MODE:ON");
                        checkblacklist(channelName, tabId); // Check against blacklist
                    }
                });
            } else {
                console.log('No data found for this video ID.'); // Handle no data case
            }
        })
        .catch(error => {
            console.error('Error fetching channel name:', error); // Handle error case
        });
}

// Function to check if the channel is in the blacklist
function checkblacklist(channelName, tabId) {
    // Retrieve the blacklist from local storage
    chrome.storage.sync.get({ blacklist: [] }, function(data) {
        const blacklist = data.blacklist;
        console.log(blacklist);

        // Check if the channel is in the blacklist
        if (channelName && blacklist.includes(channelName)) {
            console.log(`Channel "${channelName}" is in the blacklist.`); // Debug: In blacklist
            // Send message to content.js to block the content
            chrome.tabs.sendMessage(tabId, { action: 'blockContent' });
        } else {
            console.log(`Channel "${channelName}" is not in the blacklist.`); // Debug: Not in blacklist
            // Send message to content.js to allow the content
            chrome.tabs.sendMessage(tabId, { action: 'allowContent' });
        }
    });
}

// Function to check if the channel is in the whitelist
function checkwhitelist(channelName, tabId) {
    // Retrieve the whitelist from local storage
    chrome.storage.sync.get({ whitelist: [] }, function(data) {
        const whitelist = data.whitelist;
        console.log(whitelist);

        // Check if the channel is in the whitelist
        if (channelName && whitelist.includes(channelName)) {
            console.log(`Channel "${channelName}" is in the whitelist.`); // Debug: In whitelist
            chrome.tabs.sendMessage(tabId, { action: 'allowContent' });
        } else {
            console.log(`Channel "${channelName}" is not in the whitelist.`); // Debug: Not in whitelist
            chrome.tabs.sendMessage(tabId, { action: 'blockContent' });
        }
    });
}

// New function to check if the category is in the whitelist
// Provided category map (ID -> Name mapping)
const categoryMap = {
    "1": "Film & Animation",
    "2": "Autos & Vehicles",
    "10": "Music",
    "15": "Pets & Animals",
    "17": "Sports",
    "18": "Short Movies",
    "19": "Travel & Events",
    "20": "Gaming",
    "21": "Videoblogging",
    "22": "People & Blogs",
    "23": "Comedy",
    "24": "Entertainment",
    "25": "News & Politics",
    "26": "Howto & Style",
    "27": "Education",
    "28": "Science & Technology",
    "29": "Nonprofits & Activism",
    "30": "Movies",
    "31": "Anime/Animation",
    "32": "Action/Adventure",
    "33": "Classics",
    "34": "Comedy",
    "35": "Documentary",
    "36": "Drama",
    "37": "Family",
    "38": "Foreign",
    "39": "Horror",
    "40": "Sci-Fi/Fantasy",
    "41": "Thriller",
    "42": "Shorts",
    "43": "Shows",
    "44": "Trailers",
    // Add any other categories as needed...
};

// Function to check if the category is in the whitelist
function checkWhitelistCategory(categoryId, tabId) {
    // Retrieve the category whitelist from chrome.storage
    chrome.storage.sync.get({ categoryWhitelist: [] }, function(data) {
        const categoryWhitelist = data.categoryWhitelist || []; // Default to empty array if not set
        console.log('Category Whitelist:', categoryWhitelist);

        // Get the category name from the categoryMap using the categoryId
        const categoryName = categoryMap[categoryId];

        if (!categoryName) {
            console.log(`Category ID "${categoryId}" does not have a corresponding name in the dictionary.`);
            chrome.tabs.sendMessage(tabId, { action: 'blockContent' });
            return;
        }

        console.log(`Category Name: ${categoryName}`); // Debug: Category name

        // Check if the category name is in the whitelist
        if (categoryWhitelist.includes(categoryName)) {
            console.log(`Category "${categoryName}" is in the whitelist.`); // Debug: In whitelist
            chrome.tabs.sendMessage(tabId, { action: 'allowContent' });
        } else {
            console.log(`Category "${categoryName}" is not in the whitelist.`); // Debug: Not in whitelist
            chrome.tabs.sendMessage(tabId, { action: 'blockContent' });
        }
    });
}



chrome.action.onClicked.addListener(function() {
    chrome.tabs.create({ url: chrome.runtime.getURL('settings.html') });
});

