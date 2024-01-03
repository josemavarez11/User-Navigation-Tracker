# **Rastreador de navegación de usuarios**

El Rastreador de navegación de usuarios tiene una versión vanilla JavaScript y TypeScript. Es capaz de capturar y transmitir los datos de la visita del usuario a un endpoint específico. El uso de TypeScript mejora la compatibilidad con frameworks de JavaScript populares como React o Angular, ofreciendo una solución versátil para diversos entornos de desarrollo web. El núcleo ligero en vanilla JavaScript garantiza una ejecución eficiente, mientras que CryptoJS proporciona un cifrado de datos seguro para una mayor privacidad y fiabilidad en el seguimiento de las interacciones del usuario.

## ¿Cómo instalar y ejecutar el Rastreador?

#### **1. Elija la versión del rastreador que desea utilizar *(javascript o typescript)*.**

#### **2. Instala la librería crypto-js:**

    npm i crypto-js

### **Para la versión javascript:** 

#### **3. Incluye los archivos dentro de la carpeta js-version en la carpeta utils de tu proyecto.**

#### 4. Inserta la siguiente etiqueta en la sección head de las páginas html donde quieras que actúe el tracker:

    <script src="/utils/tracker.js" alt="">

> [!IMPORTANT]
> Recuerda ajustar la ruta en la etiqueta script a la ruta exacta donde has colocado tu archivo tracker.

### **Para la versión typescript:**

#### **3. Incluye los archivos dentro de la carpeta ts-version en la carpeta utils de tu proyecto.**

#### 4. Importa el archivo tracker al archivo que contiene tu aplicación principal.

  Por ejemplo, la implementación del tracker en un proyecto React creado con CRA sería la siguiente:

  En el archivo index.js importar el archivo tracker.js:

    import './utils/tracker.ts'

  <image src="./img/sc_import.png" align="center" width="550px" height="200px" alt="screenshot import"/>

## ¿Cómo utilizar el Rastreador?

Es necesario crear las siguientes variables de entorno en el proyecto donde se implementará el rastreador:

**TRACKER_ENDPOINT**= [Endpoint de tu servidor backend que recibirá los datos de seguimiento].


**TRACKER_ENCRYPTION_KEY**= [Clave de encriptación para cifrar los datos con la biblioteca crypto-js].


**TRACKER_INITIALIZATION_VECTOR**= [Vector de inicialización para la encriptación].

> [!IMPORTANT]
> Es importante recordar que las variables de entorno anteriores deben configurarse según las especificaciones de cada proyecto.

#### Una vez configurado correctamente el entorno, los datos llegarán al endpoint cifrados de la siguiente manera:

<image src="./img/sc_data.png" align="center" width="700px" height="240px" alt="screenshot data"/>

## Configuración del backend

El servidor backend debe tener configurada una ruta preparada para recibir una petición POST y desencriptar los datos recibidos. También debe estar configurado para parsear los datos a string. 
En el caso de Node.js esto sería:

    app.use(text({ type: '*/*' }))

> [!NOTE]
> Asegúrese de instalar las dependencias typescript necesarias para la tipos de datos en node.js.

    npm i -D user-agent-data-types
    npm i -D @types/node

> [!TIP]
> Para asegurarte de que añades correctamente los tipos de datos window.navigator en todo el proyecto, puedes añadir la siguiente etiqueta de referencia en el html principal del proyecto

    <reference types="user-agent-data-types" />

Una vez que descifres los datos en el backend utilizando la misma clave de cifrado utilizada en la variable de entorno correspondiente, el objeto de datos que obtendrás tendrás se verá de la siguiente manera:

<image src="./img/sc_object.png" align="center" width="350px" height="50px" alt="screenshot object"/>

Donde:

- **visitTime** representa el tiempo que el usuario permaneció en la página hasta el momento en que la cerró, cambió de pestaña o minimizó.
- **url** representa la dirección url exacta en la que el usuario navegó durante el tiempo indicado.
- **deviceType** representa el tipo de dispositivo utilizado por el usuario que navegó en la página.
