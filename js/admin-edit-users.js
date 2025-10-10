document.addEventListener("DOMContentLoaded", () => {
  const saveBtn = document.getElementById("saveBtn");
  const suspendBtn = document.getElementById("suspendBtn");

  // โหลดข้อมูล user จาก sessionStorage
  let user = JSON.parse(sessionStorage.getItem("editUser"));

  if (!user) {
    Swal.fire('ผิดพลาด!', 'ไม่พบข้อมูลผู้ใช้', 'error').then(() => {
      window.location.href = "admin-manage-users.html";
    });
    return;
  }

  // แสดงข้อมูลลง input
  document.getElementById("email").value = user.email;
  document.getElementById("name").value = user.name;
  document.getElementById("password").value = user.password;
  document.getElementById("role").value = user.role.toLowerCase();

  function updateSuspendButton() {
    if (user.isSuspended) {
      suspendBtn.innerHTML = `<i class="fa-solid fa-circle-check me-1"></i> ยกเลิกระงับ`;
      suspendBtn.classList.remove("btn-danger");
      suspendBtn.classList.add("btn-success");
    } else {
      suspendBtn.innerHTML = `<i class="fa-solid fa-ban me-1"></i> ระงับบัญชี`;
      suspendBtn.classList.remove("btn-success");
      suspendBtn.classList.add("btn-danger");
    }
  }

  updateSuspendButton();

  saveBtn.addEventListener("click", () => {
    user.name = document.getElementById("name").value;
    user.password = document.getElementById("password").value;
    user.role = document.getElementById("role").value;

    Swal.fire({
      title: "ยืนยันการบันทึกข้อมูล?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "บันทึก",
      cancelButtonText: "ยกเลิก",
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn gradient-btn mx-2',
        cancelButton: 'btn btn-secondary mx-2'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // ในอนาคต save ไป database
        sessionStorage.setItem("editUser", JSON.stringify(user));
        Swal.fire({
          icon:'success',
          title:'บันทึกแล้ว!', 
          text:`ข้อมูลผู้ใช้ ${user.name} ถูกบันทึกเรียบร้อย`,
          confirmButtonText: "ตกลง",
          customClass: {
            confirmButton: "gradient-btn"
          },
        })
        .then(() => {
          window.location.href = "admin-manage-users.html";
        });
      }
    });
  });

  suspendBtn.addEventListener("click", () => {
    if (!user.isSuspended) {
      Swal.fire({
        title: `ระงับบัญชีผู้ใช้ ${user.name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ระงับบัญชี",
        cancelButtonText: "ยกเลิก",
        buttonsStyling: false,
        customClass: {
          confirmButton: 'btn btn-danger mx-2',
          cancelButton: 'btn btn-secondary mx-2'
        }
      }).then(result => {
        if (result.isConfirmed) {
          user.isSuspended = true;
          updateSuspendButton();
          Swal.fire({
            icon:'success',
            title:'ระงับแล้ว!', 
            text:`บัญชีผู้ใช้ ${user.name} ถูกระงับเรียบร้อย`, 
            confirmButtonText: "ตกลง",
            customClass: {
              confirmButton: "gradient-btn"
            },
            });
        }
      });
    } else {
      Swal.fire({
        title: `ยกเลิกระงับบัญชีผู้ใช้ ${user.name}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "ยกเลิกระงับ",
        cancelButtonText: "ไม่",
        buttonsStyling: false,
        customClass: {
          confirmButton: 'btn btn-success mx-2',
          cancelButton: 'btn btn-secondary mx-2'
        }
      }).then(result => {
        if (result.isConfirmed) {
          user.isSuspended = false;
          updateSuspendButton();
          Swal.fire({
            icon:'success',
            title:'เรียบร้อย!', 
            text:`บัญชีผู้ใช้ ${user.name} สามารถใช้งานได้แล้ว`, 
            confirmButtonText: "ตกลง",
            customClass: {
              confirmButton: "gradient-btn"
            },
          });
        }
      });
    }
  });
});
