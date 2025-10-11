// ✅ ถ้าต้องการ “ความถี่การวินิจฉัย” → ใช้นับตามจำนวนครั้งที่ผู้ใช้กดวินิจฉัย (จะสะท้อนพฤติกรรมการใช้งานได้ดี)
// ✅ ถ้าต้องการ “จำนวนผู้ป่วยจริง” → ใช้นับตามจำนวน “ผู้ใช้ไม่ซ้ำ (unique users)” ที่ถูกวินิจฉัยเป็นโรคนั้น
// ❌ ไม่ควรใช้จำนวนผู้สมัครทั้งหมดมาเป็นกราฟโรค เพราะจะไม่สะท้อนข้อมูลจริง (เช่น มี 1000 สมัคร แต่ 200 คนใช้ระบบวินิจฉัย)
// diagnosis_count = จำนวนครั้งที่กดวินิจฉัยโรคนั้น
// patient_count = จำนวนคนไม่ซ้ำที่ถูกวินิจฉัย

document.addEventListener("DOMContentLoaded", () => {
    // เพื่อลงทะเบียน Plugin ให้ Chart.js รู้จักและใช้งานได้
    Chart.register(ChartDataLabels);

    const currentPath = window.location.pathname.split("/").pop();
    const menuLinks = document.querySelectorAll(".sidebar a");

    menuLinks.forEach(link => {
        if (link.getAttribute("href").includes(currentPath)) {
            link.classList.add("active");
        }
    });
    
    let feedbackBarChart, feedbackPieChart, diseaseChart;

    // --- 1. กราฟแท่ง: คะแนนความพึงพอใจ ---
    const ctx1 = document.getElementById("feedbackBarChart").getContext("2d");
    feedbackBarChart = new Chart(ctx1, {
        type: "bar",
        data: {
            labels: ["5 ดาว", "4 ดาว", "3 ดาว", "2 ดาว", "1 ดาว"], // ✨ NEW: ทำให้ Label ชัดเจนขึ้น
            datasets: [{
                label: "จำนวนคน",
                data: [77, 95, 45, 26, 123],
                backgroundColor: [
                    '#28a745', // เขียว (5)
                    '#87CEEB', // ฟ้า (4)
                    '#ffc107', // เหลือง (3)
                    '#fd7e14', // ส้ม (2)
                    '#dc3545'  // แดง (1)
                ],
                borderColor: 'rgba(255, 255, 255, 0.5)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                // หัวข้อกราฟ
                title: {
                    display: true,
                    text: 'คะแนนความพึงพอใจ',
                    font: { size: 22,}
                },
                // Tooltip
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return ` จำนวน: ${context.parsed.y} คน`;
                        }
                    }
                },
                // เพิ่ม datalabels สำหรับกราฟแท่ง (แสดงตัวเลขบนแท่ง)
                datalabels: {
                    anchor: 'end',      // ยึดตำแหน่งบนสุดของแท่ง
                    align: 'top',       // จัดให้อยู่ด้านบน
                    color: '#666',
                    font: { weight: 'bold' },
                    formatter: (value) => value + ' คน'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    // ชื่อแกน Y
                    title: {
                        display: true,
                        text: 'จำนวนผู้ใช้งาน (คน)'
                    }
                },
                x: {
                    // ชื่อแกน X
                     title: {
                        display: true,
                        text: 'ระดับความพึงพอใจ'
                    }
                }
            }
        }
    });

    // --- 2. กราฟวงกลม: สัดส่วนการแสดงความคิดเห็น ---
    const ctxPie = document.getElementById("feedbackPieChart").getContext("2d");
    feedbackPieChart = new Chart(ctxPie, {
        type: "doughnut", // กราฟแบบ Doughnut 
        data: {
            labels: ["ไม่แสดงความคิดเห็น", "แสดงความคิดเห็น"],
            datasets: [{
                data: [143, 223],
                backgroundColor: ["#6c757d", "#007bff"], // ✨ NEW: ปรับสี เทา-น้ำเงิน
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                // ข้อกราฟ
                title: {
                    display: true,
                    text: 'สัดส่วนการแสดงความคิดเห็น',
                    font: { size: 22,}
                },
                legend: {
                    position: "bottom",
                    labels: {
                        font: { size: 14, family: 'Mitr' },
                        color: "#333"
                    }
                },
                // Tooltip แสดง %
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                            const value = context.parsed;
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${context.label}: ${value} คน (${percentage}%)`;
                        }
                    }
                },
                // datalabels สำหรับกราฟวงกลม
                datalabels: {
                    color: '#fff', // สีตัวอักษร
                    font: { weight: 'bold', size: 14 },
                    formatter: (value, context) => {
                        const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(0) + '%';
                        return percentage;
                    }
                }
            }
        }
    });

    // --- 3. กราฟแท่ง: 10 อันดับโรคที่วินิจฉัยพบ ---
    const ctx4 = document.getElementById("diseaseChart").getContext("2d");
    const diseaseLabels = [
        "โรคภูมิแพ้", "ไมเกรน", "โรคซึมเศร้า", "โรคกระเพาะอาหาร", "โรคออฟฟิศซินโดรม",
        "โรคอ้วน", "โรคนอนไม่หลับ", "โรคกรดไหลย้อน", "โรคเครียด", "โรควิตกกังวล"
    ];
    const diseaseData = [123, 101, 95, 86, 78, 71, 57, 43, 21, 11];

    //Gradient Color ให้กราฟแท่ง
    const gradient = ctx4.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(0, 123, 255, 0.9)');
    gradient.addColorStop(1, 'rgba(27, 67, 104, 0.5)');

    diseaseChart = new Chart(ctx4, {
        type: "bar",
        // กราฟแนวนอน
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: '10 อันดับโรคที่ถูกวินิจฉัยสูงสุด',
                    font: {
                        size: 22,
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `จำนวน: ${context.parsed.x} คน`;
                        }
                    }
                },
                // ✨ เพิ่มส่วนนี้เพื่อแสดงตัวเลขบนกราฟ ✨
                datalabels: {
                    anchor: 'end',      // ตำแหน่งจุดยึดของข้อความ (ท้ายสุดของแท่ง)
                    align: 'end',       // การจัดวางข้อความ (ชิดท้าย)
                    offset: 8,          // ระยะห่างจากปลายแท่งเล็กน้อย (กันข้อความชิดไป)
                    color: '#444',      // สีของข้อความ
                    font: {
                        weight: '500'   // ทำให้ตัวหนังสือหนาขึ้นเล็กน้อย
                    },
                    formatter: function(value, context) {
                        // value คือค่า data ของแท่งนั้นๆ (เช่น 123)
                        return value + ' คน'; // คืนค่าเป็น "123 คน"
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'จำนวนผู้ป่วย (คน)'
                    }
                },
                y: {
                    ticks: {
                        font: {
                            size: 12,
                        }
                    }
                }
            }
        },
        data: {
            labels: diseaseLabels,
            datasets: [{
                label: "จำนวนคน",
                data: diseaseData,
                backgroundColor: gradient,
                borderColor: 'rgba(80, 146, 218, 1)',
                borderWidth: 1,
                borderRadius: 5,
            }]
        }
    });

    window.addEventListener("resize", () => {
        feedbackBarChart.resize();
        feedbackPieChart.resize();
        diseaseChart.resize();
    });
});