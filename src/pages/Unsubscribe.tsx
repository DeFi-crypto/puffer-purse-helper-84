import { useEffect, useState } from "react";

const FN = "https://tfuuelkswultbitktyhb.supabase.co/functions/v1/unsubscribe";

const Unsubscribe = () => {
    const [state, setState] = useState("working");
    useEffect(() => {
          const p = new URLSearchParams(window.location.search);
          const e = p.get("e");
          const t = p.get("t");
          if (!e || !t) {
                  setState("invalid");
                  return;
          }
          fetch(FN + "?e=" + encodeURIComponent(e) + "&t=" + encodeURIComponent(t), { method: "POST" })
            .then((r) => setState(r.ok ? "done" : "invalid"))
            .catch(() => setState("invalid"));
    }, []);
    const title = state === "working" ? "One moment..." : state === "done" ? "Sorry to see you go" : "Link not valid";
    const msg = state === "working" ? "Processing your request." : state === "done" ? "You've been unsubscribed and won't receive any more emails from us. You're always welcome back anytime." : "This unsubscribe link looks invalid or expired.";
    return (
          <div style={{ minHeight: "100vh", background: "#0B0C0B", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Helvetica Neue',Helvetica,Arial,sans-serif" }}>
                  <div style={{ maxWidth: 460, margin: 24, background: "#101410", borderRadius: 16, padding: "44px 34px", textAlign: "center" }}>
                            <div style={{ color: "#C6FF3D", fontWeight: 800, fontSize: 13, letterSpacing: ".16em", textTransform: "uppercase" }}>MINNY</div>
                            <h1 style={{ color: "#fff", fontSize: 26, margin: "16px 0 10px" }}>{title}</h1>
                            <p style={{ color: "#9AA39C", fontSize: 15, lineHeight: 1.6, margin: 0 }}>{msg}</p>
                            <a href="/" style={{ display: "inline-block", marginTop: 22, background: "#C6FF3D", color: "#0B0C0B", fontWeight: 800, textDecoration: "none", padding: "13px 26px", borderRadius: 8 }}>Back to minnyapparel.com</a>
                  </div>
          </div>
        );
};

export default Unsubscribe;
