const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory data storage (replace with database in production)
let contacts = [
  { 
    id: 1, 
    name: 'John Doe', 
    phone: '+1-234-567-8900',
    email: 'john.doe@example.com',
    category: 'Work'
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    phone: '+1-234-567-8901',
    email: 'jane.smith@example.com',
    category: 'Personal'
  },
  { 
    id: 3, 
    name: 'Bob Wilson', 
    phone: '+1-234-567-8902',
    email: 'bob.wilson@example.com',
    category: 'Work'
  }
];

let nextId = 4;

// Routes
app.get('/api', (req, res) => {
  res.json({ message: 'Contact Manager API' });
});

// Get all contacts
app.get('/api/contacts', (req, res) => {
  res.json(contacts);
});

// Get single contact
app.get('/api/contacts/:id', (req, res) => {
  const contact = contacts.find(c => c.id === parseInt(req.params.id));
  if (!contact) {
    return res.status(404).json({ message: 'Contact not found' });
  }
  res.json(contact);
});

// Create new contact
app.post('/api/contacts', (req, res) => {
  const { name, phone, email, category } = req.body;
  
  if (!name || !phone || !email) {
    return res.status(400).json({ message: 'Name, phone, and email are required' });
  }
  
  const newContact = {
    id: nextId++,
    name,
    phone,
    email,
    category: category || 'General'
  };
  
  contacts.push(newContact);
  res.status(201).json(newContact);
});

// Update contact
app.put('/api/contacts/:id', (req, res) => {
  const contact = contacts.find(c => c.id === parseInt(req.params.id));
  if (!contact) {
    return res.status(404).json({ message: 'Contact not found' });
  }
  
  contact.name = req.body.name || contact.name;
  contact.phone = req.body.phone || contact.phone;
  contact.email = req.body.email || contact.email;
  contact.category = req.body.category || contact.category;
  
  res.json(contact);
});

// Delete contact
app.delete('/api/contacts/:id', (req, res) => {
  const index = contacts.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Contact not found' });
  }
  
  contacts.splice(index, 1);
  res.json({ message: 'Contact deleted successfully' });
});

// Get all categories
app.get('/api/categories', (req, res) => {
  const categories = [...new Set(contacts.map(c => c.category))];
  res.json(categories);
});

// Export for Vercel serverless function
module.exports = app;
