import { useState, useEffect } from "react";

export default function UpdatePrompt() {
  const [state, setState] = useState<"idle" | "available" | "downloading" | "ready">("idle");
  const [version, setVersion] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!window.updater) return;

    window.updater.onAvailable((info: any) => {
      setVersion(info.version);
      setState("available");
    });
    window.updater.onProgress((p: any) => {
      setProgress(Math.round(p.percent));
      setState("downloading");
    });
    window.updater.onDownloaded(() => setState("ready"));
  }, []);

  if (state === "idle") return null;

  // UI: fixed bottom-right toast
  // styled to match Stratum Studio's premium theme variables
  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 9999,
        width: "320px",
        borderRadius: "16px",
        border: "1px solid var(--border)",
        backgroundColor: "var(--bg-elevated)",
        padding: "20px",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 15px var(--primary-glow)",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {state === "available" && (
        <>
          <p style={{ color: "var(--text-primary)", fontWeight: 600, margin: 0, fontSize: "14px" }}>
            Stratum Studio {version} available
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "12px", marginTop: "4px", marginBottom: 0 }}>
            A new version is ready to install.
          </p>
          <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
            <button
              onClick={() => setState("idle")}
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "12px",
                fontSize: "12px",
                color: "var(--text-muted)",
                border: "1px solid var(--border)",
                backgroundColor: "transparent",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--bg-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              Later
            </button>
            <button
              onClick={() => window.updater.download()}
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: 600,
                backgroundColor: "var(--primary)",
                color: "#ffffff",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.9";
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Install Update
            </button>
          </div>
        </>
      )}

      {state === "downloading" && (
        <>
          <p style={{ color: "var(--text-primary)", fontWeight: 600, margin: 0, fontSize: "14px" }}>
            Downloading... {progress}%
          </p>
          <div
            style={{
              marginTop: "12px",
              height: "6px",
              borderRadius: "9999px",
              backgroundColor: "var(--border)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                borderRadius: "9999px",
                backgroundColor: "var(--primary)",
                width: `${progress}%`,
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </>
      )}

      {state === "ready" && (
        <>
          <p style={{ color: "var(--text-primary)", fontWeight: 600, margin: 0, fontSize: "14px" }}>
            Ready to install ✦
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "12px", marginTop: "4px", marginBottom: 0 }}>
            Restart to apply Stratum Studio {version}
          </p>
          <button
            onClick={() => window.updater.install()}
            style={{
              width: "100%",
              marginTop: "16px",
              padding: "8px",
              borderRadius: "12px",
              fontSize: "12px",
              fontWeight: 600,
              backgroundColor: "var(--accent)",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.9";
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Restart & Install
          </button>
        </>
      )}
    </div>
  );
}
