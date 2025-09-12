document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("userTableBody");
  const searchInput = document.getElementById("searchInput");
  const userCount = document.getElementById("userCount");

  // 🔹 Mock data
  const defaultFeedbacks = [
    { id: 1, email: "Admin1@gmail.com", name: "Admin1", score: 3, comment: "No Comment", submitDate: "2025-04-20" },
    { id: 2, email: "Test1@gmail.com", name: "Test1", score: 4, comment: "ระบบใช้ง่ายดี", submitDate: "2025-04-20" },
    { id: 3, email: "Test2@gmail.com", name: "Test2", score: 1, comment: "วิธีชี้แจงไม่ชัดเจน", submitDate: "2025-04-20" },
    { id: 4, email: "Test3@gmail.com", name: "Test3", score: 2, comment: "No Comment", submitDate: "2025-04-20" },
    { id: 5, email: "Test4@gmail.com", name: "Test4", score: 5, comment: "ระบบดีมาก", submitDate: "2025-04-20" },
    { id: 6, email: "Test5@gmail.com", name: "Test5", score: 3, comment: "No Comment", submitDate: "2025-04-20" },
    { id: 7, email: "Test6@gmail.com", name: "Test6", score: 2, comment: "ปรับปรุง UXadsadadsadadsadปรับปรุง UXadsadadsadadsadปรับปรุง UXadsadadsadadsadปรับปรุง UXadsadadsadadsadปรับปรุง UXadsadadsadadsadปรับปรุง UXadsadadsadadsadปรับปรุง UXadsadadsadadsadปรับปรุง Udasdsadadsadasdawqweqnwnfjwuo", submitDate: "2025-04-20" },
    { id: 8, email: "Test7@gmail.com", name: "Test7", score: 4, comment: "No Comment", submitDate: "2025-04-20" },
    { id: 9, email: "Test8@gmail.com", name: "Test8", score: 4, comment: "ระบบใช้ง่าย", submitDate: "2025-04-20" },
    { id: 10, email: "Test9@gmail.com", name: "Test9", score: 4, comment: "No Comment", submitDate: "2025-04-20" },
    { id: 11, email: "Test19@gmail.com", name: "Test9", score: 4, comment: "No Comment", submitDate: "2025-04-20" },
    { id: 12, email: "Test/จ@gmail.com", name: "Test9", score: 4, comment: "No Comment", submitDate: "2025-04-20" },
  ];

  // โหลด feedbacks จาก localStorage (แต่ถ้าอยากใช้ mock data ใหม่ทุกครั้งให้ลบ localStorage ก่อน)
    let feedbacks = defaultFeedbacks; // ใช้ mock data ที่แก้ไขใหม่
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

//   function addFeedback(newFeedback) {
//     feedbacks.push(newFeedback); // เพิ่มใน array
//     localStorage.setItem("feedbacks", JSON.stringify(feedbacks)); // เก็บใน localStorage
//     renderTable(feedbacks); // render ใหม่
//     }

//     // ตัวอย่างเรียกใช้
//     addFeedback({ 
//     id: feedbacks.length + 1, 
//     email: "newuser@gmail.com", 
//     name: "New User", 
//     score: 5, 
//     comment: "ลองเพิ่มลองเพิ่มลองเพิ่มลองเพิ่มลองเพิ่มลองเพิ่มลองเพิ่มลองเพิ่มลองเพิ่มลองเพิ่มลองเพิ่มลองเพิ่มลองเพิ่มลองเพิ่มลองเพิ่มลองเพิ่มลองเพิ่มลองเพิ่มลองเพิ่มลองเพิ่มลองเพิ่มลองเพิ่มลองเพิ่มลองเพิ่มลองเพิ่ม", 
//     submitDate: new Date().toISOString().split("T")[0] 
//     });


  // ฟังก์ชัน render ตาราง
  function renderTable(data) {
  tableBody.innerHTML = "";
  data.forEach(fb => {
    const row = document.createElement("tr");
    row.dataset.id = fb.id;
    row.innerHTML = `
      <td>${fb.email}</td>
      <td>${fb.name}</td>
      <td>${fb.score}</td>
      <td class="comment-cell" title="${fb.comment}">${fb.comment}</td>
      <td>${new Date(fb.submitDate).toLocaleDateString("en-GB")}</td>
      <td class="text-center">
        <i class="fa-solid fa-magnifying-glass text-primary btn-view" role="button" style="cursor:pointer"></i>
      </td>
    `;
    tableBody.appendChild(row);
  });


    userCount.textContent = data.length;

    // EventListener ปุ่มแว่นขยาย
    document.querySelectorAll(".btn-view").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const row = e.target.closest("tr");
        const id = row.dataset.id;
        const selectedFeedback = feedbacks.find(f => f.id == id);
        // เก็บข้อมูล feedback ที่เลือกไว้ใน sessionStorage
        sessionStorage.setItem("selectedFeedback", JSON.stringify(selectedFeedback));
        // ไปหน้า view feedback
        window.location.href = "admin-view-feedbacks.html";
      });
    });
  }

  // เรียกแสดงตารางครั้งแรก
  renderTable(feedbacks);

  // Search: ค้นหาจาก score หรือ comment
  searchInput.addEventListener("keyup", () => {
    const keyword = searchInput.value.toLowerCase();
    const filtered = feedbacks.filter(f => 
      f.score.toString().includes(keyword) || 
      f.comment.toLowerCase().includes(keyword)
    );
    renderTable(filtered);
  });
});
