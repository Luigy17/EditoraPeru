// Manejo de la pasarela de pago
document.addEventListener('DOMContentLoaded', function() {
    const paymentModal = document.getElementById('paymentModal');
    const closeModal = document.querySelector('.close-modal');
    const paymentOptions = document.querySelectorAll('.payment-option');
    const cardForm = document.querySelector('.card-form');
    const yapeSection = document.querySelector('.yape-section');
    const paymentForm = document.getElementById('paymentForm');
    const loadingOverlay = document.querySelector('.loading-overlay');
    
    let selectedService = null;
    let selectedPrice = 0;

    // Abrir modal de pago al hacer click en una tarifa
    document.querySelectorAll('.tarifa-item').forEach(item => {
        item.addEventListener('click', function() {
            selectedService = this.querySelector('span:first-child').textContent;
            const priceText = this.querySelector('.tarifa-price').textContent;
            selectedPrice = parseFloat(priceText.replace('S/', '').replace(',', '').trim());
            
            openPaymentModal(selectedService, selectedPrice);
        });
    });

    // Función para abrir el modal
    function openPaymentModal(service, price) {
        document.getElementById('serviceName').textContent = service;
        document.getElementById('servicePrice').textContent = `S/ ${price.toFixed(2)}`;
        document.getElementById('totalPrice').textContent = `S/ ${price.toFixed(2)}`;
        
        paymentModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Cerrar modal
    closeModal.addEventListener('click', function() {
        closePaymentModal();
    });

    paymentModal.addEventListener('click', function(e) {
        if (e.target === paymentModal) {
            closePaymentModal();
        }
    });

    function closePaymentModal() {
        paymentModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        resetForm();
    }

    // Selección de método de pago
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            paymentOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            
            const method = this.dataset.method;
            
            if (method === 'card') {
                cardForm.classList.add('active');
                yapeSection.classList.remove('active');
            } else if (method === 'yape') {
                cardForm.classList.remove('active');
                yapeSection.classList.add('active');
                generateYapeQR();
            }
        });
    });

    // Formateo de número de tarjeta
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }

    // Formateo de fecha de expiración
    const expiryInput = document.getElementById('expiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }

    // Validación de CVV
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
        });
    }

    // Envío del formulario
    if (paymentForm) {
        paymentForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const selectedMethod = document.querySelector('.payment-option.selected');
            if (!selectedMethod) {
                alert('Por favor selecciona un método de pago');
                return;
            }

            const method = selectedMethod.dataset.method;

            if (method === 'card') {
                await processCardPayment();
            } else if (method === 'yape') {
                await processYapePayment();
            }
        });
    }

    // Procesar pago con tarjeta
    async function processCardPayment() {
        const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
        const cardHolder = document.getElementById('cardHolder').value;
        const expiry = document.getElementById('expiry').value;
        const cvv = document.getElementById('cvv').value;

        // Validaciones básicas
        if (cardNumber.length < 13 || cardNumber.length > 19) {
            alert('Número de tarjeta inválido');
            return;
        }

        if (!expiry.match(/^\d{2}\/\d{2}$/)) {
            alert('Fecha de expiración inválida (MM/AA)');
            return;
        }

        if (cvv.length < 3 || cvv.length > 4) {
            alert('CVV inválido');
            return;
        }

        showLoading();

        try {
            const response = await fetch('/procesar-pago', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    metodo: 'tarjeta',
                    servicio: selectedService,
                    monto: selectedPrice,
                    datos_tarjeta: {
                        numero: cardNumber,
                        titular: cardHolder,
                        expiracion: expiry,
                        cvv: cvv
                    }
                })
            });

            const data = await response.json();

            hideLoading();

            if (data.success) {
                showSuccessMessage(data);
            } else {
                alert('Error al procesar el pago: ' + (data.error || 'Error desconocido'));
            }
        } catch (error) {
            hideLoading();
            console.error('Error:', error);
            alert('Error de conexión. Por favor intenta nuevamente.');
        }
    }

    // Procesar pago con Yape
    async function processYapePayment() {
        showLoading();

        try {
            const response = await fetch('/procesar-pago', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    metodo: 'yape',
                    servicio: selectedService,
                    monto: selectedPrice
                })
            });

            const data = await response.json();

            hideLoading();

            if (data.success) {
                showSuccessMessage(data);
            } else {
                alert('Error al procesar el pago: ' + (data.error || 'Error desconocido'));
            }
        } catch (error) {
            hideLoading();
            console.error('Error:', error);
            alert('Error de conexión. Por favor intenta nuevamente.');
        }
    }

    // Generar QR de Yape (simulado)
    function generateYapeQR() {
        const qrContainer = document.querySelector('.yape-qr');
        if (qrContainer) {
            // En producción, aquí generarías un QR real con la información del pago
            qrContainer.innerHTML = `
                <svg width="200" height="200" viewBox="0 0 200 200">
                    <rect width="200" height="200" fill="white"/>
                    <text x="100" y="100" text-anchor="middle" fill="#722F8D" font-size="16">
                        QR de Yape
                    </text>
                    <text x="100" y="120" text-anchor="middle" fill="#722F8D" font-size="12">
                        S/ ${selectedPrice.toFixed(2)}
                    </text>
                </svg>
            `;
        }
    }

    // Mostrar mensaje de éxito
    function showSuccessMessage(data) {
        alert(`¡Pago exitoso!\n\nNúmero de operación: ${data.numero_operacion}\nServicio: ${selectedService}\nMonto: S/ ${selectedPrice.toFixed(2)}\n\nSe ha enviado un comprobante a tu correo.`);
        closePaymentModal();
    }

    // Mostrar loading
    function showLoading() {
        if (loadingOverlay) {
            loadingOverlay.classList.add('active');
        }
    }

    // Ocultar loading
    function hideLoading() {
        if (loadingOverlay) {
            loadingOverlay.classList.remove('active');
        }
    }

    // Reset del formulario
    function resetForm() {
        if (paymentForm) {
            paymentForm.reset();
        }
        paymentOptions.forEach(opt => opt.classList.remove('selected'));
        cardForm.classList.remove('active');
        yapeSection.classList.remove('active');
    }

    // Detectar tecla ESC para cerrar modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && paymentModal.classList.contains('active')) {
            closePaymentModal();
        }
    });
});
