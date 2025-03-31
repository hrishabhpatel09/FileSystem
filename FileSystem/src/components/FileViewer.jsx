import './FileViewer.css';

const FileViewer = ({ file, content, onContentChange, onSave }) => {
  // Determine if the file is a binary file (simple check based on extension)
  const isBinaryFile = () => {
    const binaryExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.pdf', '.zip', '.exe'];
    return binaryExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
  };

  return (
    <div className="file-viewer">
      <div className="file-header">
        <h2>{file.name}</h2>
        <button onClick={onSave}>Save</button>
      </div>
      
      {isBinaryFile() ? (
        <div className="binary-message">
          Binary file content cannot be displayed
        </div>
      ) : (
        <textarea
          className="file-content"
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
        />
      )}
    </div>
  );
};

export default FileViewer;