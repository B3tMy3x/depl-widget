(function(o,i){typeof exports=="object"&&typeof module<"u"?module.exports=i():typeof define=="function"&&define.amd?define(i):(o=typeof globalThis<"u"?globalThis:o||self,o.ChatbotWidget=i())})(this,function(){"use strict";var m=Object.defineProperty;var p=(o,i,e)=>i in o?m(o,i,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[i]=e;var r=(o,i,e)=>p(o,typeof i!="symbol"?i+"":i,e);class o{constructor(){r(this,"container");r(this,"contentElement");r(this,"inputElement");r(this,"state",{messages:[],isTyping:!1});r(this,"isOpen",!1);this.container=document.createElement("div"),this.container.className="chatbot-widget",this.init()}init(){var l;const e=document.createElement("button");e.className="chatbot-toggle",e.innerHTML=`
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
    `;const t=document.createElement("div");t.className="chatbot-container";const s=document.createElement("div");s.className="chatbot-header",s.innerHTML=`
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
    `,this.contentElement=document.createElement("div"),this.contentElement.className="chatbot-content",this.contentElement.innerHTML='<p class="chatbot-welcome">Здравствуйте! Чем могу помочь?</p>';const n=document.createElement("div");n.className="chatbot-input",this.inputElement=document.createElement("input"),this.inputElement.type="text",this.inputElement.placeholder="Введите сообщение...";const a=document.createElement("button");a.innerHTML=`
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.3333 1.66667L9.16667 10.8333M18.3333 1.66667L12.5 18.3333L9.16667 10.8333M18.3333 1.66667L1.66667 7.5L9.16667 10.8333" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,n.appendChild(this.inputElement),n.appendChild(a),t.appendChild(s),t.appendChild(this.contentElement),t.appendChild(n),this.container.appendChild(e),this.container.appendChild(t),document.body.appendChild(this.container),e.addEventListener("click",()=>this.toggle()),(l=s.querySelector(".chatbot-close"))==null||l.addEventListener("click",()=>this.toggle()),a.addEventListener("click",()=>this.sendMessage()),this.inputElement.addEventListener("keypress",c=>{c.key==="Enter"&&this.sendMessage()}),this.loadMessages()}loadMessages(){const e=localStorage.getItem("chatMessages");e&&(this.state.messages=JSON.parse(e).map(t=>({...t,timestamp:new Date(t.timestamp)})),this.state.messages.forEach(t=>this.renderMessage(t)))}saveMessages(){localStorage.setItem("chatMessages",JSON.stringify(this.state.messages))}async sendMessage(){const e=this.inputElement.value.trim();if(!e)return;this.inputElement.value="";const t={id:Date.now().toString(),text:e,sender:"user",timestamp:new Date};this.state.messages.push(t),this.renderMessage(t),this.scrollToBottom(),this.state.isTyping=!0,this.renderTypingIndicator(),await new Promise(n=>setTimeout(n,1500+Math.random()*1e3)),this.state.isTyping=!1;const s=await this.fetchBotMessage(e);this.state.messages.push(s),this.removeTypingIndicator(),this.renderMessage(s),this.scrollToBottom(),this.saveMessages()}updateTemporaryMessage(e,t){const s=document.getElementById(e);if(s){const n=s.querySelector("p");n&&(n.textContent=t)}}removeTemporaryMessage(e){const t=document.getElementById(e);t&&t.remove()}renderTemporaryMessage(e){const t=document.getElementById("chat-container"),s=document.createElement("div");s.id=e,s.classList.add("message");const n=document.createElement("p");n.textContent="",s.appendChild(n),t==null||t.appendChild(s)}async fetchBotMessage(e){var s;const t=`temp-${Date.now()}`;this.renderTemporaryMessage(t);try{const n=await fetch("http://site.m1r0.webtm.ru:9000/ask/",{method:"POST",headers:{accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({question:encodeURIComponent(e)})});if(!n.ok)throw new Error(`HTTP Error: ${n.status} ${n.statusText}`);const a=(s=n.body)==null?void 0:s.getReader(),l=new TextDecoder("utf-8");let c="";for(;a;){const{done:d,value:h}=await a.read();if(d)break;c+=l.decode(h,{stream:!0}),this.updateTemporaryMessage(t,c)}return this.removeTemporaryMessage(t),{id:Date.now().toString(),text:c||"Извините, бот не смог ответить.",sender:"bot",timestamp:new Date}}catch(n){return console.error("Error fetching bot message:",n),this.removeTemporaryMessage(t),{id:Date.now().toString(),text:"Произошла ошибка. Попробуйте позже.",sender:"bot",timestamp:new Date}}}renderMessage(e){const t=document.createElement("div");t.className=`chatbot-message ${e.sender}`;const s=new Date(e.timestamp).toLocaleTimeString("ru-RU",{hour:"2-digit",minute:"2-digit"});t.innerHTML=`
      <div class="message-content">
        <p>${e.text}</p>
        <span class="message-time">${s}</span>
      </div>
    `,this.contentElement.appendChild(t)}renderTypingIndicator(){const e=document.createElement("div");e.className="chatbot-message bot typing",e.innerHTML=`
      <div class="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `,this.contentElement.appendChild(e),this.scrollToBottom()}removeTypingIndicator(){const e=this.contentElement.querySelector(".typing");e&&e.remove()}scrollToBottom(){this.contentElement.scrollTop=this.contentElement.scrollHeight}toggle(){this.isOpen=!this.isOpen,this.container.classList.toggle("open",this.isOpen)}}return o});
