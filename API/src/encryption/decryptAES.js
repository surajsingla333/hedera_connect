import AES from 'crypto-js/aes';
import enc from 'crypto-js/enc-latin1';


export const decryptKeys = (val, key) => {

  console.log("IN AES DECRYPT Val: ", val);
  console.log("IN AES DECRYPT Key: ", key);

  let decrypted = AES.decrypt(val.toString(), key).toString(enc);

  console.log("DECRYPT2\n", decrypted);
  console.log("\nDECRYPT2\n", decrypted.toString());

  return(decrypted.toString());

}