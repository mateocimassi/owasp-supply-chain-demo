# owasp-supply-chain-demo
La demo es sobre **OWASP A03:2025 – Software Supply Chain Failures**. La idea es mostrar que una aplicación puede funcionar perfectamente, pero volverse vulnerable por instalar una dependencia externa insegura.

### 1. Descargar y preparar el proyecto

Clonar el repo y entrar a la carpeta:

```bash
git clone URL_DEL_REPO
cd owasp-supply-chain-demo
```

Instalar las dependencias:

```bash
npm install
```

Antes de empezar conviene verificar:

```bash
npm audit
```

La idea es arrancar con:

```text
found 0 vulnerabilities
```

### 2. Levantar la página

En una terminal:

```bash
npm start
```

Abrir:

```text
http://localhost:3000
```

La página es una tienda normal que tiene abajo un pequeño **Security Status**.

Al principio debería mostrar:

```text
Vulnerabilidades: 0
✓ Sin vulnerabilidades conocidas
```

### 3. Introducir la vulnerabilidad

Sin cerrar el servidor, abrir **otra terminal** en la misma carpeta y ejecutar:

```bash
npm install node.extend@1.1.6
```

Estamos instalando intencionalmente una versión antigua y vulnerable de `node.extend`.

Después verificar:

```bash
npm audit
```

Debería aparecer algo parecido a:

```text
node.extend <1.1.7
Severity: critical
Prototype Pollution in node.extend

1 critical severity vulnerability
```

### 4. Mostrarlo en la página

Volver al navegador y hacer **F5**.

El Security Status debería cambiar aproximadamente a:

```text
Vulnerabilidades: 1
Critical: 1

node.extend
CRITICAL
```

La parte importante para explicar es:

**La tienda sigue funcionando normalmente. El problema no está necesariamente en nuestro código, sino en una dependencia externa que agregamos al proyecto.**

Eso es lo que queremos relacionar con **Software Supply Chain Failures**.

### 5. Corregirlo

Volver a la segunda terminal:

```bash
npm audit fix
```

Después verificar:

```bash
npm audit
```

Debería volver a:

```text
found 0 vulnerabilities
```

Volver a la página y hacer **F5**.

El contador debería volver a:

```text
Vulnerabilidades: 0
✓ Sin vulnerabilidades conocidas
```

### Resumen de comandos

```bash
# Preparar
npm install

# Levantar página
npm start

# Introducir vulnerabilidad
npm install node.extend@1.1.6

# Detectarla
npm audit

# Corregirla
npm audit fix

# Comprobar
npm audit
```

**Idea principal para explicar:** una aplicación moderna no contiene solamente nuestro código. También utiliza paquetes, librerías y dependencias de terceros. Si uno de esos componentes es vulnerable o está comprometido, puede introducir riesgos en nuestra aplicación aunque nuestro propio código esté bien.

Para repetir la demo simplemente volver a instalar:

```bash
npm install node.extend@1.1.6
```

y después `npm audit`.
