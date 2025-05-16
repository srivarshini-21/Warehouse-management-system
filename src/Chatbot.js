import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  IconButton, 
  TextField, 
  Avatar, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText 
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy'; // Bot logo
import AgricultureIcon from '@mui/icons-material/Agriculture'; // Agri logo

const AgriChatbot = () => {
  const [messages, setMessages] = useState([
    { 
      text: "Hello! I'm AgriBot. How can I help you today?", 
      sender: 'bot' 
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending a message
  const handleSend = () => {
    if (input.trim() === '') return;

    // Add user message
    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');

    // Simulate bot reply after 1s
    setTimeout(() => {
      const botReply = generateBotReply(input);
      setMessages([...newMessages, { text: botReply, sender: 'bot' }]);
    }, 1000);
  };

  // Generate bot reply based on keywords
  const generateBotReply = (userInput) => {
    const lowerInput = userInput.toLowerCase();

    if (lowerInput.includes('order') || lowerInput.includes('track')) {
      return "To track your order, please provide your **order number**.";
    } else if (lowerInput.includes('fertilizer') || lowerInput.includes('seed')) {
      return "We have organic fertilizers and high-yield seeds available. Check our **Products** section!";
    } else if (lowerInput.includes('price') || lowerInput.includes('cost')) {
      return "Current market prices are updated daily. Visit **Pricing** for details.";
    } else if (lowerInput.includes('delivery') || lowerInput.includes('ship')) {
      return "Delivery takes **2-5 business days** depending on location.";
    } else {
      return "I’m here to help with orders, products, and farming advice. Ask me anything!";
    }
  };

  return (
    <Box sx={{ 
      position: 'fixed', 
      bottom: 20, 
      right: 20, 
      width: 350, 
      maxHeight: 500,
      bgcolor: 'white',
      boxShadow: 3,
      borderRadius: 2,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Chatbot Header */}
      <Box sx={{ 
        bgcolor: '#4CAF50', 
        color: 'white', 
        p: 2, 
        display: 'flex', 
        alignItems: 'center' 
      }}>
        <AgricultureIcon sx={{ mr: 1 }} />
        <Typography variant="h6">AgriBot Assistant</Typography>
      </Box>

      {/* Messages Area */}
      <Box sx={{ 
        flex: 1, 
        p: 2, 
        overflowY: 'auto',
        bgcolor: '#f9f9f9' 
      }}>
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index} sx={{ 
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              alignItems: 'flex-start'
            }}>
              {msg.sender === 'bot' && (
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: '#4CAF50' }}>
                    <SmartToyIcon />
                  </Avatar>
                </ListItemAvatar>
              )}
              <Paper sx={{ 
                p: 1.5, 
                ml: msg.sender === 'bot' ? 0 : 2,
                mr: msg.sender === 'bot' ? 2 : 0,
                bgcolor: msg.sender === 'bot' ? '#e8f5e9' : '#4CAF50',
                color: msg.sender === 'bot' ? 'black' : 'white',
                borderRadius: msg.sender === 'bot' ? '0 10px 10px 10px' : '10px 0 10px 10px'
              }}>
                <Typography variant="body1">{msg.text}</Typography>
              </Paper>
              {msg.sender === 'user' && (
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: '#2196F3' }}>U</Avatar>
                </ListItemAvatar>
              )}
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Box>

      {/* Input Area */}
      <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0', display: 'flex' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          sx={{ mr: 1 }}
        />
        <IconButton 
          color="primary" 
          onClick={handleSend}
          sx={{ bgcolor: '#4CAF50', color: 'white', '&:hover': { bgcolor: '#388E3C' } }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default AgriChatbot;