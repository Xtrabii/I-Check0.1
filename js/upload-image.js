// พอเลือกไฟล์เสร็จ (เช่น .jpg, .png) → trigger event onchange → ส่ง FormData ไป Backend ด้วย fetch/axios → Backend บันทึกไฟล์ลง server / cloud storage (เช่น AWS S3, Firebase, หรือโฟลเดอร์ uploads/) และเก็บ path ลง DB

// ไม่ต้องมีปุ่ม Save เพิ่ม เพราะระบบทำงานให้อัตโนมัติ

document.addEventListener("DOMContentLoaded", () => {
  const editIcon = document.querySelector(".edit-icon");
  const profileInput = document.getElementById("profileImageInput");
  const profileImage = document.getElementById("profileImage");

  if (!editIcon || !profileInput || !profileImage) return;

  editIcon.addEventListener("click", () => {
    profileInput.click();
  });

  profileInput.addEventListener("change", function() {
    const file = this.files[0];
    if (file) {
      // preview
      const reader = new FileReader();
      reader.onload = (e) => profileImage.src = e.target.result;
      reader.readAsDataURL(file);

      // mock upload
      const formData = new FormData();
      formData.append("profileImage", file);

      fetch("/api/uploadProfileImage", {
        method: "POST",
        body: formData
      })
      .then(res => res.json())
      .then(data => {
        Swal.fire({
          icon: "success",
          title: "อัปเดตรูปโปรไฟล์สำเร็จ!",
          timer: 1500,
          showConfirmButton: false
        });

        if (data.imageUrl) profileImage.src = data.imageUrl;
      })
      .catch(err => console.error("Upload error:", err));
    }
  });
});
