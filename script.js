// ========================================
// FORM SUBMISSION HANDLING (FORMSPREE)
// ========================================

const initializeFormHandling = () => {
    const contactForm = document.getElementById("contactForm");

    if (!contactForm) return;

    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            showPopup("Please fill all fields.");
            return;
        }

        if (!isValidEmail(email)) {
            showPopup("Enter a valid email address.");
            return;
        }

        try {
            const response = await fetch("https://formspree.io/f/YOUR_ID", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message })
            });

            if (response.ok) {
                showPopup("✅ Thank you! Your message has been sent successfully.");
                contactForm.reset();
            } else {
                showPopup("❌ Something went wrong. Please try again.");
            }

        } catch (error) {
            console.error(error);
            showPopup("❌ Network error. Try again later.");
        }
    });
};

document.addEventListener("DOMContentLoaded", initializeFormHandling);


// Email validation
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};


// Simple professional popup
function showPopup(message) {
    const popup = document.createElement("div");
    popup.innerText = message;

    popup.style.position = "fixed";
    popup.style.bottom = "20px";
    popup.style.right = "20px";
    popup.style.background = "#111";
    popup.style.color = "#fff";
    popup.style.padding = "12px 18px";
    popup.style.borderRadius = "8px";
    popup.style.boxShadow = "0 5px 20px rgba(0,0,0,0.2)";
    popup.style.zIndex = "9999";

    document.body.appendChild(popup);

    setTimeout(() => popup.remove(), 3000);
}
