import {randomBytes, pbkdf2Sync} from 'crypto';

export const genHash = (p) => {

  console.log("IN GENHASH", p);

  const passWord = p.toString();

  let res = [];

  console.log("PASSWord", passWord);
  const salt = randomBytes(16).toString('hex');

  console.log("salt", salt);

  const hash = pbkdf2Sync(passWord, salt, 1000, 64, `sha512`).toString(`hex`);

  res.push(hash);
  res.push(salt);

  return res;
}

export const checkHash = (p, s) => {
  console.log("IN CHECKHASH BCRYPT DECRYPT");
  console.log("SALT DEB", s);
  console.log("PAss DEB", p);
  let hash2 = pbkdf2Sync(p, s, 1000, 64, `sha512`).toString(`hex`);

  return hash2.toString();
}
