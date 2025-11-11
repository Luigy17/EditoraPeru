# Sistema de Pagos Editora Perú

Sistema web de gestión de pagos para los servicios de Editora Perú, con pasarela de pago integrada similar al Banco de la Nación.

## 🚀 Características

- 🎨 Diseño profesional replicando la identidad visual de Editora Perú
- 💳 Pasarela de pago con múltiples métodos:
  - Tarjetas de crédito/débito (Visa, Mastercard, etc.)
  - Yape
- 🔒 Validación segura de tarjetas (Algoritmo de Luhn)
- 📱 Diseño responsive
- ⚡ Interfaz moderna y rápida
- 🧾 Generación de número de operación único

## 📁 Estructura del Proyecto

```
editora_peru/
├── app.py                  # Aplicación Flask principal
├── requirements.txt        # Dependencias Python
├── install.bat            # Instalador automático (Windows)
├── run.bat                # Ejecutar aplicación (Windows)
├── static/
│   ├── css/
│   │   └── style.css      # Estilos CSS
│   ├── js/
│   │   └── payment.js     # JavaScript para pasarela
│   └── img/               # ⚠️ COPIAR TUS IMÁGENES AQUÍ
│       ├── fondo.jpg      # Imagen del edificio
│       ├── logolargo.jpg  # Logo largo con texto
│       └── logo.jpg       # Logo simple
└── templates/
    └── index.html         # Página principal
```

## ⚙️ Instalación Rápida (Windows)

### Opción 1: Instalador Automático
1. Haz doble clic en `install.bat`
2. Espera a que se instalen las dependencias
3. Copia tus imágenes a la carpeta `static/img/`
4. Haz doble clic en `run.bat`

### Opción 2: Manual
```bash
# 1. Crear entorno virtual
python -m venv venv

# 2. Activar entorno virtual
venv\Scripts\activate

# 3. Instalar dependencias
pip install -r requirements.txt

# 4. Ejecutar aplicación
python app.py
```

## 📸 Copiar las Imágenes

**MUY IMPORTANTE:** Debes copiar tus imágenes desde:
```
C:\Users\luigy\OneDrive\Escritorio\EDITORA\IMG
```

A la carpeta:
```
editora_peru/static/img/
```

**Imágenes necesarias:**
- `fondo.jpg` - Imagen del edificio (primera pantalla)
- `logolargo.jpg` - Logo con texto "EDITORA PERÚ EMPRESA PERUANA..."
- `logo.jpg` - Logo simple de Editora Perú

## 🎯 Uso

1. **Iniciar**: Ejecuta `run.bat` o `python app.py`
2. **Abrir**: Ve a `http://localhost:5000` en tu navegador
3. **Navegar**: Explora las tarifas disponibles
4. **Seleccionar**: Haz clic en cualquier servicio para pagar
5. **Pagar**: Completa los datos según el método elegido
6. **Confirmar**: Obtendrás un número de operación

## 💳 Métodos de Pago

### Tarjeta de Crédito/Débito
- ✅ Validación de número de tarjeta (Algoritmo de Luhn)
- ✅ Soporte para Visa, Mastercard, American Express
- ✅ Campos: Número, Titular, Fecha de vencimiento, CVV
- ✅ Encriptación simulada

### Yape
- ✅ Generación de QR (simulado)
- ✅ Instrucciones paso a paso
- ✅ Verificación de pago

## 🔐 Validaciones

- ✅ Validación de número de tarjeta (Algoritmo de Luhn)
- ✅ Formato de fecha de expiración (MM/AA)
- ✅ CVV de 3-4 dígitos
- ✅ Campos obligatorios
- ✅ Selección de método de pago

## 🚀 Para Producción

Si quieres usar esto en producción, necesitas:

1. **Integrar pasarelas reales**:
   - [Culqi](https://www.culqi.com/) - Peruano
   - [Niubiz/Visa Net](https://www.niubiz.com.pe/) - Visa oficial Perú
   - [Mercado Pago](https://www.mercadopago.com.pe/)
   - [PayU](https://www.payu.com/pe/)

2. **Agregar base de datos** (opcional):
   - SQL Server
   - PostgreSQL
   - MySQL
   - SQLite

3. **Seguridad**:
   - HTTPS obligatorio
   - Tokens CSRF
   - Rate limiting

## 📞 Soporte

Para cualquier consulta:
- Email: desarrollo@editoraperu.com.pe
- Teléfono: (051-1) 315-0400

## 📄 Licencia

Uso interno - Editora Perú © 2025
