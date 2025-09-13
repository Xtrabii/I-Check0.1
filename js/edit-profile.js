document.addEventListener("DOMContentLoaded", () => {
  const saveButton = document.querySelector(".btn-save");

  if (saveButton) {
    saveButton.addEventListener("click", function (e) {
      e.preventDefault(); // กันไม่ให้กดแล้วรีเฟรช

      // ดึงค่าจาก input
      const newName = document.getElementById("editName")?.value.trim();

      if (!newName) {
        Swal.fire({
          icon: "warning",
          title: "กรอกข้อมูลไม่ครบ",
          text: "กรุณากรอกชื่อใหม่ก่อนบันทึก",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#3085d6"
        });
        return;
      }

      // ✅ Mock "ส่งข้อมูลไป backend"
      console.log("ส่งข้อมูลไป backend (mock):", { name: newName });

      const saveButton = document.querySelector(".btn-save");
      const role = saveButton.dataset.role; // จะได้ค่า "user" หรือ "admin"

      // แสดง Swal success
      Swal.fire({
        icon: "success",
        title: "บันทึกสำเร็จ",
        text: `ชื่อใหม่ของคุณ: ${newName}`,
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#3085d6"
      }).then(() => {
        if (role === "admin") {
          window.location.href = "../admin/admin-profile.html"; 
        } else {
          // เด้งไปหน้า profile (จำลอง)
          window.location.href = "../user/profile.html";
        }
      });
    });
  }
});
