import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

export class CommonService {
    constructor() { }
    //Tim kiem SDT 099*xxx, *xxx, xx***

  async encrypt(textToEncrypt: string) {
    const iv = randomBytes(16);
    const password = 'Password used to generate key';

    // The key length is dependent on the algorithm.
    // In this case for aes256, it is 32 bytes.
    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes256', key, iv);
    console.log(key.toString("hex"))
    console.log(iv.toString("hex"))
    const encryptedText = Buffer.concat([
      cipher.update(textToEncrypt),
      cipher.final(),
    ]);
    return {
      encrypted: encryptedText.toString("hex"),
      pub: iv.toString("hex"),
    }
  }

  async decrypt(encryptedText: string, iv: string, priv: string) {
    const password = 'Password used to generate key';
    const key = Buffer.from(priv, "hex")
 
    const decipher = createDecipheriv('aes256', key, Buffer.from(iv, "hex"));
    const decryptedText = Buffer.concat([
      decipher.update(Buffer.from(encryptedText, "hex")),
      decipher.final(),
    ]);
    return {decrypted: decryptedText.toString()}
  }

}