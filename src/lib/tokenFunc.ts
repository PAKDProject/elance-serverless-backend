import * as CryptoJS from 'crypto-js'

export const Encode = async (value: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        try {
            const key = process.env.CIP_KEY

            let encrypted = CryptoJS.AES.encrypt(value, key)
            resolve(encrypted.toString())
        } catch (error) {
            reject(error)
        }
    })
}

export const Decode = async (value: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        try {
            const key = process.env.CIP_KEY

            let decrypted = CryptoJS.AES.decrypt(value, key)
            resolve(decrypted.toString(CryptoJS.enc.Utf8))
        } catch (error) {
            reject(error)
        }
    })
}