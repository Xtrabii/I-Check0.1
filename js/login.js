$(document).ready(function () {
  // ✅ Toggle Password
  $("#togglePassword").on("click", function () {
    let input = $("#password");
    let icon = $(this).find("i");
    if (input.attr("type") === "password") {
      input.attr("type", "text");
      icon.removeClass("bi-eye-slash").addClass("bi-eye");
    } else {
      input.attr("type", "password");
      icon.removeClass("bi-eye").addClass("bi-eye-slash");
    }
  });

  // ✅ Toast Function
  function showToast(message, type) {
    let toastEl = $("#loginToast");
    $("#toastMessage").text(message);
    toastEl.removeClass("bg-danger bg-success").addClass(type);
    let toast = new bootstrap.Toast(toastEl[0], { delay: 2000 });
    toast.show();
  }

  // ✅ Login Click
  $("#loginBtn").on("click", function (e) {
    e.preventDefault();

    let email = $("#email").val().trim();
    let password = $("#password").val().trim();

    // ❌ Validation
    if (email === "" || password === "") {
      showToast("❌ กรุณากรอกอีเมลและรหัสผ่าน", "bg-danger");
      return;
    }

    // ✅ Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("❌ กรุณากรอกอีเมลให้ถูกต้อง", "bg-danger");
      return;
    }

    // ✅ Password validation
    // - 6–20 ตัวอักษร
    // - ต้องมีตัวอักษรและตัวเลข
    // - ห้ามเว้นวรรค, special char, emoji
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;
    if (!passwordRegex.test(password)) {
      showToast("❌ กรุณากรอกรหัสผ่านให้ถูกต้อง", "bg-danger");
      return;
    }

    // ✅ Mock API / Database Check
    // (ตรงนี้ในอนาคตคุณสามารถ fetch ไป backend ได้)
    if (email === "test@example.com" && password === "abc123") {
      showToast("✅ เข้าสู่ระบบสำเร็จ!", "bg-success");
      setTimeout(() => {
        window.location.href = "user/index.html";
      }, 800);
    } else {
      showToast("❌ อีเมลหรือรหัสผ่านไม่ถูกต้อง", "bg-danger");
    }
  });
});
