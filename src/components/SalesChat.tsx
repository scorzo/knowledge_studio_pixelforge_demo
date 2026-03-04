import { useEffect } from "react";

const WIDGET_SRC = import.meta.env.VITE_WIDGET_SRC || "http://localhost:3000/widget/widget.js";

const SalesChat = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = WIDGET_SRC;
    script.async = true;

    script.onload = () => {
      if ((window as any).ChatWidget) {
        (window as any).ChatWidget.init({
          instanceId: "fac7de20-4a6e-4b5e-b767-54d42d498a69",
          theme: {
            primaryColor: "#002699",
            position: "bottom-right",
          },
          size: {
            width: "550px",
            height: "600px",
            bubbleSize: "60px",
          },
          branding: {
            companyName: "Your Company",
            welcomeMessage: "How can we help?",
          },
          features: {
            emailCollection: true,
            autoGreeting: true,
            scheduleMeeting: { enabled: true },
            liveSupport: {
              enabled: true,
              supportLink: "https://support.yourcompany.com/live-chat",
            },
            criticalIssue: {
              enabled: true,
              issueLink: "https://support.yourcompany.com/emergency",
            },
          },
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      if ((window as any).ChatWidget?.forceCleanup) {
        (window as any).ChatWidget.forceCleanup();
      }
      const existing = document.querySelector(`script[src*="widget.js"]`);
      if (existing) existing.remove();
      (window as any).ChatWidget = undefined;
    };
  }, []);

  return null;
};

export default SalesChat;
