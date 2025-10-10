document.addEventListener("DOMContentLoaded", () => {
  // ดึง feedback ที่เลือกจาก sessionStorage
  const selectedFeedback = JSON.parse(sessionStorage.getItem("selectedFeedback"));

  if (!selectedFeedback) {
    // ถ้าไม่มีข้อมูล ให้แจ้ง alert แล้วกลับไปหน้า manage feedbacks
    alert("No feedback selected!");
    window.location.href = "admin-manage-feedbacks.html";
    return;
  }

  // กำหนด element form fields
  const nameInput = document.getElementById("name");
  const scoreInput = document.getElementById("score");
  const emailInput = document.getElementById("email");
  const commentInput = document.getElementById("commnet");
  const saveBtn = document.getElementById("saveBtn");

  // แสดงข้อมูลในฟอร์ม
  nameInput.value = selectedFeedback.name;
  scoreInput.value = selectedFeedback.score;
  emailInput.value = selectedFeedback.email;
  commentInput.value = selectedFeedback.comment;

  // ปุ่มเสร็จสิ้น -> กลับไปหน้า manage feedbacks
  saveBtn.addEventListener("click", () => {
    // สามารถเพิ่ม SweetAlert2 แสดง confirmation ได้
    Swal.fire({
      icon: 'success',
      title: 'เสร็จสิ้น',
      text: 'กลับไปหน้าจัดการฟีดแบค',
      confirmButtonText: 'ตกลง',
      customClass: {
        confirmButton: "gradient-btn"
      }
    }).then(() => {
      window.location.href = "admin-manage-feedbacks.html";
    });
  });
});
