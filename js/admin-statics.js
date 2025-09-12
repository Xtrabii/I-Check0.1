// ✅ ถ้าต้องการ “ความถี่การวินิจฉัย” → ใช้นับตามจำนวนครั้งที่ผู้ใช้กดวินิจฉัย (จะสะท้อนพฤติกรรมการใช้งานได้ดี)

// ✅ ถ้าต้องการ “จำนวนผู้ป่วยจริง” → ใช้นับตามจำนวน “ผู้ใช้ไม่ซ้ำ (unique users)” ที่ถูกวินิจฉัยเป็นโรคนั้น

// ❌ ไม่ควรใช้จำนวนผู้สมัครทั้งหมดมาเป็นกราฟโรค เพราะจะไม่สะท้อนข้อมูลจริง (เช่น มี 1000 สมัคร แต่ 200 คนใช้ระบบวินิจฉัย)
// diagnosis_count = จำนวนครั้งที่กดวินิจฉัยโรคนั้น
// patient_count = จำนวนคนไม่ซ้ำที่ถูกวินิจฉัย

document.addEventListener("DOMContentLoaded", () => {
  // เก็บ reference ของ chart object
  let feedbackBarChart, feedbackPieChart, diseaseChart;

  // Bar chart คะแนนฟีดแบค
  const ctx1 = document.getElementById("feedbackBarChart").getContext("2d");
  feedbackBarChart = new Chart(ctx1, {
    type: "bar",
    data: {
      labels: ["5", "4", "3", "2", "1"],
      datasets: [{
        label: "จำนวนคน",
        data: [77, 95, 45, 26, 123],
        backgroundColor: ["#007bff","#3399ff","#66b3ff","#ff6666","#ff0000"]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // ✅ ช่วยให้ยืดหยุ่นมากขึ้น
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });

  // Pie chart การแสดงความคิดเห็น
  const ctxPie = document.getElementById("feedbackPieChart").getContext("2d");
  feedbackPieChart = new Chart(ctxPie, {
    type: "pie",
    data: {
      labels: ["ไม่แสดงความคิดเห็น", "แสดงความคิดเห็น"],
      datasets: [{
        data: [143, 223],
        backgroundColor: ["#ff9966", "#3399ff"]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            font: {
              size: 16,   // ✅ ปรับขนาดตัวอักษร
              weight: "normal" // ✅ ตัวหนาได้
            },
            color: "#000000ff" // ✅ ปรับสีข้อความได้
          }
        }
      }
    }
  });

  // Bar chart โรคที่วินิจฉัยพบมากที่สุด
  const ctx4 = document.getElementById("diseaseChart").getContext("2d");
  diseaseChart = new Chart(ctx4, {
    type: "bar",
    data: {
      labels: [
        "โรคภูมิแพ้","ไมเกรน","โรคซึมเศร้า","โรคกระเพาะอาหาร",
        "โรคออฟฟิศซินโดรม","โรคอ้วน","โรคนอนหลับไม่สนิท",
        "โรคกรดไหลย้อน","โรคเครียดเรื้อรัง","โรควิตกกังวล"
      ],
      datasets: [{
        label: "จำนวนคน",
        data: [123, 101, 95, 86, 78, 71, 57, 43, 21, 11],
        backgroundColor: "#007bff"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });

  // ✅ Fix: บังคับ redraw ตอน resize
  window.addEventListener("resize", () => {
    feedbackBarChart.resize();
    feedbackPieChart.resize();
    diseaseChart.resize();
  });
});
