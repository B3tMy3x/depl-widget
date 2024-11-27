var m=Object.defineProperty;var h=(a,e,t)=>e in a?m(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var r=(a,e,t)=>h(a,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();class p{constructor(){r(this,"container");r(this,"contentElement");r(this,"inputElement");r(this,"state",{messages:[],isTyping:!1});r(this,"isOpen",!1);this.container=document.createElement("div"),this.container.className="chatbot-widget",this.init()}init(){var i;const e=document.createElement("button");e.className="chatbot-toggle",e.innerHTML=`
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
    `;const t=document.createElement("div");t.className="chatbot-container";const n=document.createElement("div");n.className="chatbot-header",n.innerHTML=`
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
    `,this.contentElement=document.createElement("div"),this.contentElement.className="chatbot-content",this.contentElement.innerHTML='<p class="chatbot-welcome">Здравствуйте! Чем могу помочь?</p>';const s=document.createElement("div");s.className="chatbot-input",this.inputElement=document.createElement("input"),this.inputElement.type="text",this.inputElement.placeholder="Введите сообщение...";const o=document.createElement("button");o.innerHTML=`
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.3333 1.66667L9.16667 10.8333M18.3333 1.66667L12.5 18.3333L9.16667 10.8333M18.3333 1.66667L1.66667 7.5L9.16667 10.8333" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,s.appendChild(this.inputElement),s.appendChild(o),t.appendChild(n),t.appendChild(this.contentElement),t.appendChild(s),this.container.appendChild(e),this.container.appendChild(t),document.body.appendChild(this.container),e.addEventListener("click",()=>this.toggle()),(i=n.querySelector(".chatbot-close"))==null||i.addEventListener("click",()=>this.toggle()),o.addEventListener("click",()=>this.sendMessage()),this.inputElement.addEventListener("keypress",c=>{c.key==="Enter"&&this.sendMessage()}),this.loadMessages()}loadMessages(){const e=localStorage.getItem("chatMessages");e&&(this.state.messages=JSON.parse(e).map(t=>({...t,timestamp:new Date(t.timestamp)})),this.state.messages.forEach(t=>this.renderMessage(t)))}saveMessages(){localStorage.setItem("chatMessages",JSON.stringify(this.state.messages))}async sendMessage(){const e=this.inputElement.value.trim();if(!e)return;this.inputElement.value="";const t={id:Date.now().toString(),text:e,sender:"user",timestamp:new Date};this.state.messages.push(t),this.renderMessage(t),this.scrollToBottom(),this.state.isTyping=!0,this.renderTypingIndicator(),await new Promise(s=>setTimeout(s,1500+Math.random()*1e3)),this.state.isTyping=!1;const n=await this.fetchBotMessage(e);this.state.messages.push(n),this.removeTypingIndicator(),this.renderMessage(n),this.scrollToBottom(),this.saveMessages()}updateTemporaryMessage(e,t){const n=document.getElementById(e);if(n){const s=n.querySelector("p");s&&(s.textContent=t)}}removeTemporaryMessage(e){const t=document.getElementById(e);t&&t.remove()}renderTemporaryMessage(e){const t=document.getElementById("chat-container"),n=document.createElement("div");n.id=e,n.classList.add("message");const s=document.createElement("p");s.textContent="",n.appendChild(s),t==null||t.appendChild(n)}async fetchBotMessage(e){var n;const t=`temp-${Date.now()}`;this.renderTemporaryMessage(t);try{const s=await fetch("http://site.m1r0.webtm.ru:9000/ask/",{method:"POST",headers:{accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({question:encodeURIComponent(e)})});if(!s.ok)throw new Error(`HTTP Error: ${s.status} ${s.statusText}`);const o=(n=s.body)==null?void 0:n.getReader(),i=new TextDecoder("utf-8");let c="";for(;o;){const{done:l,value:d}=await o.read();if(l)break;c+=i.decode(d,{stream:!0}),this.updateTemporaryMessage(t,c)}return this.removeTemporaryMessage(t),{id:Date.now().toString(),text:c||"Извините, бот не смог ответить.",sender:"bot",timestamp:new Date}}catch(s){return console.error("Error fetching bot message:",s),this.removeTemporaryMessage(t),{id:Date.now().toString(),text:"Произошла ошибка. Попробуйте позже.",sender:"bot",timestamp:new Date}}}renderMessage(e){const t=document.createElement("div");t.className=`chatbot-message ${e.sender}`;const n=new Date(e.timestamp).toLocaleTimeString("ru-RU",{hour:"2-digit",minute:"2-digit"});t.innerHTML=`
      <div class="message-content">
        <p>${e.text}</p>
        <span class="message-time">${n}</span>
      </div>
    `,this.contentElement.appendChild(t)}renderTypingIndicator(){const e=document.createElement("div");e.className="chatbot-message bot typing",e.innerHTML=`
      <div class="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `,this.contentElement.appendChild(e),this.scrollToBottom()}removeTypingIndicator(){const e=this.contentElement.querySelector(".typing");e&&e.remove()}scrollToBottom(){this.contentElement.scrollTop=this.contentElement.scrollHeight}toggle(){this.isOpen=!this.isOpen,this.container.classList.toggle("open",this.isOpen)}}document.addEventListener("DOMContentLoaded",()=>{new p});
