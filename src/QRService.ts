/*
 * Copyright (c) 2019 NEM Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License ");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
    Password,
} from "nem2-sdk";
import {convert,nacl_catapult} from 'nem2-library';
import * as CryptoJS from "crypto-js";

export class QRService {

    /**
     * AES_PBKF2_encryption will encrypt privateKey with provided password.
     * @param password {Password}
     * @param privateKey {strinf}
     */
    public AES_PBKF2_encryption(password: Password, privateKey: string): any {
        const salt = CryptoJS.lib.WordArray.random(256 / 8);
        const key = CryptoJS.PBKDF2(password.value, salt, {
          keySize: 256 / 32,
          iterations: 2000,
        });

        const hex = convert.uint8ToHex(nacl_catapult.randomBytes(16));

        const encIv = {
            iv: CryptoJS.enc.Hex.parse(hex),
          };

        const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Hex.parse(privateKey), key, encIv);

        return {
          encrypted: hex + encrypted.toString(),
          salt: salt.toString(),
        };
    }

    /**
     * AES_PBKF2_decryption will decrypt privateKey with provided password
     * @param password
     * @param json
     */
    public AES_PBKF2_decryption(password: Password, json: any): string {
        const encryptedData = json;
        const salt = CryptoJS.enc.Hex.parse(encryptedData.data.salt);
        const iv = CryptoJS.enc.Hex.parse(encryptedData.data.priv_key.substring(0, 32));
        const encrypted: string = encryptedData.data.priv_key.substring(32, 96);

        //generate key
        const key = CryptoJS.PBKDF2(password.value, salt, {
          keySize: 256 / 32,
          iterations: 2000,
        });

        let encIv = {
            iv: iv
        };

        let decrypt =  CryptoJS.enc.Hex.stringify(CryptoJS.AES.decrypt(encrypted, key, encIv));

        if (decrypt === "" || (decrypt.length != 64 && decrypt.length != 66)) throw new Error("invalid password");
        return decrypt;
    }
}