import './styles.css';
import { ChatState, Message } from './types';

class ChatbotWidget {
  private container: HTMLDivElement;
  private contentElement!: HTMLDivElement;
  private inputElement!: HTMLInputElement;
  private state: ChatState = {
    messages: [],
    isTyping: false
  };
  private isOpen = false;

  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'chatbot-widget';
    this.init();
  }

  private init() {
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'chatbot-toggle';
    toggleBtn.innerHTML = `
      <div class="chatbot-toggle-content">
        <div class="chatbot-toggle-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.663 3.04094 17.0829 4.73812 18.875L2.72681 21.1705C2.44361 21.4937 2.67314 22 3.10288 22H12Z" fill="currentColor"/>
            <circle cx="8" cy="12" r="1.5" fill="white"/>
            <circle cx="12" cy="12" r="1.5" fill="white"/>
            <circle cx="16" cy="12" r="1.5" fill="white"/>
          </svg>
        </div>
      </div>
    `;

    const chatContainer = document.createElement('div');
    chatContainer.className = 'chatbot-container';
    
    const header = document.createElement('div');
    header.className = 'chatbot-header';
    header.innerHTML = `
      <div class="chatbot-header-info">
        <div class="chatbot-header-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.663 3.04094 17.0829 4.73812 18.875L2.72681 21.1705C2.44361 21.4937 2.67314 22 3.10288 22H12Z" fill="currentColor"/>
          </svg>
        </div>
        <div>
          <h3>Виртуальный помощник</h3>
          <span class="chatbot-status">
            <span class="status-dot"></span>
            Онлайн
          </span>
        </div>
      </div>
      <button class="chatbot-close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    `;

    this.contentElement = document.createElement('div');
    this.contentElement.className = 'chatbot-content';
    this.contentElement.innerHTML = '<p class="chatbot-welcome">Здравствуйте! Чем могу помочь?</p>';

    const inputContainer = document.createElement('div');
    inputContainer.className = 'chatbot-input';
    
    this.inputElement = document.createElement('input');
    this.inputElement.type = 'text';
    this.inputElement.placeholder = 'Введите сообщение...';
    
    const sendButton = document.createElement('button');
    sendButton.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.3333 1.66667L9.16667 10.8333M18.3333 1.66667L12.5 18.3333L9.16667 10.8333M18.3333 1.66667L1.66667 7.5L9.16667 10.8333" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;

    inputContainer.appendChild(this.inputElement);
    inputContainer.appendChild(sendButton);

    chatContainer.appendChild(header);
    chatContainer.appendChild(this.contentElement);
    chatContainer.appendChild(inputContainer);
    this.container.appendChild(toggleBtn);
    this.container.appendChild(chatContainer);

    document.body.appendChild(this.container);

    toggleBtn.addEventListener('click', () => this.toggle());
    header.querySelector('.chatbot-close')?.addEventListener('click', () => this.toggle());
    sendButton.addEventListener('click', () => this.sendMessage());
    this.inputElement.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });

    this.loadMessages();
  }

  private loadMessages() {
    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
      this.state.messages = JSON.parse(storedMessages);
      this.state.messages.forEach((message: Message) => this.renderMessage(message));
    }
  }

  private saveMessages() {
    localStorage.setItem('chatMessages', JSON.stringify(this.state.messages));
  }

  private async sendMessage() {
    const text = this.inputElement.value.trim();
    if (!text) return;

    this.inputElement.value = '';
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    this.state.messages.push(userMessage);
    this.renderMessage(userMessage);
    this.scrollToBottom();

    this.state.isTyping = true;
    this.renderTypingIndicator();

    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

    this.state.isTyping = false;
    const botMessage: Message = await this.fetchBotMessage(text);

    this.state.messages.push(botMessage);
    this.removeTypingIndicator();
    this.renderMessage(botMessage);
    this.scrollToBottom();

    this.saveMessages();
  }

  private async fetchBotMessage(userMessage: string): Promise<Message> {
    const response = await fetch(`http://localhost:8000/stream?query=${encodeURIComponent(userMessage)}`, {
      method: 'GET',
      headers: {
        'accept': 'application/json'
      }
    });

    const data = await response.json();
    return {
      id: Date.now().toString(),
      text: data.message || 'Извините, в данный момент я не могу ответить на ваше сообщение.',
      sender: 'bot',
      timestamp: new Date()
    };
  }

  private renderMessage(message: Message) {
    const messageElement = document.createElement('div');
    messageElement.className = `chatbot-message ${message.sender}`;
    messageElement.innerHTML = `
      <div class="message-content">
        <p>${message.text}</p>
        <span class="message-time">${message.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    `;
    this.contentElement.appendChild(messageElement);
  }

  private renderTypingIndicator() {
    const typingElement = document.createElement('div');
    typingElement.className = 'chatbot-message bot typing';
    typingElement.innerHTML = `
      <div class="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
    this.contentElement.appendChild(typingElement);
    this.scrollToBottom();
  }

  private removeTypingIndicator() {
    const typingElement = this.contentElement.querySelector('.typing');
    if (typingElement) {
      typingElement.remove();
    }
  }

  private scrollToBottom() {
    this.contentElement.scrollTop = this.contentElement.scrollHeight;
  }

  private toggle() {
    this.isOpen = !this.isOpen;
    this.container.classList.toggle('open', this.isOpen);
  }
}

export default ChatbotWidget;
