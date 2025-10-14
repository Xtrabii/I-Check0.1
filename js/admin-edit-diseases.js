// admin-edit-diseases.js

document.addEventListener("DOMContentLoaded", () => {
    // ดึงข้อมูล disease ที่เลือกไว้จาก sessionStorage
    const disease = JSON.parse(sessionStorage.getItem("selectedDisease"));

    if (!disease) {
        Swal.fire({
            icon: "error",
            title: "ไม่พบข้อมูลโรค",
            text: "กรุณากลับไปที่หน้าจัดการโรคแล้วเลือกแก้ไขอีกครั้ง",
        }).then(() => {
            window.location.href = "admin-mange-diseases.html"; // กลับหน้า manage
        });
        return;
    }

    // ใส่ค่าลงในฟอร์ม
    document.getElementById("diseasesName").value = disease.name || "";
    // console.log("tag จาก sessionStorage:", disease.tags); ไว้เช็คค่า tags
    document.getElementById("tags").value = disease.tags || "nervousSystem";
    document.getElementById("content").value = disease.content || "";

    // ปุ่มบันทึก
    document.getElementById("saveBtn").addEventListener("click", () => {
        const updatedDisease = {
            id: disease.id,
            name: document.getElementById("diseasesName").value.trim(),
            tags: document.getElementById("tags").value, 
            content: document.getElementById("content").value.trim(),
        };


        // mock: เก็บกลับเข้า sessionStorage (ในอนาคตเชื่อม Database)
        let diseases = JSON.parse(localStorage.getItem("diseases")) || [];
        diseases = diseases.map(d => (d.id === updatedDisease.id ? updatedDisease : d));
        localStorage.setItem("diseases", JSON.stringify(diseases));

        Swal.fire({
            icon: "success",
            title: "บันทึกข้อมูลสำเร็จ",
            text: `โรค ${updatedDisease.name} ถูกอัปเดตแล้ว`,
            confirmButtonText: "ตกลง",
            customClass: {
                confirmButton: "gradient-btn"
            }
        }).then(() => {
            window.location.href = "admin-mange-diseases.html"; // กลับไปหน้า manage
        });
    });

    // ปุ่มลบ
    document.getElementById("deleteBtn").addEventListener("click", () => {
        Swal.fire({
            title: "คุณแน่ใจหรือไม่?",
            text: `คุณต้องการลบโรค "${disease.name}" หรือไม่?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "ลบโรค",
            cancelButtonText: "ยกเลิก",
            customClass: {
                confirmButton: "btn btn-danger mx-2",
                cancelButton: "btn btn-secondary mx-2"
            },
        }).then((result) => {
            if (result.isConfirmed) {
                // mock: ลบออกจาก localStorage
                let diseases = JSON.parse(localStorage.getItem("diseases")) || [];
                diseases = diseases.filter(d => d.id !== disease.id);
                localStorage.setItem("diseases", JSON.stringify(diseases));

                Swal.fire({
                    icon: "success",
                    title: "ลบข้อมูลสำเร็จ",
                    text: "โรคถูกลบออกจากระบบแล้ว",
                    confirmButtonText: "ตกลง",
                    customClass: {
                        confirmButton: "gradient-btn",
                    },
                }).then(() => {
                    window.location.href = "admin-mange-diseases.html";
                });
            }
        });
    });
});
