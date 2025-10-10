// Toggle password visibility
function togglePassword(inputId, toggleId) {
    const input = document.getElementById(inputId);
    const toggle = document.getElementById(toggleId);

    toggle.addEventListener("click", () => {
        if (input.type === "password") {
            input.type = "text";
            toggle.innerHTML = '<i class="bi bi-eye"></i>';
        } else {
            input.type = "password";
            toggle.innerHTML = '<i class="bi bi-eye-slash"></i>';
        }
    });
}

togglePassword("currentPassword", "toggleCurrentPassword");
togglePassword("newPassword", "toggleNewPassword");
togglePassword("confirmNewPassword", "toggleConfirmPassword");

// Save button with validation and alert
document.addEventListener("DOMContentLoaded", () => {
  // Highlight mennu sidebar
  const currentPath = window.location.pathname.split("/").pop(); 
  const menuLinks = document.querySelectorAll(".sidebar a");

  menuLinks.forEach(link => {
    if(link.getAttribute("href").includes(currentPath)) {
      link.classList.add("active");
    }
  });

  const saveButton = document.querySelector(".btn-save");

  if (saveButton) {
    saveButton.addEventListener("click", async function (e) {
      e.preventDefault();

      // เก็บค่าจาก input
      const currentPassword = document.getElementById("currentPassword").value.trim();
      const newPassword = document.getElementById("newPassword").value.trim();
      const confirmNewPassword = document.getElementById("confirmNewPassword").value.trim();

      // Regex เงื่อนไขรหัสผ่าน
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;

      // ตรวจสอบเบื้องต้น
      if (!currentPassword || !newPassword || !confirmNewPassword) {
        Swal.fire({
          icon: "warning",
          title: "กรอกข้อมูลไม่ครบ",
          text: "กรุณากรอกข้อมูลให้ครบทุกช่อง",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#3085d6"
        });
        return;
      }

      if (!passwordRegex.test(newPassword)) {
        Swal.fire({
          icon: "error",
          title: "รหัสผ่านไม่ถูกต้อง",
          html: `
            <div style="text-align:left">
              <p>รหัสผ่านต้องมีเงื่อนไขดังนี้</p>
              <ul>
                <li>ยาว 6–20 ตัวอักษร</li>
                <li>มีทั้ง <b>ตัวอักษร</b> และ <b>ตัวเลข</b></li>
                <li>ห้ามเว้นวรรค, ห้าม special char หรือ emoji</li>
              </ul>
            </div>
          `,
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#3085d6"
        });
        return;
      }

      if (newPassword !== confirmNewPassword) {
        Swal.fire({
          icon: "error",
          title: "รหัสผ่านไม่ตรงกัน",
          text: "กรุณายืนยันรหัสผ่านใหม่ให้ตรงกัน",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#3085d6"
        });
        return;
      }

      try {
        // 🟢 จำลองการบันทึก (รอเชื่อม Database)
        await new Promise(resolve => setTimeout(resolve, 500));

        const saveButton = document.querySelector(".btn-save");
        const role = saveButton.dataset.role; // จะได้ค่า "user" หรือ "admin"

        Swal.fire({
          icon: "success",
          title: "บันทึกสำเร็จ",
          text: "รหัสผ่านของคุณถูกอัปเดตแล้ว",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#3085d6"
        }).then(() => {
          if (role === "admin") {
            window.location.href = "../admin/admin-profile.html"; 
          } else {
            window.location.href = "../user/profile.html"; 
          }
        });


      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: err.message || "ไม่สามารถบันทึกรหัสผ่านได้",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#d33"
        });
      }
    });
  }
});