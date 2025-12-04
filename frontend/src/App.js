import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Configure API base URL from environment variable
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

function App() {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '', 
    email: '', 
    category: 'General' 
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/contacts`);
      setContacts(response.data);
    } catch (error) {
      setMessage('Error fetching contacts');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.email) {
      setMessage('Please fill in all required fields');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage('Please enter a valid email address');
      return;
    }

    try {
      if (editingId) {
        await axios.put(`${API_BASE_URL}/contacts/${editingId}`, formData);
        setMessage('Contact updated successfully!');
        setEditingId(null);
      } else {
        await axios.post(`${API_BASE_URL}/contacts`, formData);
        setMessage('Contact added successfully!');
      }
      
      setFormData({ name: '', phone: '', email: '', category: 'General' });
      setShowForm(false);
      fetchContacts();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error saving contact');
      console.error('Error:', error);
    }
  };

  const handleEdit = (contact) => {
    setFormData({ 
      name: contact.name, 
      phone: contact.phone, 
      email: contact.email,
      category: contact.category 
    });
    setEditingId(contact.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await axios.delete(`${API_BASE_URL}/contacts/${id}`);
        setMessage('Contact deleted successfully!');
        fetchContacts();
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage('Error deleting contact');
        console.error('Error:', error);
      }
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', phone: '', email: '', category: 'General' });
    setEditingId(null);
    setShowForm(false);
  };

  // Get unique categories
  const categories = ['All', ...new Set(contacts.map(c => c.category))];

  // Filter contacts by category
  const filteredContacts = selectedCategory === 'All' 
    ? contacts 
    : contacts.filter(c => c.category === selectedCategory);

  // Group contacts by category
  const groupedContacts = filteredContacts.reduce((acc, contact) => {
    const cat = contact.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(contact);
    return acc;
  }, {});

  return (
    <div className="App">
      <header className="header">
        <h1>Contact Manager</h1>
        <p>{contacts.length} {contacts.length === 1 ? 'Contact' : 'Contacts'}</p>
      </header>

      <main className="container">
        {message && (
          <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

        <div className="controls">
          <div className="category-filter">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <button 
            className="btn-add" 
            onClick={() => {
              setShowForm(!showForm);
              if (showForm) handleCancel();
            }}
          >
            {showForm ? '✕ Cancel' : '+ Add Contact'}
          </button>
        </div>

        {showForm && (
          <div className="form-section">
            <h2>{editingId ? 'Edit Contact' : 'New Contact'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone *</label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1-234-567-8900"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="General">General</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Family">Family</option>
                    <option value="Friends">Friends</option>
                  </select>
                </div>
              </div>
              <div className="button-group">
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Update Contact' : 'Add Contact'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="contacts-section">
          {loading ? (
            <p className="loading">Loading contacts...</p>
          ) : filteredContacts.length === 0 ? (
            <div className="no-contacts">
              <p>No contacts found</p>
              <p className="hint">Click "Add Contact" to create your first contact</p>
            </div>
          ) : selectedCategory === 'All' ? (
            Object.keys(groupedContacts).sort().map((category) => (
              <div key={category} className="category-group">
                <h3 className="category-title">{category}</h3>
                <div className="contacts-list">
                  {groupedContacts[category].map((contact) => (
                    <div key={contact.id} className="contact-card">
                      <div className="contact-info">
                        <h4>{contact.name}</h4>
                        <p className="contact-detail">
                          <span className="icon">📞</span> {contact.phone}
                        </p>
                        <p className="contact-detail">
                          <span className="icon">✉️</span> {contact.email}
                        </p>
                        <span className="contact-category">{contact.category}</span>
                      </div>
                      <div className="contact-actions">
                        <button className="btn-icon" onClick={() => handleEdit(contact)} title="Edit">
                          ✏️
                        </button>
                        <button className="btn-icon" onClick={() => handleDelete(contact.id)} title="Delete">
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="contacts-list">
              {filteredContacts.map((contact) => (
                <div key={contact.id} className="contact-card">
                  <div className="contact-info">
                    <h4>{contact.name}</h4>
                    <p className="contact-detail">
                      <span className="icon">📞</span> {contact.phone}
                    </p>
                    <p className="contact-detail">
                      <span className="icon">✉️</span> {contact.email}
                    </p>
                    <span className="contact-category">{contact.category}</span>
                  </div>
                  <div className="contact-actions">
                    <button className="btn-icon" onClick={() => handleEdit(contact)} title="Edit">
                      ✏️
                    </button>
                    <button className="btn-icon" onClick={() => handleDelete(contact.id)} title="Delete">
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
