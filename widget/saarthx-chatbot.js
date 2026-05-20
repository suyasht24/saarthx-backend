window.addEventListener("load", function () {

(function () {

  // 🌟 FLOATING BUTTON
  const button = document.createElement("div");
  button.innerHTML = "💬";

  button.style.position = "fixed";
  button.style.bottom = "25px";
  button.style.right = "25px";
  button.style.width = "70px";
  button.style.height = "70px";
  button.style.background = "#16a34a";
  button.style.color = "#fff";
  button.style.display = "flex";
  button.style.alignItems = "center";
  button.style.justifyContent = "center";
  button.style.borderRadius = "50%";
  button.style.fontSize = "28px";
  button.style.cursor = "pointer";
  button.style.boxShadow = "0 10px 30px rgba(0,0,0,0.25)";
  button.style.zIndex = "9999";
  button.style.animation = "float 2s ease-in-out infinite";

  document.body.appendChild(button);

  // 🏷️ DEMO LABEL
  const label = document.createElement("div");

  label.innerText = "Demo Chatbot";

  label.style.position = "fixed";
  label.style.bottom = "0px";
  label.style.right = "18px";
  label.style.fontSize = "12px";
  label.style.fontWeight = "600";
  label.style.color = "#16a34a";
  label.style.zIndex = "9999";

  document.body.appendChild(label);

  // ✨ GLOBAL STYLES
  const style = document.createElement("style");

  style.innerHTML = `
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
      100% { transform: translateY(0px); }
    }

    #saarthi-chatbox * {
      box-sizing: border-box;
      font-family: Inter, Arial, sans-serif;
    }

    #saarthi-chatbox {
      animation: popup 0.25s ease;
    }

    @keyframes popup {
      from {
        opacity: 0;
        transform: translateY(20px) scale(0.95);
      }

      to {
        opacity: 1;
        transform: translateY(0px) scale(1);
      }
    }

    .faq-chip:hover {
      background: #dcfce7 !important;
      transform: translateY(-1px);
    }

    .send-btn:hover {
      background: #15803d !important;
    }
  `;

  document.head.appendChild(style);

  // 💬 CHAT BOX
  const box = document.createElement("div");

  box.id = "saarthi-chatbox";

  box.style.position = "fixed";
  box.style.bottom = "95px";
  box.style.right = "25px";

  // 🔥 RESPONSIVE SIZE
  box.style.width = "400px";
  box.style.height = "600px";
  if (window.innerWidth < 500) {

  box.style.width = "95vw";
  box.style.height = "85vh";

  box.style.right = "2.5vw";
  box.style.bottom = "10px";

}
  box.style.maxHeight = "80vh";
  

  box.style.background = "#ffffff";
  box.style.borderRadius = "22px";
  box.style.boxShadow = "0 20px 60px rgba(0,0,0,0.25)";
  box.style.display = "none";
  box.style.flexDirection = "column";
  box.style.zIndex = "9999";
  box.style.overflow = "hidden";

  box.innerHTML = `
    <!-- HEADER -->
    <div style="
      background:#16a34a;
      color:#fff;
      padding:16px;
      display:flex;
      justify-content:space-between;
      align-items:center;
    ">
      <div>
        <div style="font-size:17px;font-weight:700;">
          Saarthi - AI Assistant
        </div>

        <div style="font-size:12px;opacity:0.9;margin-top:2px;">
          AI Assistant • Online
        </div>
      </div>

      <div id="close-chat"
        style="
          cursor:pointer;
          font-size:24px;
          font-weight:bold;
          line-height:1;
        ">
        ×
      </div>
    </div>

    <!-- MESSAGES -->
    <div id="chat-messages"
      style="
        flex:1;
        padding:14px;
        overflow-y:auto;
        overflow-x:hidden;
        background:#f9fafb;
      ">
    </div>

    <!-- FAQ -->
    <div id="faq"
      style="
        padding:10px;
        display:flex;
        flex-wrap:wrap;
        gap:8px;
        border-top:1px solid #eee;
        background:#fff;
      ">
    </div>

    <!-- INPUT -->
    <div style="
      display:flex;
      border-top:1px solid #e5e7eb;
      background:#fff;
      padding:10px;
      gap:8px;
    ">
      <input
        id="chat-input"
        placeholder="Ask something..."
        style="
          flex:1;
          padding:12px 14px;
          border:1px solid #ddd;
          border-radius:12px;
          outline:none;
          font-size:14px;
        "
      />

      <button
        id="chat-send"
        class="send-btn"
        style="
          padding:12px 18px;
          background:#16a34a;
          color:#fff;
          border:none;
          border-radius:12px;
          cursor:pointer;
          font-weight:600;
          transition:0.2s;
        "
      >
        Send
      </button>
    </div>
  `;

  document.body.appendChild(box);

  // 💡 POPUP MESSAGE
  const popup = document.createElement("div");

  popup.innerText = "Ask Saarthi for assistance 👋";

  popup.style.position = "fixed";
  popup.style.bottom = "95px";
  popup.style.right = "100px";
  popup.style.background = "#ffffff";
  popup.style.color = "#111827";
  popup.style.padding = "10px 14px";
  popup.style.borderRadius = "14px";
  popup.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
  popup.style.fontSize = "13px";
  popup.style.fontWeight = "600";
  popup.style.zIndex = "9999";
  popup.style.animation = "float 2s ease-in-out infinite";

  document.body.appendChild(popup);

  // 📌 ELEMENTS
  const messages = box.querySelector("#chat-messages");
  const closeBtn = box.querySelector("#close-chat");
  const input = box.querySelector("#chat-input");
  const sendBtn = box.querySelector("#chat-send");
  const faqBox = box.querySelector("#faq");

  // 🔁 OPEN CHAT
  function openChatbot() {

    box.style.display = "flex";

    // 🔥 hide widget items
    button.style.display = "none";
    label.style.display = "none";
    popup.style.display = "none";

  }

  // 🔁 TOGGLE CHAT
  function toggleChatbot() {

    if (box.style.display === "none") {

      openChatbot();

    } else {

      box.style.display = "none";

      // 🔥 show widget again
      button.style.display = "flex";
      label.style.display = "block";
      popup.style.display = "block";

    }

  }

  button.onclick = toggleChatbot;

  // 🌍 GLOBAL ACCESS
  window.openSaarthiChat = openChatbot;

  // ❌ CLOSE BUTTON
  closeBtn.onclick = () => {

    box.style.display = "none";

    // 🔥 show widget again
    button.style.display = "flex";
    label.style.display = "block";
    popup.style.display = "block";

  };

  // ⭐ FAQS
  const faqs = [
    "What services do you provide?",
    "What are your pricing plans?",
    "How long does setup take?",
    "Do you provide support?"
  ];

  faqs.forEach(q => {

    const chip = document.createElement("div");

    chip.innerText = q;

    chip.className = "faq-chip";

    chip.style.padding = "8px 12px";
    chip.style.background = "#f0fdf4";
    chip.style.borderRadius = "14px";
    chip.style.cursor = "pointer";
    chip.style.fontSize = "12px";
    chip.style.transition = "0.2s";

    chip.onclick = () => sendMessage(q);

    faqBox.appendChild(chip);

  });

  // 💬 ADD MESSAGE
  function addMessage(text, type) {

    const wrapper = document.createElement("div");

    wrapper.style.display = "flex";
    wrapper.style.margin = "10px 0";

    if (type === "user") {
      wrapper.style.justifyContent = "flex-end";
    }

    const msg = document.createElement("div");

    msg.style.padding = "12px 14px";
    msg.style.borderRadius = "16px";
    msg.style.maxWidth = "80%";
    msg.style.fontSize = "14px";
    msg.style.lineHeight = "1.6";

    // 🔥 FIX WRAPPING
    msg.style.whiteSpace = "pre-wrap";
    msg.style.wordBreak = "break-word";
    msg.style.overflowWrap = "break-word";

    if (type === "user") {

      msg.style.background = "#16a34a";
      msg.style.color = "#fff";
      msg.style.borderBottomRightRadius = "4px";

    } else {

      msg.style.background = "#ffffff";
      msg.style.color = "#111827";
      msg.style.border = "1px solid #e5e7eb";
      msg.style.borderBottomLeftRadius = "4px";

    }

    wrapper.appendChild(msg);

    messages.appendChild(wrapper);

    typeText(msg, text);

    messages.scrollTop = messages.scrollHeight;
  }

  // ⌨️ TYPING EFFECT
  function typeText(element, text) {

    let i = 0;

    const interval = setInterval(() => {

      element.innerText = text.slice(0, i);

      i++;

      messages.scrollTop = messages.scrollHeight;

      if (i > text.length) {
        clearInterval(interval);
      }

    }, 12);

  }

  // 🚀 SEND MESSAGE
  async function sendMessage(text) {

    if (!text || text.trim() === "") return;

    addMessage(text, "user");

    input.value = "";

    // ⏳ TYPING INDICATOR
    const loading = document.createElement("div");

    loading.innerText = "saarthi is typing...";

    loading.style.fontSize = "12px";
    loading.style.color = "#6b7280";
    loading.style.margin = "8px 0";

    messages.appendChild(loading);

    messages.scrollTop = messages.scrollHeight;

    try {

      const res = await fetch("saarthx-backend.railway.internal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: text
        })
      });

      const data = await res.json();

      loading.remove();

      addMessage(data.reply, "bot");

    } catch (err) {

      loading.innerText = "Error connecting to server.";

    }

  }

  // 🖱️ SEND BUTTON
  sendBtn.onclick = () => {
    sendMessage(input.value);
  };

  // ⌨️ ENTER KEY
  input.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {
      sendMessage(input.value);
    }

  });

})();
});