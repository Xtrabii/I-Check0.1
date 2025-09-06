document.addEventListener("DOMContentLoaded", function () {

  // Toggle password
  function setupTogglePassword(buttonId, inputId) {
    const toggleBtn = document.querySelector(buttonId);
    const input = document.querySelector(inputId);
    const icon = toggleBtn.querySelector("i");

    toggleBtn.addEventListener("click", () => {
      const type = input.getAttribute("type") === "password" ? "text" : "password";
      input.setAttribute("type", type);
      icon.classList.toggle("bi-eye");
      icon.classList.toggle("bi-eye-slash");
    });
  }

  setupTogglePassword("#togglePassword", "#inputPassword");
  setupTogglePassword("#toggleConfirmPassword", "#inputConfirmPassword");

  // Toast helper
  function showToast(message, type = "success") {
    const toastEl = document.getElementById("successToast");
    const toastBody = toastEl.querySelector(".toast-body");

    toastBody.textContent = message;
    toastEl.className = `toast align-items-center text-bg-${type} border-0`;
    const toast = new bootstrap.Toast(toastEl, { delay: 2000 });
    toast.show();
  }

  // Register button
  const registerBtn = document.getElementById("registerBtn");
  if (registerBtn) {
    registerBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const username = document.querySelector("input[type=text]").value.trim();
      const email = document.querySelector("input[type=email]").value.trim();
      const password = document.getElementById("inputPassword").value;
      const confirmPassword = document.getElementById("inputConfirmPassword").value;
      const agree = document.getElementById("checkDefault").checked;

      // ❌ Validation
      if (!username || !email || !password || !confirmPassword) {
        showToast("❌ กรุณากรอกข้อมูลให้ครบทุกช่อง", "danger");
        return;
      }

      // ✅ Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast("❌ กรุณากรอกอีเมลให้ถูกต้อง", "danger");
        return;
      }

      // ✅ Password validation
      // - 6–20 ตัวอักษร
      // - ตัวอักษร + ตัวเลข
      // - ไม่มีช่องว่าง, special char, emoji
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;
      if (!passwordRegex.test(password)) {
        showToast("❌ รหัสผ่านต้องมี 6-20 ตัวอักษร, ตัวอักษรและตัวเลข, ห้ามเว้นวรรค, special char หรือ emoji", "danger");
        return;
      }

      if (password !== confirmPassword) {
        showToast("❌ รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน", "danger");
        return;
      }

      if (!agree) {
        showToast("❌ กรุณายอมรับเงื่อนไขการให้บริการและนโยบายความเป็นส่วนตัว", "danger");
        return;
      }

      // ✅ ทุกอย่างถูกต้อง → สมัครสมาชิกสำเร็จ
      showToast("✅ สมัครสมาชิกสำเร็จ!", "success");

      // Redirect หลัง 0.8 วินาที
      setTimeout(() => {
        window.location.href = "login.html";
      }, 800);
    });
  }

});
