Here is the complete, professional English version of the README.md documentation for your plugin. You can save this directly into your project repository or share it with your international team members.

⚡ Chili-AEM Path Shortcut Assistant (Chrome Extension)
Chili-AEM Path Shortcut Assistant is a productivity-boosting Chrome extension custom-built for ChiliGrafx / Chili Studio template production. It seamlessly solves common pain points when browsing Adobe Experience Manager (AEM) assets within Chili—such as deep folder hierarchies, tedious repetitive clicking, and confusion caused by duplicate folder names.

🌟 Key Features
⚡ One-Click Precision Navigation (Absolute ID Matching) Uses the absolute unique ID path of AEM assets within the Chili DOM tree to navigate, fundamentally eliminating confusion caused by duplicate folder names (e.g., multiple folders named Destination or aou across different projects).

🔴🔵 Smart Red/Blue Traffic Light Indicator (Anti-Misclick)

Preloading Lock (Red Light 🔴): Upon triggering a shortcut, the target folder flashes red and disables clicking to prevent premature misclicks while Chili asynchronously fetches background assets.
Ready for Click (Blue Light 🔵): After 1.5 seconds, once background rendering stabilizes, the highlight turns blue and enables clicks—guaranteeing 100% clean, clutter-free results upon entering.
🖼️ Auto-Sync with MEDIA Sidebar
Automatically triggers the bottom-left Resources panel.
Features a dedicated 🖼️ Open MEDIA List button to jump directly into the AEMv10 media selection interface with a single click.
📌 Auto-Clear Search Bar (Native View Restoration) The moment you double-click into a target folder, the extension automatically clears the top Search input field. This seamlessly exits search mode and switches Chili back to its clean native directory view, allowing folder images to render instantly without delay.

🎈 Draggable Floating Toggle Button (Draggable UI) The floating trigger button in the bottom-right corner supports full-screen free dragging. Place it anywhere on your screen to avoid blocking any Chili editing canvas or property panels.

📦 Installation & Setup Guide
1. Prepare Plugin Files
Create a local folder on your computer (e.g., chili-aem-helper) and ensure it contains the following 3 files:

manifest.json
content.js
styles.css
2. Load Extension in Browser (Chrome / Edge)
Open your Chrome browser and navigate to: chrome://extensions/
Enable Developer mode in the top-right corner.
Click Load unpacked in the top-left corner.
Select your chili-aem-helper folder to complete the installation.
🚀 Recommended Workflow
Step 1: Add & Save Target Folder Bookmarks
Open Chili Studio and locate your frequently used target folder in the left AEMv10 sidebar.
Press F12 to open Developer Tools, inspect the folder card element, and copy its full id attribute from the <section> tag:
Example ID: /content/dam/tccc/marketing/multi-brand/portfolio-gettogether-2025/none/shoppers/destination

Click the ⚡ AEM Path Assistant floating button in the bottom-right corner to expand the control panel.
Enter a Bookmark Alias (e.g., SA Destination 1) and the copied Full ID, then click + Save Unique Bookmark.
Step 2: High-Efficiency Daily Usage
Click the ⚡ AEM Path Assistant floating button (automatically opens the left Resources panel).
Click the green 🖼️ 1. Open MEDIA List button at the top of the plugin panel to instantly expand the AEMv10 media selection area.
Click your saved bookmark in the shortcut list:
All duplicate/unrelated folders will be automatically hidden;
The target folder will flash a 🔴 Red Glow (Data preloading & click locked);
After 1.5 seconds, it automatically turns into a 🔵 Blue Glow (Ready for click).
Double-click the blue glowing folder to enter. The search bar clears automatically, and the folder's images will render cleanly and instantly—ready to be dragged or placed into your template!
