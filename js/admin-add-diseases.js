document.addEventListener("DOMContentLoaded", () => {
  const saveBtn = document.getElementById("saveBtn");
  const deleteBtn = document.getElementById("deleteBtn");

  const diseasesName = document.getElementById("diseasesName");
  const tags = document.getElementById("tags");
  const content = document.getElementById("content");

  // ฟังก์ชันเพิ่มโรคใหม่
  saveBtn.addEventListener("click", () => {
    const name = diseasesName.value.trim();
    const tag = tags.value;
    const cont = content.value.trim();

    if (!name || !cont) {
      Swal.fire({
        icon: "warning",
        title: "กรอกข้อมูลไม่ครบ",
        text: "กรุณากรอกข้อมูลให้ครบทุกช่อง",
        confirmButtonText: "ตกลง",
        customClass: {
          confirmButton: "gradient-btn"
        }
      });
      return;
    }

    // ดึง diseases จาก localStorage (หรือสร้างใหม่ถ้ายังไม่มี)
    let diseases = JSON.parse(localStorage.getItem("diseases")) || [];

    // สร้าง ID ใหม่ (เพิ่ม 1 จาก ID สูงสุด)
    const newId = diseases.length > 0 ? Math.max(...diseases.map(d => d.id)) + 1 : 1;

    const newDisease = {
      id: newId,
      name: name,
      tags: tag,
      content: cont,
      createdDate: new Date().toISOString().split("T")[0] // yyyy-mm-dd
    };

    // เพิ่มลง localStorage
    diseases.push(newDisease);
    localStorage.setItem("diseases", JSON.stringify(diseases));

    // ✅ Alert สำเร็จแล้วกลับหน้า manage
    Swal.fire({
      icon: "success",
      title: "เพิ่มโรคเรียบร้อย",
      text: `โรค "${name}" ถูกเพิ่มเข้าฐานข้อมูลแล้ว`,
      confirmButtonText: "ตกลง",
      customClass: {
        confirmButton: "gradient-btn"
      }
    }).then(() => {
      window.location.href = "admin-mange-diseases.html"; // กลับหน้า manage
    });
  });

  // ปุ่มยกเลิก: confirm แล้วกลับหน้า manage
  deleteBtn.addEventListener("click", () => {
    Swal.fire({
      icon: "question",
      title: "คุณแน่ใจหรือไม่?",
      text: "ต้องการยกเลิกการเพิ่มโรคและกลับไปหน้าจัดการโรคหรือไม่?",
      showCancelButton: true,
      // ปุ่มยกเลิก
      confirmButtonText: "ยกเลิก",
      customClass: {
        confirmButton: "gradient-btn"
      },
      // ปุ่มไม่ยกเลิก
      cancelButtonText: "ไม่ยกเลิก"
    }).then(result => {
      if (result.isConfirmed) {
        window.location.href = "admin-mange-diseases.html";
      }
    });
  });
});
