const express = require("express");
const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
const crypto = require('crypto');
require('dotenv').config({path:'./config.env'});

const ENCRYPTION_KEY = process.env.Encryption_key; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16


const PORT = process.env.PORT || 3001;

function encrypt(text) {
  let iv = crypto.randomBytes(IV_LENGTH);
  console.log(process.env.ENCRYPTION_KEY);
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
 
  encrypted = Buffer.concat([encrypted, cipher.final()]);
 
  return iv.toString('hex') + ':' + encrypted.toString('hex');
 }

 function decrypt(text) {
  let textParts = text.split(':');
  let iv = Buffer.from(textParts.shift(), 'hex');
  let encryptedText = Buffer.from(textParts.join(':'), 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);
 
  decrypted = Buffer.concat([decrypted, decipher.final()]);
 
  return decrypted.toString();
 }

  //encryption api call
  app.post('/api/encrypt',(req,res) =>{
      console.dir(req.body.message);
      let msg=req.body.message;
     let encp=encrypt(msg);
     res.json({message:encp});
  });
  //decryption api call
  app.post('/api/decrypt',(req,res) =>{
    console.dir(req.body.message);
    let msg=req.body.message;
   let decp=decrypt(msg);
   res.json({message:decp});
});
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });