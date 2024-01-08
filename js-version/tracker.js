import CryptoJS from "crypto-js";

let initTime = Date.now();
let url = window.location.href

/**
 * Returns the device type based on the user agent.
 * @returns The device type ('desktop', 'mobile', or 'tablet') or null if the user agent is not available in the browser version.
 */
const getDeviceType = () => {
    const ua = navigator.userAgent
    if(ua){
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return "tablet"
        if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
            return "mobile"
        }
        return "desktop"
    } else {
        console.error('Unable to load user agent in the browser')
        return null
    }
}

/**
 * Encrypts the given track data using AES encryption and crypto-js library.
 * It also uses an encryption key and an initialization vector sepecified in the environment variables.
 * @param {Object} dataToEncrypt The data to encrypt of the type TrackData.
 * @returns The encrypted data as a string.
 */
const encryptData = (dataToEncrypt) => {
    const jsonString = JSON.stringify(dataToEncrypt);
    const encryptionKey = process.env.TRACKER_ENCRYPTION_KEY
    const initializationVector = process.env.TRACKER_INITIALIZATION_VECTOR
    const encrypted = CryptoJS.AES.encrypt(jsonString, encryptionKey, { initializationVector: CryptoJS.enc.Hex.parse(initializationVector) });
    const encryptedResult = encrypted.toString();

    return encryptedResult
}

/**
 * Sends trackig data to the backend server using the sendBeacon method of the navigator object.
 * @param {string} url The url of the previous page.
 */
const sendData = (url) => {
    //Represents the tracked data for a visit.
    const trackData = { 
        visitTime: Date.now() - initTime,
        url,
        deviceType: getDeviceType(),
        os: navigator.userAgentData.platform || '',
        browser: navigator.userAgentData.brands[2].brand || ''
    }

    const trackDataEncrypted = encryptData(trackData)

    navigator.sendBeacon(process.env.TRACKER_ENDPOINT, JSON.stringify(trackDataEncrypted))
    
    initTime = Date.now()
}

//Check if the document is hidden and execute the sendData function if it is.
const handleVisibilityChange = () => {
    if(document.visibilityState === 'hidden') sendData(url)
} 

/**
 * Adds an event listener to the document to check if the visibility state of the document changes. 
 * Use the handleVisibilityChange function to handle the change.
 */
document.addEventListener('visibilitychange', handleVisibilityChange)

//Adds an event listener to the document to check if the url of the page changes.
document.body.addEventListener('click', () => {
    requestAnimationFrame(()=>{
        if(url!==window.location.href){
          sendData(url)
            url = window.location.href
        }
      });
}, true)
