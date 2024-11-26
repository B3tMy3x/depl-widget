(function(n,s){typeof exports=="object"&&typeof module<"u"?module.exports=s():typeof define=="function"&&define.amd?define(s):(n=typeof globalThis<"u"?globalThis:n||self,n.ChatbotWidget=s())})(this,function(){"use strict";var h=Object.defineProperty;var d=(n,s,e)=>s in n?h(n,s,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[s]=e;var a=(n,s,e)=>d(n,typeof s!="symbol"?s+"":s,e);class n{constructor(){a(this,"container");a(this,"contentElement");a(this,"inputElement");a(this,"state",{messages:[],isTyping:!1});a(this,"isOpen",!1);this.container=document.createElement("div"),this.container.className="chatbot-widget",this.init()}init(){var l;const e=document.createElement("button");e.className="chatbot-toggle",e.innerHTML=`
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
    `;const t=document.createElement("div");t.className="chatbot-container";const i=document.createElement("div");i.className="chatbot-header",i.innerHTML=`
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
    `,this.contentElement=document.createElement("div"),this.contentElement.className="chatbot-content",this.contentElement.innerHTML='<p class="chatbot-welcome">Здравствуйте! Чем могу помочь?</p>';const o=document.createElement("div");o.className="chatbot-input",this.inputElement=document.createElement("input"),this.inputElement.type="text",this.inputElement.placeholder="Введите сообщение...";const c=document.createElement("button");c.innerHTML=`
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.3333 1.66667L9.16667 10.8333M18.3333 1.66667L12.5 18.3333L9.16667 10.8333M18.3333 1.66667L1.66667 7.5L9.16667 10.8333" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,o.appendChild(this.inputElement),o.appendChild(c),t.appendChild(i),t.appendChild(this.contentElement),t.appendChild(o),this.container.appendChild(e),this.container.appendChild(t),document.body.appendChild(this.container),e.addEventListener("click",()=>this.toggle()),(l=i.querySelector(".chatbot-close"))==null||l.addEventListener("click",()=>this.toggle()),c.addEventListener("click",()=>this.sendMessage()),this.inputElement.addEventListener("keypress",r=>{r.key==="Enter"&&this.sendMessage()}),this.loadMessages()}loadMessages(){const e=localStorage.getItem("chatMessages");e&&(this.state.messages=JSON.parse(e),this.state.messages.forEach(t=>this.renderMessage(t)))}saveMessages(){localStorage.setItem("chatMessages",JSON.stringify(this.state.messages))}async sendMessage(){const e=this.inputElement.value.trim();if(!e)return;this.inputElement.value="";const t={id:Date.now().toString(),text:e,sender:"user",timestamp:new Date};this.state.messages.push(t),this.renderMessage(t),this.scrollToBottom(),this.state.isTyping=!0,this.renderTypingIndicator(),await new Promise(o=>setTimeout(o,1500+Math.random()*1e3)),this.state.isTyping=!1;const i=await this.fetchBotMessage(e);this.state.messages.push(i),this.removeTypingIndicator(),this.renderMessage(i),this.scrollToBottom(),this.saveMessages()}async fetchBotMessage(e){const i=await(await fetch(`http://localhost:8000/stream?query=${encodeURIComponent(e)}`,{method:"GET",headers:{accept:"application/json"}})).json();return{id:Date.now().toString(),text:i.message||"Извините, в данный момент я не могу ответить на ваше сообщение.",sender:"bot",timestamp:new Date}}renderMessage(e){const t=document.createElement("div");t.className=`chatbot-message ${e.sender}`,t.innerHTML=`
      <div class="message-content">
        <p>${e.text}</p>
        <span class="message-time">${e.timestamp.toLocaleTimeString("ru-RU",{hour:"2-digit",minute:"2-digit"})}</span>
      </div>
    `,this.contentElement.appendChild(t)}renderTypingIndicator(){const e=document.createElement("div");e.className="chatbot-message bot typing",e.innerHTML=`
      <div class="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `,this.contentElement.appendChild(e),this.scrollToBottom()}removeTypingIndicator(){const e=this.contentElement.querySelector(".typing");e&&e.remove()}scrollToBottom(){this.contentElement.scrollTop=this.contentElement.scrollHeight}toggle(){this.isOpen=!this.isOpen,this.container.classList.toggle("open",this.isOpen)}}return n});
