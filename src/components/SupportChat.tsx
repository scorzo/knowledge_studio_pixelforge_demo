import { useEffect } from "react";

const WIDGET_SRC = "http://localhost:3000/widget/widget.js";
const IDENTITY_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwaXhlbGZvcmdlLWRlbW8iLCJzdWIiOiJ1c2VyLTEyMyIsImF1ZCI6ImNoYXQtd2lkZ2V0LXBsYXRmb3JtIiwiZW1haWwiOiJqb2huLmRvZUBwaXhlbGZvcmdlLmNvbSIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTc3MjQ3NjkyNiwiZXhwIjoyMDg3ODM2OTI2fQ.Cb_WbxZMeut2Tmp_h5nCSZYZdxiPuRkGYdi4HCoJm7E";

const SupportChat = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = WIDGET_SRC;
    script.async = true;

    script.onload = () => {
      if ((window as any).ChatWidget) {
        (window as any).ChatWidget.init({
          instanceId: "08582c12-27d9-473a-afab-496416679148",
          identityToken: IDENTITY_TOKEN,
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

export default SupportChat;
