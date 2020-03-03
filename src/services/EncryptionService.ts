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
import * as CryptoJS from "crypto-js";
import {
    Password,
} from "symbol-sdk";

// internal dependencies
import {
    EncryptedPayload,
} from '../../index';

/**
 * Class `EncryptionService` describes a high level service
 * for encryption/decryption of data.
 *
 * Implemented algorithms for encryption/decryption include:
 * - AES with PBKDF2 (Password-Based Key Derivation Function)
 *
 * @since 0.3.0
 */
class EncryptionService {

    /**
     * The `encrypt` method will encrypt given `data` raw string
     * with given `password` password.
     *
     * First we generate a random salt of 32 bytes, then we iterate
     * 2000 times with PBKDF2 and encrypt with AES.
     *
     * @param password {string}
     * @param data {string}
     */
    public static encrypt(
        data: string,
        password: string,
    ): EncryptedPayload {

        // create random salt (32 bytes)
        const salt = CryptoJS.lib.WordArray.random(32);

        // derive key of 8 bytes with 2000 iterations of PBKDF2
        const key = CryptoJS.PBKDF2(password, salt, {
          keySize: 8,
          iterations: 2000,
        });

        // create encryption input vector of 16 bytes (iv)
        const iv = CryptoJS.lib.WordArray.random(16);

        // encrypt with AES
        const encrypted = CryptoJS.AES.encrypt(data, key,  {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC,
        });

        // create our `EncryptedPayload` (16 bytes iv as hex || cipher text)
        const ciphertext = iv.toString() + encrypted.toString();
        const used_salt = CryptoJS.enc.Hex.stringify(salt);

        return new EncryptedPayload(ciphertext, used_salt);
    }

    /**
     * AES_PBKF2_decryption will decrypt privateKey with provided password
     * @param password
     * @param json
     */
    public static decrypt(
        payloadOrJson: EncryptedPayload | string,
        password: string,
    ): string {

        let payload: EncryptedPayload;

        // parse input if necessary
        if (payloadOrJson instanceof EncryptedPayload) {
            payload = payloadOrJson;
        }
        else {
            payload = EncryptedPayload.fromJSON(payloadOrJson);
        }

        // read payload
        const salt = CryptoJS.enc.Hex.parse(payload.salt);
        const priv = payload.ciphertext;

        // read encryption configuration
        const iv: string = CryptoJS.enc.Hex.parse(priv.substr(0, 32));
        const cipher: string = priv.substr(32);

        // re-generate key (PBKDF2)
        const key = CryptoJS.PBKDF2(password, salt, {
          keySize: 8,
          iterations: 2000,
        });

        // decrypt and return
        const decrypted = CryptoJS.AES.decrypt(cipher, key, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC,
        });

        return decrypted.toString(CryptoJS.enc.Utf8);
    }
}

export {EncryptionService};
