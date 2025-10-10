document.addEventListener('DOMContentLoaded', () => {

    // --- ส่วนตั้งค่า ---
    const predefinedDiseases = [
        "โรคเบาหวาน", "โรคหัวใจ", "โรคไต", "โรคตับ",
        "ความดันโลหิตสูง", "โรคหอบ หรือ ถุงลมโป่งพอง",
        "ไขมันในเลือดสูง", "โรคลมชัก", "โรคภูมิแพ้",
        "โรคไทรอยด์", "G6PD", "โรคโลหิตจาง", "มะเร็ง"
    ];
    let selectedTags = [];

    // --- ดึง Element จาก HTML ---
    const tagContainer = document.getElementById('tag-container');
    const tagInput = document.getElementById('tag-input');
    const suggestionsBox = document.getElementById('suggestions-box');
    const hiddenInput = document.getElementById('hidden-diseases-input');

    // --- ฟังก์ชันหลัก (เหมือนเดิม) ---

    function renderTags() {
        tagContainer.querySelectorAll('.tag').forEach(tag => tag.remove());
        selectedTags.slice().reverse().forEach(tagLabel => {
            const tagElement = createTagElement(tagLabel);
            tagContainer.prepend(tagElement);
        });
        updateHiddenInput();
    }

    function createTagElement(label) {
        const div = document.createElement('div');
        div.classList.add('tag');
        const span = document.createElement('span');
        span.textContent = label;
        const closeBtn = document.createElement('span');
        closeBtn.classList.add('tag-close');
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', () => removeTag(label));
        div.appendChild(span);
        div.appendChild(closeBtn);
        return div;
    }

    function addTag(label) {
        const trimmedLabel = label.trim();
        if (trimmedLabel && !selectedTags.includes(trimmedLabel)) {
            selectedTags.push(trimmedLabel);
            renderTags();
        }
        tagInput.value = '';
        hideSuggestions();
    }

    function removeTag(label) {
        selectedTags = selectedTags.filter(tag => tag !== label);
        renderTags();
    }

    function showSuggestions() {
        const inputValue = tagInput.value.toLowerCase();
        const filtered = predefinedDiseases.filter(d => 
            !selectedTags.includes(d) && d.toLowerCase().includes(inputValue)
        );

        if (filtered.length === 0) {
            hideSuggestions();
            return;
        }

        suggestionsBox.innerHTML = '';
        filtered.forEach(disease => {
            const item = document.createElement('div');
            item.classList.add('suggestion-item');
            item.textContent = disease;
            item.addEventListener('click', () => {
                addTag(disease);
                tagInput.focus();
            });
            suggestionsBox.appendChild(item);
        });
        suggestionsBox.style.display = 'block';
    }

    function hideSuggestions() {
        suggestionsBox.style.display = 'none';
    }
    
    function updateHiddenInput() {
        hiddenInput.value = selectedTags.join(',');
    }

    // --- Event Listeners ---

    // ✨ จุดที่แก้ไข: เพิ่ม Event Listener 'focus' เข้าไป 1 บรรทัด ✨
    tagInput.addEventListener('focus', showSuggestions); // <-- เพิ่มบรรทัดนี้

    // เมื่อเริ่มพิมพ์ในช่อง Input
    tagInput.addEventListener('input', showSuggestions);

    // จัดการการกดปุ่ม Enter
    tagInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag(tagInput.value);
        }
    });

    // เมื่อคลิกที่ Container ให้ Focus ไปที่ช่อง Input
    tagContainer.addEventListener('click', () => {
        tagInput.focus();
    });

    // ซ่อนรายการคำแนะนำเมื่อคลิกที่อื่น
    document.addEventListener('click', (e) => {
        if (!tagContainer.contains(e.target) && !suggestionsBox.contains(e.target)) {
            hideSuggestions();
        }
    });
});