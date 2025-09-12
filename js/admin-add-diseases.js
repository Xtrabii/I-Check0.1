document.addEventListener("DOMContentLoaded", () => {
  const saveBtn = document.getElementById("saveBtn");
  const deleteBtn = document.getElementById("deleteBtn");

  const diseasesName = document.getElementById("diseasesName");
  const tags = document.getElementById("tags");
  const content = document.getElementById("content");
  const source = document.getElementById("source");

  // ฟังก์ชันเพิ่มโรคใหม่
  saveBtn.addEventListener("click", () => {
    const name = diseasesName.value.trim();
    const tag = tags.value;
    const cont = content.value.trim();
    const src = source.value.trim();

    if (!name || !cont || !src) {
      Swal.fire({
        icon: "warning",
        title: "กรอกข้อมูลไม่ครบ",
        text: "กรุณากรอกชื่อโรค, Content และ Source ให้ครบทุกช่อง",
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
      source: src,
      createdDate: new Date().toISOString().split("T")[0] // yyyy-mm-dd
    };

    // เพิ่มลง localStorage
    diseases.push(newDisease);
    localStorage.setItem("diseases", JSON.stringify(diseases));

    // ✅ Alert สำเร็จแล้วกลับหน้า manage
    Swal.fire({
      icon: "success",
      title: "เพิ่มโรคเรียบร้อย",
      text: `โรค "${name}" ถูกเพิ่มเข้าสู่ระบบแล้ว`,
      confirmButtonText: "ตกลง"
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
      confirmButtonText: "ยกเลิก",
      cancelButtonText: "ไม่ยกเลิก"
    }).then(result => {
      if (result.isConfirmed) {
        window.location.href = "admin-mange-diseases.html";
      }
    });
  });
});
