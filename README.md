# File System Vite App

A React-based file system explorer built with Vite that allows you to browse, view, edit, and manage files in your local file system.

## Features

- 📂 Browse through directories and files in your local file system
- 📝 View and edit text files directly in the browser
- 🔄 Navigate up and down directory structures
- ➕ Create new files and folders
- 🗑️ Delete existing files and folders
- 💾 Save changes to files

## Screenshots

![File Explorer Screenshot](screenshots/file-explorer.png)

## Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/vite-file-system-app.git
   cd vite-file-system-app
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Install backend dependencies:
   ```bash
   npm install express cors
   ```

## Running the Application

The application consists of two parts: a Vite React frontend and an Express backend server. You need to run both to use the application.

### 1. Start the backend server:

```bash
node server/index.js
```

This will start the server on port 3001. You should see the message:
```
File system API server running on http://localhost:3001
```

### 2. Start the Vite development server:

In a separate terminal:
```bash
npm run dev
```

This will start the Vite development server, typically on port 5173. Open your browser and navigate to:
```
http://localhost:5173
```

## How to Use

1. **Browsing Files**: The left panel shows files and directories in your current location. Click on folders to navigate into them.

2. **Viewing/Editing Files**: Click on a file to view its contents in the right panel. If it's a text file, you can edit it directly.

3. **Creating Files/Folders**: Use the "Create File" or "Create Folder" buttons, then enter a name for the new item.

4. **Deleting Items**: Select a file or folder, then click the "Delete Selected" button.

5. **Saving Changes**: After editing a file, click the "Save" button to persist your changes.

6. **Navigating Up**: Use the "Go Up" button to navigate to the parent directory.

## Project Structure

```
vite-file-system-app/
├── public/
├── src/
│   ├── components/
│   │   ├── FileExplorer.jsx
│   │   ├── FileExplorer.css
│   │   ├── FileViewer.jsx
│   │   ├── FileViewer.css
│   │   ├── FileOperations.jsx
│   │   └── FileOperations.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── server/
│   └── index.js
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## Technical Details

- **Frontend**: React with Vite for fast development
- **Backend**: Express.js for handling file system operations
- **File Operations**: Node.js native fs/promises module
- **APIs**:
  - `/api/fs/current-directory` - Get the current working directory
  - `/api/fs/contents` - Get contents of a directory
  - `/api/fs/file` - Read and write file contents
  - `/api/fs/directory` - Create directories
  - `/api/fs/delete` - Delete files or directories

## Security Considerations

This application has access to your local file system. Use caution when:

- Deleting files or directories (there is no trash/recycle bin functionality)
- Editing important system files
- Running the server in production environments

By default, the server runs on localhost and is only accessible from your machine.

## Development

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Troubleshooting

- **Permission Errors**: Ensure the application has appropriate permissions to access and modify files in the current directory.
- **Backend Connection Issues**: Verify that the backend server is running on port 3001.
- **CORS Issues**: If you encounter CORS errors, ensure the backend is properly configured with CORS middleware.

## Future Enhancements

- File upload functionality
- Search capabilities
- File type icons
- Better binary file handling
- Drag and drop operations
- Multi-file selection
- Keyboard shortcuts

---

Created with ❤️ using Vite and React