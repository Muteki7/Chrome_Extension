# YouTube Tracker - Matrix Escape Tool 🔒

A Chrome extension that helps you take control of your YouTube consumption with powerful content blocking, whitelisting, and watch-time tracking features. Block distracting content, whitelist educational channels, and monitor your screen time all from one Matrix-themed dashboard.

![YouTube Tracker Badge](https://img.shields.io/badge/Chrome%20Extension-Productivity-green)
![Version](https://img.shields.io/badge/Version-1.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

### 🚫 Content Blocking
- **Blacklist Channels** - Block specific YouTube channels from being accessed
- **Whitelist Channels** - Allow only specific channels when in Nuclear Mode
- **Category Blocking** - Block entire content categories (Gaming, Entertainment, Comedy, etc.)
- **Category Whitelisting** - Allow specific categories while blocking others

### 🎯 Nuclear Mode
- **All-or-Nothing Blocking** - Block all content except whitelisted channels and categories
- Toggle with a single checkbox for maximum productivity

### ⏱️ Watch Time Tracking
- **Daily Time Tracking** - Monitor how much time you spend watching YouTube each day
- **Session Tracking** - Track individual watch sessions
- **Automatic Logging** - Time is logged automatically when videos pause, end, or tab closes

### 🔐 Security & Customization
- **Password Protection** - Secure your settings with a custom password (default: "matrix")
- **Persistent Storage** - All settings are saved securely using Chrome's sync storage
- **Easy Management** - Intuitive UI to add/remove channels and categories

### 🎮 Matrix-Themed UI
- Retro green-on-black aesthetic with Matrix styling
- Cryptic fonts and animations for a unique user experience

---

## 🚀 Installation

### From Source (Development)

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/youtube-tracker.git
   cd youtube-tracker
   ```

2. **Load the extension in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable **Developer mode** (toggle in top-right)
   - Click **Load unpacked**
   - Select the project directory

3. **Done!** The extension icon will appear in your toolbar

---

## 📖 How to Use

### Accessing Settings
- Click the extension icon in your Chrome toolbar
- Or manually navigate to the settings page

### Unlocking Settings
1. Enter the password (default: **"matrix"**)
2. Click **Unlock** to access all features

### Managing Blacklist
1. Enter a YouTube channel name
2. Click the **+** button
3. The channel will be blocked immediately on YouTube

### Managing Whitelist
1. Enable **Nuclear Mode** first (if you want to use whitelist)
2. Enter a YouTube channel name
3. Click the **+** button
4. In Nuclear Mode, only whitelisted channels and categories are accessible

### Blocking Categories
1. Select a category from the **Blocked Categories** dropdown
2. Click **+** to add it to your blocked list
3. Videos in these categories will be blocked

### Allowing Categories (Nuclear Mode)
1. Enable Nuclear Mode
2. Select categories from the **Allowed Categories** dropdown
3. Click **+** to whitelist specific categories

### Changing Your Password
1. Enter a new password in the **Set Password** field
2. Click **Set Password**
3. Use the new password to unlock settings next time

---

## 🗂️ Project Structure

```
youtube-tracker/
├── manifest.json          # Chrome extension configuration
├── background.js          # Service worker - API calls & content filtering logic
├── contentScript.js       # Content script - blocks/allows content on YouTube
├── content-timer.js       # Tracks watch time on YouTube
├── settings.html          # Settings page UI
├── settings.js            # Settings page logic & storage management
├── blocked.html           # Blocked content page
└── README.md              # This file
```

### File Descriptions

- **manifest.json** - Declares extension metadata, permissions, and scripts
- **background.js** - Fetches video metadata from YouTube API, checks channels/categories against lists
- **contentScript.js** - Listens for blocking messages and redirects to blocked page
- **content-timer.js** - Monitors video play/pause events and accumulates watch time
- **settings.html/js** - User interface for managing blacklist, whitelist, and passwords
- **blocked.html** - Displays when a blocked video is attempted to be watched

---

## ⚙️ Configuration

### Default Settings
- **Default Password**: `matrix`
- **Storage**: Chrome Sync Storage (syncs across devices when logged into Chrome)

### Permissions Used
- `storage` - Save settings and lists
- `tabs` - Monitor tab updates
- `activeTab` - Access current tab information
- `webNavigation` - Monitor page navigation
- `webRequest` - Intercept requests
- `*://*.youtube.com/*` - Access YouTube pages

---

## 📝 Notes for Contributors

- Follow the existing code style (modern JavaScript with async/await)
- Test all features before submitting PRs
- Update this README if adding new features
- Document any new permissions needed in manifest.json
- Consider performance implications of frequent API calls

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🎓 Credits & Inspiration

Built as a productivity tool to help users maintain healthy YouTube habits and reduce digital distractions. The Matrix theme was chosen to escape the matrix.

---

## 💡 Roadmap

- [ ] Add daily/weekly watch time reports
- [ ] Implement time limits (e.g., 30 mins per day)
- [ ] Add break reminders
- [ ] Support for other video platforms (Twitch, Reddit, etc.)
- [ ] Customizable blocked page design
- [ ] Cloud sync for settings across devices
- [ ] Dark mode toggle (already dark, but add customization)

---

## 📧 Contact & Support

If you encounter any issues or have feature requests, please open an issue on GitHub.

---

**Remember: "There is no YouTube." 🟢 Take control of your screen time!**
