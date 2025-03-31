import { useState } from 'react';
import './FileOperations.css';

const FileOperations = ({ onCreateFile, onCreateFolder, onDeleteItem, handleDeleteItem }) => {
  const [newItemName, setNewItemName] = useState('');
  const [operationType, setOperationType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    
    if (operationType === 'file') {
      onCreateFile(newItemName);
    } else if (operationType === 'folder') {
      onCreateFolder(newItemName);
    }
    
    setNewItemName('');
    setOperationType('');
  };

  return (
    <div className="file-operations">
      <h3>File Operations</h3>
      
      <div className="operation-buttons">
        <button onClick={() => setOperationType('file')}>Create File</button>
        <button onClick={() => setOperationType('folder')}>Create Folder</button>
        <button 
          onClick={() => onDeleteItem && handleDeleteItem(onDeleteItem)}
          disabled={!onDeleteItem}
          className={!onDeleteItem ? 'disabled' : ''}
        >
          Delete Selected
        </button>
      </div>
      
      {operationType && (
        <form onSubmit={handleSubmit} className="create-form">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder={`Enter name for new ${operationType}`}
            autoFocus
          />
          <div className="form-buttons">
            <button type="submit">Create</button>
            <button type="button" onClick={() => setOperationType('')}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default FileOperations;