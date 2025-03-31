import './FileExplorer.css';

const FileExplorer = ({ contents, onFileSelect, currentPath }) => {
  return (
    <div className="file-explorer">
      <h2>Files and Directories</h2>
      <div className="contents-list">
        {contents.length > 0 ? (
          contents.map((item, index) => (
            <div 
              key={index} 
              className={`content-item ${item.isDirectory ? 'directory' : 'file'}`}
              onClick={() => onFileSelect(item)}
            >
              <span className="icon">
                {item.isDirectory ? '📁' : '📄'}
              </span>
              <span className="name">{item.name}</span>
            </div>
          ))
        ) : (
          <div className="empty-message">No files or directories found</div>
        )}
      </div>
    </div>
  );
};

export default FileExplorer;