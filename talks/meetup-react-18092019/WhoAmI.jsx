import React from "react";

export default function() {
  return (
    <div>
      <div>
        <img src="./me.jpg" style={{ borderRadius: "50%", height: 128 }} />
      </div>
      <div>
        <h2>Nicolas DUBIEN</h2>
        <div style={{ marginTop: 48 }}></div>
        <div>
          <img
            src="./criteo-logo.png"
            style={{
              height: 64,
              border: "none",
              background: "none",
              margin: 0,
              boxShadow: "none"
            }}
          />
        </div>
        <div style={{ marginTop: 48 }}></div>
        <div style={{ color: "#ffffff", verticalAlign: "middle" }}>
          <img
            src="./github-white.png"
            style={{
              height: 32,
              border: "none",
              background: "none",
              margin: 0
            }}
          />
          dubzzz
        </div>
        <div style={{ color: "#1da1f2", verticalAlign: "middle" }}>
          <img
            src="./twitter.png"
            style={{
              height: 32,
              border: "none",
              background: "none",
              margin: 0
            }}
          />
          ndubien
        </div>
      </div>
    </div>
  );
}
