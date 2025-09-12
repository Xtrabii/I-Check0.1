document.addEventListener("DOMContentLoaded", () => {
  // 🔹 Mock data เริ่มต้น
  const defaultDiseases = [
    { id: 1, name: "ไมเกรน", content: "ปวดศีรษะแบบตุ๊บ ๆ ด้านเดียว", source: "https://www.praram9.com/migraine/", tags: "ระบบประสาท", createdDate: "2025-04-20" },
    { id: 2, name: "โรคซึมเศร้า", content: "รู้สึกเศร้าอย่างต่อเนื่อง", source: "https://www.example.com/depression/", tags: "ระบบประสาท", createdDate: "2025-04-20" },
    { id: 3, name: "โรควิตกกังวล", content: "มีความวิตกกังวลเกินปกติ", source: "https://www.example.com/anxiety/", tags: "ระบบประสาท", createdDate: "2025-04-20" },
    { id: 4, name: "โรคกระเพาะอาหาร", content: "ปวดท้องบ่อย", source: "https://www.example.com/stomach/", tags: "ระบบทางเดินอาหาร", createdDate: "2025-04-20" },
    { id: 5, name: "โรคออฟฟิศซินโดรม", content: "ปวดหลังและคอ", source: "https://www.example.com/office/", tags: "ระบบกล้ามเนื้อ", createdDate: "2025-04-20" },
    { id: 6, name: "โรคเครียดเรื้อรัง", content: "เครียดสะสมเป็นเวลานาน", source: "https://www.example.com/stress/", tags: "ระบบหัวใจและหลอดเลือด", createdDate: "2025-04-20" },
    { id: 7, name: "โรคกรดไหลย้อน", content: "เรอบ่อยและแสบร้อนหน้าอก", source: "https://www.example.com/reflux/", tags: "ระบบทางเดินอาหาร", createdDate: "2025-04-20" },
    { id: 8, name: "โรคนอนไม่หลับ", content: "หลับยาก ตื่นกลางคืนบ่อย", source: "https://www.example.com/insomnia/", tags: "ระบบภูมิคุ้มกัน", createdDate: "2025-04-20" },
    { id: 9, name: "โรคอ้วน", content: "น้ำหนักเกินเกณฑ์มาตรฐาน", source: "https://www.example.com/obesity/", tags: "ระบบกล้ามเนื้อ", createdDate: "2025-04-20" },
    { id: 10, name: "โรคภูมิแพ้", content: "จาม แสบตา คัดจมูก", source: "https://www.example.com/allergy/", tags: "ระบบภูมิคุ้มกัน", createdDate: "2025-04-20" },
  ];

  // 🔹 รีเซ็ต localStorage เป็นค่าเริ่มต้นทุกครั้งเวลาโหลด
  localStorage.setItem("diseases", JSON.stringify(defaultDiseases));
  
  // ใช้ localStorage เป็น source ของ table
  let diseases = JSON.parse(localStorage.getItem("diseases"));

  const tableBody = document.getElementById("userTableBody");
  const searchInput = document.getElementById("searchInput");
  const userCount = document.getElementById("userCount");
  const addBtn = document.querySelector(".btn-primary");

  // ฟังก์ชันแสดงตาราง
  function renderTable(data) {
    tableBody.innerHTML = "";
    data.forEach(disease => {
      const row = document.createElement("tr");
      row.dataset.id = disease.id;
      row.innerHTML = `
        <td>${disease.id}</td>
        <td>${disease.name}</td>
        <td>${disease.content}</td>
        <td><a href="${disease.source}" target="_blank">Link</a></td>
        <td>${disease.tags}</td>
        <td>${new Date(disease.createdDate).toLocaleDateString("en-GB")}</td>
        <td class="text-center">
          <i class="fa-solid fa-pen-to-square text-primary me-2 btn-edit" role="button"></i>
          <i class="fa-solid fa-trash text-danger btn-delete" role="button"></i>
        </td>
      `;
      tableBody.appendChild(row);
    });

    userCount.textContent = data.length;

    // Edit & Delete event (เหมือนเดิม)
    document.querySelectorAll(".btn-edit").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const row = e.target.closest("tr");
        const id = row.dataset.id;
        const selectedDisease = diseases.find(d => d.id == id);
        sessionStorage.setItem("selectedDisease", JSON.stringify(selectedDisease));
        window.location.href = "admin-edit-diseases.html";
      });
    });

    document.querySelectorAll(".btn-delete").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const row = e.target.closest("tr");
        const id = row.dataset.id;
        const disease = diseases.find(d => d.id == id);

        Swal.fire({
          title: `คุณต้องการลบโรค ${disease.name} ใช่หรือไม่?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "ลบ",
          cancelButtonText: "ยกเลิก",
        }).then(result => {
          if(result.isConfirmed) {
            const index = diseases.findIndex(d => d.id == id);
            diseases.splice(index, 1);
            localStorage.setItem("diseases", JSON.stringify(diseases));
            renderTable(diseases);
            Swal.fire('ลบเรียบร้อย!', `โรค ${disease.name} ถูกลบแล้ว`, 'success');
          }
        });
      });
    });
  }

  searchInput.addEventListener("keyup", () => {
    const keyword = searchInput.value.toLowerCase();
    const filtered = diseases.filter(d => 
      d.name.toLowerCase().includes(keyword) || 
      d.content.toLowerCase().includes(keyword)
    );
    renderTable(filtered);
  });

  addBtn.addEventListener("click", () => {
    window.location.href = "admin-add-diseases.html";
  });

  renderTable(diseases);
});
