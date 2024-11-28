var g=Object.defineProperty;var u=(i,e,t)=>e in i?g(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var a=(i,e,t)=>u(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();class f{constructor(){a(this,"container");a(this,"contentElement");a(this,"inputElement");a(this,"state",{messages:[],isTyping:!1});a(this,"isOpen",!1);this.container=document.createElement("div"),this.container.className="chatbot-widget",this.init()}init(){var o,s;const e=this.createToggleButton(),t=this.createChatContainer();this.container.appendChild(e),this.container.appendChild(t),document.body.appendChild(this.container),e.addEventListener("click",()=>this.toggle()),(o=t.querySelector(".chatbot-close"))==null||o.addEventListener("click",()=>this.toggle()),(s=t.querySelector(".chatbot-send-button"))==null||s.addEventListener("click",()=>this.sendMessage()),this.inputElement.addEventListener("keypress",n=>{n.key==="Enter"&&this.sendMessage()}),this.loadMessages()}createToggleButton(){const e=document.createElement("button");return e.className="chatbot-toggle",e.innerHTML=`

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

    `,e}createChatContainer(){const e=document.createElement("div");e.className="chatbot-container";const t=this.createChatHeader();this.contentElement=this.createChatContent();const o=this.createInputContainer();return e.appendChild(t),e.appendChild(this.contentElement),e.appendChild(o),e}createChatHeader(){const e=document.createElement("div");return e.className="chatbot-header",e.innerHTML=`

      <div class="chatbot-header-info">

        <div class="chatbot-header-icon">

          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.663 3.04094 17.0829 4.73812 18.875L2.72681 21.1705C2.44361 21.4937 2.67314 22 3.10288 22H12Z" fill=" currentColor"/>

          </svg>

        </div>

        <div>

          <h3>Виртуальный помощник</h3>

          <span class="chatbot-status">

            <span class="status-dot"></span> Онлайн

          </span>

        </div>

      </div>

      <button class="chatbot-close">

        <svg width="24" height="24" viewBox ="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>

        </svg>

      </button>

    `,e}createChatContent(){const e=document.createElement("div");return e.className="chatbot-content",e.innerHTML='<p class="chatbot-welcome">Здравствуйте! Чем могу помочь?</p>',e}createInputContainer(){const e=document.createElement("div");e.className="chatbot-input",this.inputElement=document.createElement("input"),this.inputElement.type="text",this.inputElement.placeholder="Введите сообщение...";const t=document.createElement("button");return t.className="chatbot-send-button",t.innerHTML=`

      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">

        <path d="M18.3333 1.66667L9.16667 10.8333M18.3333 1.66667L12.5 18.3333L9.16667 10.8333M18.3333 1.66667L1.66667 7.5L9.16667 10.8333" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>

      </svg>

    `,e.appendChild(this.inputElement),e.appendChild(t),e}loadMessages(){const e=localStorage.getItem("chatMessages");e&&(this.state.messages=JSON.parse(e).map(t=>({...t,timestamp:new Date(t.timestamp)})),this.state.messages.forEach(t=>this.renderMessage(t)))}saveMessages(){localStorage.setItem("chatMessages",JSON.stringify(this.state.messages))}async sendMessage(){const e=this.inputElement.value.trim();if(!e)return;this.inputElement.value="";const t={id:Date.now().toString(),text:e,sender:"user",timestamp:new Date};this.state.messages.push(t),this.renderMessage(t),this.scrollToBottom(),this.state.isTyping=!0;const o=this.renderTypingIndicator();this.contentElement.appendChild(o),this.scrollToBottom();const s=await this.fetchBotMessage(e);o.remove(),this.state.messages.push(s),this.scrollToBottom(),this.saveMessages()}async fetchBotMessage(e){var o;let t="";try{const s=await fetch(`http://site.m1r0.webtm.ru:9000/ask?question=${encodeURIComponent(e)}`,{method:"POST",headers:{accept:"application/json","Content-Type":"application/json"}});if(!s.ok)throw new Error(`HTTP Error: ${s.status} ${s.statusText}`);const n=(o=s.body)==null?void 0:o.getReader(),r=new TextDecoder("utf-8"),c=document.createElement("div");for(c.className="chatbot-message bot",this.contentElement.appendChild(c),this.scrollToBottom();n;){const{done:h,value:m}=await n.read();if(h)break;const p=r.decode(m,{stream:!0}).split(`
`);for(const l of p)if(l.startsWith("data: ")){const d=l.replace("data: ","").trim();t.length>0&&t.endsWith(".")&&!d.startsWith(" ")&&(t+=" "),t+=d,c.innerHTML=`<div class="message-content"><p>${t}</p></div>`,this.scrollToBottom()}}return t.length===0&&(c.innerHTML='<div class="message-content"><p>Извините, бот не смог ответить.</p></div>'),{id:Date.now().toString(),text:t,sender:"bot",timestamp:new Date}}catch(s){return console.error("Error fetching bot message:",s),{id:Date.now().toString(),text:"Произошла ошибка. Попробуйте позже.",sender:"bot",timestamp:new Date}}}renderMessage(e){const t=document.createElement("div");t.className=`chatbot-message ${e.sender}`;const o=new Date(e.timestamp).toLocaleTimeString("ru-RU",{hour:"2-digit",minute:"2-digit"});t.innerHTML=`

      <div class="message-content">

        <p>${e.text}</p>

        <span class="message-time">${o}</span>

      </div>

    `,this.contentElement.appendChild(t)}renderTypingIndicator(){const e=document.createElement("div");return e.className="chatbot-message bot typing",e.innerHTML=`

      <div class="typing-indicator">

        <span></span>

        <span></span>

        <span></span>

      </div>

    `,e}scrollToBottom(){this.contentElement.scrollTop=this.contentElement.scrollHeight}toggle(){this.isOpen=!this.isOpen,this.container.classList.toggle("open",this.isOpen)}}document.addEventListener("DOMContentLoaded",()=>{new f});
