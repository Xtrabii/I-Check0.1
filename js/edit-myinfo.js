document.addEventListener("DOMContentLoaded", function () {
  const diseaseSwitch = document.getElementById("hasDiseaseSwitch");
  const diseaseList = document.getElementById("diseaseList");

  // แสดงเป็น วัน/เดือน/ปี locale: "th" 
  // ใช้ locale ไทย (จะแสดงเดือนเป็นไทย)
  flatpickr("#dob", { 
    dateFormat: "d/m/Y",
    locale: "th"
  });

  // Toggle กล่องโรคประจำตัว
  diseaseSwitch.addEventListener("change", () => {
    if (diseaseSwitch.checked) {
      diseaseList.classList.remove("d-none");
    } else {
      diseaseList.classList.add("d-none");
      // ยกเลิก checkbox โรคทั้งหมด
      document.querySelectorAll("#diseaseList input[type='checkbox']").forEach(cb => cb.checked = false);
    }
  });

  const myInfoForm = document.getElementById("myInfoForm");
  myInfoForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const dob = document.getElementById("dob").value;
    const gender = document.getElementById("gender").value;
    const bloodGroup = document.getElementById("bloodGroup").value;
    const hasDisease = diseaseSwitch.checked ? "yes" : "no";

    let diseases = [];
    if (hasDisease === "yes") {
      document.querySelectorAll("#diseaseList input[name='diseases']:checked").forEach(cb => {
        diseases.push(cb.value);
      });
    }

    Swal.fire({
      icon: "success",
      title: "บันทึกสำเร็จ",
      html: `
        <b>วันเกิด:</b> ${dob}<br>
        <b>เพศ:</b> ${gender}<br>
        <b>กรุ๊ปเลือด:</b> ${bloodGroup}<br>
        <b>โรคประจำตัว:</b> ${hasDisease === "yes" ? diseases.join(", ") : "ไม่มี"}
      `,
      confirmButtonText: "ตกลง"
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "../user/profile.html";
      }
    });

    // ✅ เตรียมสำหรับเชื่อมต่อ Database ในอนาคต
    const formData = {
      dob,
      gender,
      bloodGroup,
      hasDisease,
      diseases
    };

    console.log("ส่งข้อมูลไป backend:", formData);

    // TODO: fetch() → API backend
    // fetch("/api/updateMyInfo", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // });
  });
});
