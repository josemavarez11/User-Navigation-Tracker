# **User Navigation Tracker**

User Navigation Tracker has a vanilla JavaScript and TypeScript version. It is able to captures and transmits user visit data to a specified endpoint. The use of TypeScript enhances compatibility with popular JavaScript frameworks like React or Angular, offering a versatile solution for diverse web development environments. The lightweight vanilla JavaScript core ensures efficient execution, while CryptoJS provides secure data encryption for heightened privacy and reliability in tracking user interactions.


## ¿How to install and run the Tracker?

#### **1. Choose the version of the tracker you want to use.**

#### **2. Install the crypto-js library:**

  
     npm i crypto-js


#### **3. Include the files inside the js-version folder in the utils folder of your project.**

### **For the javascript version:** 

#### 4. Insert the following tag in the head section of the html pages where you want the tracker to act:


       <script src="/utils/tracker.js" alt="">


> [!IMPORTANT]
> Remember to adjust the path in the script tag to the exact path where you have placed your tracker file.

### **For the typescript version:**

#### 4. Import the tracker file into the file containing your main application.

  *For example, the implementation of the tracker in a React project created with create-react-app would be as follows:*

  *In the index.js file import the tracker.js file:*


    import './utils/tracker.ts'


  <image src="./img/sc_import.png" align="center" width="900px" height="400px" alt="screenshot import"/>



## ¿How to Use the Project?

It is necessary to create the following environment variables in the project where the tracker will be implemented:


**TRACKER_ENDPOINT**= [Endpoint of your backend server that will receive the tracking data].


**TRACKER_ENCRYPTION_KEY**= [Encryption key to encrypt the data with the crypto-js library].


**TRACKER_INITIALIZATION_VECTOR**= [Initialization vector for encryption].


### Once the environment is correctly configured, the data will arrive at the endpoint encrypted as follows:


<image src="./img/sc_data.png" align="center" width="1020px" height="320px" alt="screenshot data"/>


## Backend Configuration

The backend server must have configured a route ready to receive a POST request and decrypt the received data. It must also be configured to parse the data to string. 
In the case of Node.js this would be:


    app.use(text({ type: '*/*' }))


**make sure to install the dependencies types/node
