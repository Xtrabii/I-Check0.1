$(document).ready(function () {
  // เลือก emoji (กดซ้ำยกเลิกได้)
  $(".emoji").click(function () {
    let isSelected = $(this).hasClass("selected");

    $(".emoji").removeClass("selected");

    if (!isSelected) {
      $(this).addClass("selected");
      $("#rating").val($(this).data("value"));
    } else {
      // ยกเลิกการเลือก
      $("#rating").val("");
    }

    console.log("คะแนน: " + $("#rating").val()); // debug
  });

  // ส่งฟอร์ม
  $("#feedbackForm").on("submit", function (e) {
    e.preventDefault();

    let rating = $("#rating").val();
    let feedback = $("#feedback").val();

    // ไม่บังคับ rating, feedback สามารถว่างได้
    Swal.fire({
      icon: 'success',
      title: 'ส่งแบบฟอร์มสำเร็จ',
      text: 'ขอบคุณสำหรับความคิดเห็นของคุณ!',
      confirmButtonText: 'ตกลง'
    }).then(() => {
      // รีเซ็ตฟอร์ม
      this.reset();
      $(".emoji").removeClass("selected");
      $("#rating").val("");

      // redirect ไปหน้า index.html
      window.location.href = "index.html";
    });
  });
});