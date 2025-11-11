from flask import Flask, render_template, request, jsonify
import random
import string
from datetime import datetime

app = Flask(__name__)

# Configuración
app.config['SECRET_KEY'] = 'tu_clave_secreta_super_segura'

# Función para generar número de operación
def generar_numero_operacion():
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    random_suffix = ''.join(random.choices(string.digits, k=4))
    return f"OP-{timestamp}-{random_suffix}"

# Ruta principal - Página inicial con hero
@app.route('/')
def index():
    return render_template('index.html')

# Ruta de tarifas - Lista de servicios
@app.route('/tarifas')
def tarifas():
    return render_template('tarifas.html')

# Ruta de pasarela de pago
@app.route('/pago')
def pago():
    servicio = request.args.get('servicio', 'Servicio')
    precio = request.args.get('precio', '0.00')
    return render_template('pago.html', servicio=servicio, precio=precio)

# Procesar pago - SIEMPRE APRUEBA
@app.route('/procesar-pago', methods=['POST'])
def procesar_pago():
    try:
        data = request.get_json()
        
        metodo = data.get('metodo')
        servicio = data.get('servicio')
        monto = data.get('monto')
        
        # Validaciones básicas
        if not metodo or not servicio or not monto:
            return jsonify({
                'success': False,
                'error': 'Datos incompletos'
            }), 400
        
        if metodo == 'tarjeta':
            datos_tarjeta = data.get('datos_tarjeta', {})
            numero_tarjeta = datos_tarjeta.get('numero', '')
            
            # Validación simple de longitud (sin algoritmo de Luhn)
            numero_limpio = numero_tarjeta.replace(' ', '')
            if len(numero_limpio) < 13 or len(numero_limpio) > 19:
                return jsonify({
                    'success': False,
                    'error': 'Número de tarjeta debe tener entre 13 y 19 dígitos'
                }), 400
            
            # SIEMPRE APRUEBA EL PAGO
            numero_operacion = generar_numero_operacion()
            
            return jsonify({
                'success': True,
                'numero_operacion': numero_operacion,
                'servicio': servicio,
                'monto': monto,
                'metodo': 'Tarjeta de Crédito/Débito',
                'fecha': datetime.now().strftime('%d/%m/%Y %H:%M:%S'),
                'estado': 'Aprobado',
                'mensaje': '¡Pago realizado correctamente!'
            })
        
        elif metodo == 'yape':
            # SIEMPRE APRUEBA EL PAGO
            numero_operacion = generar_numero_operacion()
            
            return jsonify({
                'success': True,
                'numero_operacion': numero_operacion,
                'servicio': servicio,
                'monto': monto,
                'metodo': 'Yape',
                'fecha': datetime.now().strftime('%d/%m/%Y %H:%M:%S'),
                'estado': 'Aprobado',
                'mensaje': '¡Pago realizado correctamente!'
            })
        
        else:
            return jsonify({
                'success': False,
                'error': 'Método de pago no válido'
            }), 400
    
    except Exception as e:
        print(f"Error al procesar pago: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Error al procesar el pago'
        }), 500

# Ruta para obtener historial de pagos (opcional)
@app.route('/historial-pagos')
def historial_pagos():
    return jsonify({
        'pagos': []
    })

# Ruta para generar comprobante (opcional)
@app.route('/generar-comprobante/<numero_operacion>')
def generar_comprobante(numero_operacion):
    return jsonify({
        'success': True,
        'message': 'Comprobante enviado al correo'
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)