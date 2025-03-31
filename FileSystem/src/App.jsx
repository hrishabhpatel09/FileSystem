import { useState, useEffect } from 'react';
import './App.css';
import FileExplorer from './components/FileExplorer';
import FileViewer from './components/FileViewer';
import FileOperations from './components/FileOperations';
import axios from "axios"

function App() {
  const [currentPath, setCurrentPath] = useState('');
  const [contents, setContents] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Try to get the current directory on component mount
    fetchCurrentDirectory();
  }, []);

  const fetchCurrentDirectory = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/fs/current-directory`);
  
      console.log(response.data); // Check the structure of the response
      console.log(response); // Check the status code
      // if (!response.ok) {
      //   throw new Error('Failed to fetch current directory');
      // }
  
      console.log("Hi"); // Check the structure of the response
      const data = response.data; // Ensure this is only called once
      setCurrentPath(data.path);
      fetchDirectoryContents(data.path);
  
    } catch (err) {
      setError('Error accessing file system: ' + err.message);
    }
  };
  

  const fetchDirectoryContents = async (path) => {
    try {
      console.log("Fetching Directory...")
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/fs/contents?path=${encodeURIComponent(path)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch directory contents');
      }
      const data = await response.json();
      setContents(data.contents);
      setCurrentPath(path);
      setSelectedFile(null);
      setFileContent('');
    } catch (err) {
      setError('Error fetching contents: ' + err.message);
    }
  };

  const handleFileSelect = async (file) => {
    if (file.isDirectory) {
      fetchDirectoryContents(file.path);
    } else {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/fs/file?path=${encodeURIComponent(file.path)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch file content');
        }
        const content = await response.text();
        setSelectedFile(file);
        setFileContent(content);
      } catch (err) {
        setError('Error loading file: ' + err.message);
      }
    }
  };

  const handleNavigateUp = () => {
    // Extract parent directory path
    const parentPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
    if (parentPath) {
      fetchDirectoryContents(parentPath);
    }
  };

  const handleCreateFile = async (name) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/fs/file`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          path: `${currentPath}/${name}`,
          content: '',
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create file');
      }
      
      fetchDirectoryContents(currentPath);
    } catch (err) {
      setError('Error creating file: ' + err.message);
    }
  };

  const handleCreateFolder = async (name) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/fs/directory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          path: `${currentPath}/${name}`,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create folder');
      }
      
      fetchDirectoryContents(currentPath);
    } catch (err) {
      setError('Error creating folder: ' + err.message);
    }
  };

  const handleDeleteItem = async (path) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/fs/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete item');
      }
      
      fetchDirectoryContents(currentPath);
    } catch (err) {
      setError('Error deleting item: ' + err.message);
    }
  };

  const handleSaveFile = async () => {
    if (!selectedFile) return;
    
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/fs/file`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          path: selectedFile.path,
          content: fileContent,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save file');
      }
    } catch (err) {
      setError('Error saving file: ' + err.message);
    }
  };


  console.log(import.meta.env.VITE_BACKEND_URL)
  return (
    <div className="app">
      <h1>File System Explorer</h1>
      {error && <div className="error">{error}</div>}
      
      <div className="current-path">
        <span>Current Path: {currentPath}</span>
        <button onClick={handleNavigateUp}>Go Up</button>
      </div>
      
      <div className="main-container">
        <div className="explorer-container">
          <FileExplorer 
            contents={contents} 
            onFileSelect={handleFileSelect} 
            currentPath={currentPath}
          />
          
          <FileOperations 
            onCreateFile={handleCreateFile}
            onCreateFolder={handleCreateFolder}
            onDeleteItem={selectedFile ? selectedFile.path : null}
            handleDeleteItem={handleDeleteItem}
          />
        </div>
        
        {selectedFile && (
          <FileViewer 
            file={selectedFile}
            content={fileContent}
            onContentChange={(newContent) => setFileContent(newContent)}
            onSave={handleSaveFile}
          />
        )}
      </div>
    </div>
  );
}

export default App;