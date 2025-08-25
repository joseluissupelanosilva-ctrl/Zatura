document.addEventListener('DOMContentLoaded', function() {
    // Cerrar alerta de registro y mostrar formulario de login
    const closeAlertBtn = document.getElementById('close-alert');
if (closeAlertBtn) {
    closeAlertBtn.addEventListener('click', function() {
        const alert = document.getElementById('registration-alert');
        if (alert) {
            alert.style.animation = 'fadeOut 0.5s ease forwards';
            
            setTimeout(function() {
                alert.remove();
                // Cambiar al formulario de login con animación suave
                document.querySelector('.container-form.register').classList.add('hide');
                document.querySelector('.container-form.login').classList.remove('hide');
            }, 500);
        }
    });
}

// Cerrar alerta al hacer clic fuera del contenido
document.addEventListener('click', function(e) {
    const registrationAlert = document.getElementById('registration-alert');
    if (registrationAlert && e.target === registrationAlert) {
        const closeBtn = document.getElementById('close-alert');
        if (closeBtn) closeBtn.click();
    }
});
    
    // Si hay alerta de bienvenida, configurar redirección
    const welcomeAlert = document.getElementById('welcome-alert');
    if (welcomeAlert) {
        setTimeout(function() {
            welcomeAlert.style.animation = 'fadeOut 0.5s ease forwards';
            setTimeout(function() {
                window.location.href = "http://localhost/Zatura/Zatura.html";
            }, 500);
        }, 3000);
    }

    // Cerrar alerta al hacer clic fuera del contenido
    document.addEventListener('click', function(e) {
        const registrationAlert = document.getElementById('registration-alert');
        if (registrationAlert && e.target === registrationAlert) {
            const closeBtn = document.getElementById('close-alert');
            if (closeBtn) closeBtn.click();
        }
    });

    const signInButton = document.getElementById('sign-in');
    const signUpButton = document.getElementById('sign-up');
    
    if (signInButton) {
        signInButton.addEventListener('click', function() {
            document.querySelector('.container-form.register').classList.add('hide');
            document.querySelector('.container-form.login').classList.remove('hide');
        });
    }
    
    if (signUpButton) {
        signUpButton.addEventListener('click', function() {
            document.querySelector('.container-form.login').classList.add('hide');
            document.querySelector('.container-form.register').classList.remove('hide');
        });
    }
    
    // Validación básica de formularios
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let valid = true;
            const inputs = this.querySelectorAll('input[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (!valid) {
                e.preventDefault();
                const errorDiv = this.querySelector('.alerta-error');
                if (errorDiv) {
                    errorDiv.style.display = 'block';
                }
            }
        });
    });

    // Si hay un mensaje de registro exitoso, mostrar automáticamente el formulario de login
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('registro') === 'exito') {
        document.querySelector('.container-form.register').classList.add('hide');
        document.querySelector('.container-form.login').classList.remove('hide');
    }
});