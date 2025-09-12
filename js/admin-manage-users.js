document.addEventListener("DOMContentLoaded", () => {
  // 🔹 Mock data
  const users = [
    { email: "Yoyo@gmail.com", name: "Yoyo", password: "*****", role: "User", createdDate: "2025-04-25", isSuspended: false},
    { email: "Test1@gmail.com", name: "Test1", password: "*****", role: "User", createdDate: "2025-04-23", isSuspended: false },
    { email: "Test2@gmail.com", name: "Test2", password: "*****", role: "Admin", createdDate: "2025-04-22", isSuspended: false },
    { email: "Test3@gmail.com", name: "Test3", password: "*****", role: "user", createdDate: "2025-04-22", isSuspended: false },
    { email: "Test4@gmail.com", name: "Test4", password: "*****", role: "User", createdDate: "2025-04-21", isSuspended: false },
    { email: "Test5@gmail.com", name: "Test5", password: "*****", role: "User", createdDate: "2025-04-20", isSuspended: false },
    { email: "Test6@gmail.com", name: "Test6", password: "*****", role: "User", createdDate: "2025-04-26", isSuspended: false },
  ];

  const tableBody = document.getElementById("userTableBody");
  const searchInput = document.getElementById("searchInput");
  const userCount = document.getElementById("userCount");

  // ฟังก์ชันแสดงข้อมูลในตาราง
  function renderTable(data) {
    tableBody.innerHTML = "";
    data.forEach(user => {
      const row = document.createElement("tr");
      row.dataset.email = user.email;
      row.innerHTML = `
        <td class="text-truncate" style="max-width: 150px;">${user.email}</td>
        <td>${user.name}</td>
        <td>${user.password}</td>
        <td>${user.role}</td>
        <td>${new Date(user.createdDate).toLocaleDateString("en-GB")}</td>
        <td class="text-center">
          <i class="fa-solid fa-pen-to-square text-primary me-2 btn-edit" role="button"></i>
          <i class="${user.isSuspended ? 'fa-solid fa-circle-check text-success' : 'fa-solid fa-trash text-danger'} btn-suspend" role="button"></i>
          <span class="ms-2">${user.isSuspended ? 'ระงับบัญชี' : ''}</span>
        </td>
      `;
      tableBody.appendChild(row);
    });

    // อัปเดต Found count
    userCount.textContent = data.length;

    // เพิ่ม EventListener ให้ปุ่ม Edit
    document.querySelectorAll(".btn-edit").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const row = e.target.closest("tr");
        const email = row.dataset.email;
        const selectedUser = users.find(u => u.email === email);
        // เก็บข้อมูล user ลง sessionStorage
        sessionStorage.setItem("editUser", JSON.stringify(selectedUser));
        // ไปหน้า edit
        window.location.href = "admin-edit-users.html";
      });
    });

    // เพิ่ม EventListener ให้ปุ่ม suspend/unsuspend
    document.querySelectorAll(".btn-suspend").forEach(btn => {
        btn.addEventListener("click", handleSuspend);
    });
    }

  function handleSuspend(event) {
    const row = event.target.closest("tr");
    const email = row.dataset.email;
    const user = users.find(u => u.email === email);

    if (!user.isSuspended) {
        // ระงับบัญชี
        Swal.fire({
        title: `ระงับบัญชีผู้ใช้ ${user.name}?`,
        text: "บัญชีนี้จะไม่สามารถใช้งานได้จนกว่าจะยกเลิกการระงับ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ระงับบัญชี",
        cancelButtonText: "ยกเลิก",
        buttonsStyling: false, // ให้เราใช้ CSS ของตัวเอง
        customClass: {
            confirmButton: 'btn btn-danger btn-lg mx-2',  // Bootstrap classes หรือ CSS ของคุณ
            cancelButton: 'btn btn-secondary btn-lg mx-2'
        },
        reverseButtons: true
        }).then(result => {
        if (result.isConfirmed) {
            user.isSuspended = true;
            renderTable(users);
            Swal.fire('ระงับแล้ว!', `บัญชีผู้ใช้ ${user.name} ถูกระงับเรียบร้อยแล้ว.`, 'success');
        }
        });
    } else {
        // ยกเลิกการระงับ
        Swal.fire({
        title: `ยกเลิกระงับบัญชีผู้ใช้ ${user.name}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "ยกเลิกระงับ",
        cancelButtonText: "ไม่",
        buttonsStyling: false,
        customClass: {
            confirmButton: 'btn btn-danger btn-lg mx-2',  // Bootstrap classes หรือ CSS ของคุณ
            cancelButton: 'btn btn-secondary btn-lg mx-2'
        },
        }).then(result => {
        if (result.isConfirmed) {
            user.isSuspended = false;
            renderTable(users);
            Swal.fire('เรียบร้อย!', `บัญชีผู้ใช้ ${user.name} สามารถใช้งานได้แล้ว.`, 'success');
        }
        });
    }
    }

  // ฟังก์ชัน format วันที่
  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB"); // DD/MM/YYYY
  }

  // ฟังก์ชัน handle delete
  function handleDelete(event) {
    const row = event.target.closest("tr");
    const index = row.dataset.index;
    const user = users[index];

    Swal.fire({
      title: `ระงับบัญชีผู้ใช้ ${user.name}?`,
      text: "คุณต้องการระงับบัญชีผู้ใช้นี้หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ระงับบัญชี",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // 🔹 เผื่อโค้ดลบ database ในอนาคต
        // deleteUserFromDatabase(user.email);

        // ลบออกจาก mock data
        users.splice(index, 1);
        renderTable(users);

        Swal.fire(
          'ระงับแล้ว!',
          `บัญชีผู้ใช้ ${user.name} ถูกระงับเรียบร้อยแล้ว.`,
          'success'
        );
      }
    });
  }

  // เรียงจากล่าสุดไปเก่าสุด
  users.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));

  // แสดงข้อมูลครั้งแรก
  renderTable(users);

  // ฟังก์ชัน search
  searchInput.addEventListener("keyup", () => {
    const keyword = searchInput.value.toLowerCase();
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(keyword) ||
      user.email.toLowerCase().includes(keyword)
    );
    renderTable(filtered);
  });
});
