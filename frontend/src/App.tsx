import { AlertTriangle, Radio, Send, ShieldCheck, WifiOff } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const API = "http://localhost:3001";

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const loadMessages = useCallback(async () => {
    try {
      const response = await fetch(`${API}/messages`);
      if (!response.ok) throw new Error("Unable to reach network");
      const data = await response.json();
      setMessages(Array.isArray(data) ? data : []);
      setIsConnected(true);
    } catch {
      setIsConnected(false);
    }
  }, []);

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 2000);
    return () => clearInterval(interval);
  }, [loadMessages]);

  const sendMessage = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    try {
      await fetch(`${API}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmedMessage }),
      });
      setMessage("");
      loadMessages();
    } catch {
      setIsConnected(false);
    }
  };

  return (
    <main className="app-shell">
      <div className="ambient-glow" aria-hidden="true" />
      <section className="console" aria-label="offlineSOS emergency communication console">
        <header className="console-header">
          <div className="brand-lockup">
            {/* <div className="brand-mark" aria-hidden="true">
              <AlertTriangle size={23} strokeWidth={2.5} />
            </div> */}
            <div>
              <p className="eyebrow">Local emergency relay</p>
              <h1>offlineSOS</h1>
            </div>
          </div>
          <div className={`connection-pill ${isConnected ? "is-online" : ""}`}>
            {/* <span className="status-dot" /> */}
            {isConnected ? "Network active" : "Standby mode"}
          </div>
        </header>

        <div className="console-body">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Encrypted local channel</p>
              <h2>Emergency messages</h2>
            </div>
            {/* <Radio size={19} aria-hidden="true" /> */}
          </div>

          <div className="messages" aria-live="polite">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div className="message-card" key={`${msg}-${index}`}>
                  <span className="message-index">{String(index + 1).padStart(2, "0")}</span>
                  <p>{msg}</p>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <div className="empty-icon"><WifiOff size={21} /></div>
                <h3>No messages yet</h3>
                <p>Messages sent by nearby devices will appear here.</p>
              </div>
            )}
          </div>

          <form className="message-composer" onSubmit={(event) => { event.preventDefault(); sendMessage(); }}>
            <div className="input-wrap">
              <span className="input-label">Broadcast message</span>
              <input
                type="text"
                placeholder="Share an update with your local network..."
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                aria-label="Broadcast message"
              />
            </div>
            <button type="submit" aria-label="Send broadcast message">
              <Send size={18} />
              <span>Send</span>
            </button>
          </form>
        </div>

        <footer className="console-footer">
          <div className="footer-note">
            <ShieldCheck size={17} aria-hidden="true" />
            <span>Designed to work when the internet doesn’t.</span>
          </div>
          <span className="version-tag">OFFLINE / LOCAL ONLY</span>
        </footer>
      </section>

      {/* <p className="credit">Built for resilient communication · <a href="https://github.com/AmateurMind" target="_blank" rel="noreferrer">Suhail</a></p> */}
    </main>
  );
}

export default App;
