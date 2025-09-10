// Toggle password visibility
function togglePassword(inputId, toggleId) {
    const input = document.getElementById(inputId);
    const toggle = document.getElementById(toggleId);

    toggle.addEventListener("click", () => {
        if (input.type === "password") {
            input.type = "text";
            toggle.innerHTML = '<i class="bi bi-eye"></i>';
        } else {
            input.type = "password";
            toggle.innerHTML = '<i class="bi bi-eye-slash"></i>';
        }
    });
}

togglePassword("currentPassword", "toggleCurrentPassword");
togglePassword("newPassword", "toggleNewPassword");
togglePassword("confirmNewPassword", "toggleConfirmPassword");