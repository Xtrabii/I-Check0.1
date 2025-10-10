document.addEventListener("DOMContentLoaded", function () {
    // Highlight mennu sidebar (ส่วนนี้ทำงานได้ดีอยู่แล้ว)
    const currentPath = window.location.pathname.split("/").pop();
    const menuLinks = document.querySelectorAll(".sidebar a");

    menuLinks.forEach(link => {
        if (link.getAttribute("href").includes(currentPath)) {
            link.classList.add("active");
        }
    });

    // แสดงเป็น วัน/เดือน/ปี (ส่วนนี้ทำงานได้ดีอยู่แล้ว)
    flatpickr("#dob", {
        dateFormat: "d/m/Y",
        locale: "th"
    });

    // --- ส่วนของสวิตช์โรคประจำตัวเดิมถูกลบออกไป ---
    // เนื่องจากเราใช้ Tag Input แทนแล้ว

    // จัดการการ Submit ฟอร์ม
    const myInfoForm = document.getElementById("myInfoForm");
    myInfoForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // 1. ดึงข้อมูลจากฟอร์ม
        const dob = document.getElementById("dob").value;
        const gender = document.getElementById("gender").value; // ดึงค่าจาก <select> เดิมได้เลย เพราะ custom-select.js อัปเดตให้เราอัตโนมัติ
        const bloodGroup = document.getElementById("bloodGroup").value; // ดึงค่าจาก <select> เดิมได้เลย

        // ✨ แก้ไขตรงนี้: ดึงข้อมูลโรคประจำตัวจาก hidden input ของ Tag Input ✨
        const diseasesValue = document.getElementById("hidden-diseases-input").value;
        const diseases = diseasesValue ? diseasesValue.split(',') : []; // แปลง String "โรคA,โรคB" ให้เป็น Array ['โรคA', 'โรคB']

        // 2. แสดงผลด้วย SweetAlert2 (อัปเดตการแสดงผล)
        Swal.fire({
            icon: "success",
            title: "บันทึกสำเร็จ",
            html: `
                <b>วันเกิด:</b> ${dob}<br>
                <b>เพศ:</b> ${gender}<br>
                <b>กรุ๊ปเลือด:</b> ${bloodGroup}<br>
                <b>โรคประจำตัว:</b> ${diseases.length > 0 ? diseases.join(", ") : "ไม่มี"}
            `,
            confirmButtonText: "ตกลง",
            customClass: {
              confirmButton: "gradient-btn"
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // เปลี่ยนเส้นทางไปยังหน้าโปรไฟล์
                window.location.href = "../user/profile.html";
            }
        });

        // 3. ✅ เตรียมข้อมูลสำหรับส่งไป Backend (อัปเดตแล้ว)
        const formData = {
            dob,
            gender,
            bloodGroup,
            diseases // ส่งเป็น Array ไปเลย
        };

        console.log("ข้อมูลที่จะส่งไป backend:", formData);

        // TODO: สามารถเปิดใช้งานส่วนนี้เพื่อส่งข้อมูลไปยัง Server ได้ในอนาคต
        // fetch("/api/updateMyInfo", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(formData),
        // });
    });
});