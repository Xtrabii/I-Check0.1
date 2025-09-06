document.addEventListener("DOMContentLoaded", function () {
  const symptoms = document.querySelectorAll(".symptom");

  symptoms.forEach(symptom => {
    symptom.addEventListener("click", function () {
      const isNone = this.dataset.symptom === "none";

      if (isNone) {
        // ถ้าคลิก "ไม่มีอาการ"
        if (this.classList.contains("selected")) {
          // ถ้าถูกเลือกอยู่แล้ว -> ยกเลิก
          this.classList.remove("selected");
        } else {
          // ถ้ายังไม่ถูกเลือก -> เลือก และยกเลิกอาการอื่น
          symptoms.forEach(s => s.classList.remove("selected"));
          this.classList.add("selected");
        }
      } else {
        // ถ้าเลือกอาการอื่น -> ยกเลิก "ไม่มีอาการ"
        const noneSymptom = document.querySelector('[data-symptom="none"]');
        if (noneSymptom) {
          noneSymptom.classList.remove("selected");
        }

        this.classList.toggle("selected");
      }
    });
  });
});
