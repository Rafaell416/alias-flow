# Alias Flow - Chrome Extension

Alias Flow is a Chrome extension designed to streamline your Gmail inbox management. It allows you to create custom email aliases, labels, and filters with just a few clicks, ensuring your inbox stays organized and clutter-free.

## Features

- **Create Email Aliases:** Easily generate email aliases directly from the extension popup.
- **Automatic Labeling:** Automatically assign labels to emails sent to your aliases.
- **Custom Filters:** Create filters to move emails to specific folders based on your aliases.
- **Clipboard Copying:** Quickly copy your alias to the clipboard for easy sharing.
- **Delete Aliases and Filters:** Manage and remove aliases and their associated filters with a single click.
- **Search Functionality:** Search through your aliases for easy management.

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Rafaell416/alias-flow.git
   ```

2. Navigate to the project directory:

   ```bash
   cd alias-flow
   ```

3. Install dependencies:

   ```bash
   yarn install
   ```

4. Build the project:

   ```bash
   yarn build
   ```

5. Load the extension in Chrome:
   - Open `chrome://extensions/` in your Chrome browser.
   - Enable "Developer mode" in the top right corner.
   - Click "Load unpacked" and select the `dist` directory inside the project.

### Usage

1. Open the extension from the Chrome toolbar.
2. Click on the "Create Alias +" button to generate a new alias.
3. Manage existing aliases directly from the extension interface.
4. Use the search functionality to find specific aliases.
5. Log out from the extension by clicking the "Logout" button.

## Contributing

We welcome contributions! If you have any ideas, suggestions, or bug reports, feel free to open an issue or submit a pull request.

### How to Contribute

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Make your changes.
4. Commit and push your changes:
   ```bash
   git commit -m 'Add your feature'
   git push origin feature/YourFeature
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Google Gmail API](https://developers.google.com/gmail/api) - For enabling access to Gmail's functionalities.
- [TypeScript](https://www.typescriptlang.org/) - For making the codebase type-safe.

## Support

If you encounter any issues or have any questions, feel free to open an issue on this repository.

## Disclaimer

This is an unofficial extension and is not affiliated with or endorsed by Google.
