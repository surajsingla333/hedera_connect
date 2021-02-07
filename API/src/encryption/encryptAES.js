import AES from 'crypto-js/aes';


export const encryptKeys = (val, key) => {

    console.log("IN AES ENCRYPT VAL", val);
    console.log("IN AES ENCRYPT Key", key);
    let r = AES.encrypt(val, key);
    console.log("ENCRYPTED", r);
    console.log("LINK", 'data:application/octet-stream,' + r);

    return(r.toString());

}