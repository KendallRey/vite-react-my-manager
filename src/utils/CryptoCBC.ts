import CryptoJS from "crypto-js"

export const ENCRYPT_SECRET = process.env.VITE_APP_ENCRYPT_SECRET
export const ENCRYPT_IV = process.env.VITE_APP_ENCRYPT_IV

type CryptoCBCType = {
    key? : string
    iv? : string
}

export class CryptoCBC {
    
    private key;
    private iv;

    constructor (props? : CryptoCBCType){
        if(ENCRYPT_SECRET)
            this.key = CryptoJS.enc.Utf8.parse(props?.key ?? ENCRYPT_SECRET)
        else
            this.key = undefined
        if(ENCRYPT_IV)
            this.iv = CryptoJS.enc.Utf8.parse(props?.iv ?? ENCRYPT_IV)
        else
            this.iv = undefined
        
    }

    isValid(){
        if(!this.key || !this.iv)
            return false
        return true
    }

    encrypt(data : string){
        if(!this.key || !this.iv)
            return null
        const encrypted = CryptoJS.AES.encrypt(data, this.key, { iv: this.iv, mode: CryptoJS.mode.CBC})
        return encrypted
    }

    decrypt(encrypted: string){
        if(!this.key || !this.iv)
            return null
        const decrypted = CryptoJS.AES.decrypt(encrypted, this.key, {iv: this.iv, mode:CryptoJS.mode.CBC});
        return decrypted.toString(CryptoJS.enc.Utf8)
    }
}