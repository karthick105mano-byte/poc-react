import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export default function CRUD() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Fetch posts on mount
  useEffect(() => {
    axios.get(`${API_URL}?_limit=5`) // limit for demo
      .then((res) => setPosts(res.data))
      .catch((err) => console.error('Error fetching posts:', err));
  }, []);

  // Create or update
  const handleSubmit = async () => {
    if (!title.trim()) return;

    if (editingId === null) {
      // Create
      try {
        const res = await axios.post(API_URL, {
          title,
          body: '',
          userId: 1
        });
        setPosts([res.data, ...posts]);
        setTitle('');
      } catch (err) {
        console.error('Error creating post:', err);
      }
    } else {
      // Update
      try {
        // const res = await axios.put(`${API_URL}/${editingId}`, {
        //   id: editingId,
        //   title,
        //   body: '',
        //   userId: 1
        // });


        // const res =  await axios.put(`${API_URL}/${editingId}`, {
        //     id: editingId,         // ✅ include id
        //     title,
        //     body: '',
        //     userId: 1
        // });

const res =  await axios.post(`${API_URL}`, 
    {
        id: editingId,
        title,
        body: "",
        userId: 1
    }
);


        setPosts(posts.map(post => post.id === editingId ? res.data : post));
        setEditingId(null);
        setTitle('');
      } catch (err) {
        console.error('Error updating post:', err);
      }
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setPosts(posts.filter(post => post.id !== id));
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  // Edit
  const handleEdit = (post) => {
    setTitle(post.title);
    setEditingId(post.id);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>📝 React CRUD with Mock API</h2>

      <div>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: '8px', width: '80%' }}
        />
        <button onClick={handleSubmit} style={{ padding: '8px', marginLeft: '10px' }}>
          {editingId ? 'Update' : 'Add'}
        </button>
      </div>

      <ul style={{ marginTop: '20px', padding: 0 }}>
        {posts.map(post => (
          <li key={post.id} style={{ listStyle: 'none', marginBottom: '10px' }}>
            <strong>{post.title}</strong>
            <button onClick={() => handleEdit(post)} style={{ marginLeft: '10px' }}>
              ✏️
            </button>
            <button onClick={() => handleDelete(post.id)} style={{ marginLeft: '5px', color: 'red' }}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
