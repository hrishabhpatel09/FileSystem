import express from 'express';
import { readdir, readFile, writeFile, mkdir, unlink, rmdir, stat } from 'fs/promises';
import { join, dirname } from 'path';
import cors from 'cors';

const app = express();
const PORT = 3001;

console.log("Hi Bhai")

app.use(cors());
app.use(express.json());

// Get current working directory
app.get('/api/fs/current-directory', async (req, res) => {
  try {
    const currentDir = process.cwd();
    res.json({ path: currentDir });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get directory contents
app.get('/api/fs/contents', async (req, res) => {
  try {
    const path = req.query.path;
    console.log(path)
    const items = await readdir(path, { withFileTypes: true });
    
    const contents = await Promise.all(items.map(async (item) => {
      const fullPath = join(path, item.name);
      const isDirectory = item.isDirectory();
      
      return {
        name: item.name,
        path: fullPath,
        isDirectory,
      };
    }));
    
    res.json({ contents });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read file
app.get('/api/fs/file', async (req, res) => {
  try {
    const path = req.query.path;
    const content = await readFile(path, 'utf8');
    res.send(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create or update file
app.post('/api/fs/file', async (req, res) => {
  try {
    const { path, content } = req.body;
    await writeFile(path, content || '');
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update file
app.put('/api/fs/file', async (req, res) => {
  try {
    const { path, content } = req.body;
    await writeFile(path, content);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create directory
app.post('/api/fs/directory', async (req, res) => {
  try {
    const { path } = req.body;
    await mkdir(path, { recursive: true });
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete item (file or directory)
app.delete('/api/fs/delete', async (req, res) => {
  try {
    const { path } = req.body;
    const stats = await stat(path);
    
    if (stats.isDirectory()) {
      await rmdir(path, { recursive: true });
    } else {
      await unlink(path);
    }
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`File system API server running on http://localhost:${PORT}`);
});