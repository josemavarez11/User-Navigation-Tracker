# **User Navigation Tracker**

User Navigation Tracker has a vanilla JavaScript and TypeScript version. It is able to captures and transmits user visit data to a specified endpoint. The use of TypeScript enhances compatibility with popular JavaScript frameworks like React or Angular, offering a versatile solution for diverse web development environments. The lightweight vanilla JavaScript core ensures efficient execution, while CryptoJS provides secure data encryption for heightened privacy and reliability in tracking user interactions.


## ¿How to install and run the Tracker?

#### **1. Choose the version of the tracker you want to use *(javascript or typescript)*.**

#### **2. Install the crypto-js library:**

  
     npm i crypto-js


### **For the javascript version:** 

#### **3. Include the files inside the js-version folder in the utils folder of your project.**

#### 4. Insert the following tag in the head section of the html pages where you want the tracker to act:


       <script src="/utils/tracker.js" alt="">


> [!IMPORTANT]
> Remember to adjust the path in the script tag to the exact path where you have placed your tracker file.

### **For the typescript version:**

#### **3. Include the files inside the ts-version folder in the utils folder of your project.**

#### 4. Import the tracker file into the file containing your main application.

  For example, the implementation of the tracker in a React project created with CRA would be as follows:

  In the index.js file import the tracker.ts file:


    import React from 'react';
    import App from './App';
    import ReactDOM from 'react-dom/client';
    import { BrowserRouter } from 'react-router-dom';
    import './utils/tracker.ts';
  
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );


> [!NOTE]
> Make sure to install the necessary typescript dependencies for user agent and crypto-js data types.

    npm i -D user-agent-data-types
    npm i @types/crypto-js
    
    
> [!TIP]
> To make sure you add the window.navigator data types correctly in the whole project, you could add the following reference tag in the main html of the project

    <reference types="user-agent-data-types" />
    

## ¿How to Use the Tracker?

It is necessary to create the following environment variables in the project where the tracker will be implemented:


**TRACKER_ENDPOINT**= [Endpoint of your backend server that will receive the tracking data].


**TRACKER_ENCRYPTION_KEY**= [Encryption key to encrypt the data with the crypto-js library].


**TRACKER_INITIALIZATION_VECTOR**= [Initialization vector for encryption].


> [!IMPORTANT]
> It is important to remember that the above environment variables must be configured according to the specification of each project.


#### Once the environment is correctly configured, the data will arrive at the endpoint encrypted as follows:


<image src="./img/sc_data.png" align="center" width="800px" height="280px" alt="screenshot data"/>


## Backend Configuration

The backend server must have configured a route ready to receive a POST request and decrypt the received data. It must also be configured to parse the data to string. 
In the case of Node.js this would be:


    app.post('/endpoint/to/receive/data', express.text({ type: '*/*' }), (req, res) => {
        //make something with data
        return res.sendStatus(204)
    });


> [!NOTE]
> Make sure to install the necessary typescript dependencies for node.js data types.

    npm i -D @types/node


## Data Decryption

You can implement the following function to decrypt the data received in the body request that arrives at the backend server endpoint:

    const decryptBeaconData = (_data, _key, _iv) => {
        try {
            const ivD = CryptoJS.enc.Hex.stringify(CryptoJS.enc.Utf8.parse(_iv))
            const decryptData = CryptoJS.AES.decrypt(_data, _key, { iv: ivD })
            return decryptData.toString(CryptoJS.enc.Utf8)
        } catch (error) {
            console.log(error)
            throw error.message
        }
    }

Once you decrypt the data in the backend using the same encryption key used in the respective environment variable, the data object you will get will look like this:

    {
      visitTime: '1501',
      url: 'https://yourwebsite/example',
      deviceType: 'desktop'
    }

Where:

- **visitTime** represents the time the user remained on the page until the time he/she closed, switched tabs or minimized the page
- **url** represents the exact url address where the user browsed for the given time.
- **deviceType** represents the type of device used by the user browsing the site.
