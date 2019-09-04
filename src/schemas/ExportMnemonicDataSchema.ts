/**
 * Copyright 2019 NEM
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 *limitations under the License.
 */
import {
    NetworkType,
    Password,
} from "nem2-sdk";
import { MnemonicPassPhrase } from 'nem2-hd-wallets';

// internal dependencies
import {
    QRCodeDataSchema,
    QRCode,
    QRCodeType,
    MnemonicQR,
    EncryptionService,
    EncryptedPayload,
} from '../../index';

/**
 * Class `ExportMnemonicDataSchema` describes an export
 * account QR code data schema.
 *
 * @since 0.3.2
 */
export class ExportMnemonicDataSchema extends QRCodeDataSchema {

    constructor() {
        super();
    }

    /**
     * The `getData()` method returns an object
     * that will be stored in the `data` field of
     * the underlying QR Code JSON content.
     *
     * @return {any}
     */
    public getData(qr: MnemonicQR): any {

        // we will store a password encrypted copy of the private key
        const encrypted = EncryptionService.encrypt(qr.mnemonic.plain, qr.password);

        return {
            "ciphertext": encrypted.ciphertext,
            "salt": encrypted.salt,
        };
    }

    /**
     * Parse a JSON QR code content into a MnemonicQR
     * object.
     *
     * @param   json        {string}
     * @param   password    {Password}
     * @return  {MnemonicQR}
     * @throws  {Error}     On empty `json` given.
     * @throws  {Error}     On missing `type` field value.
     * @throws  {Error}     On unrecognized QR code `type` field value.
     */
    static parse(
        json: string,
        password: Password
    ): MnemonicQR {
        if (! json.length) {
            throw Error('JSON argument cannot be empty.');
        }

        const jsonObj = JSON.parse(json);
        if (!jsonObj.type || jsonObj.type !== QRCodeType.ExportMnemonic) {
            throw Error('Invalid type field value for MnemonicQR.');
        }

        // decrypt mnemonic pass phrase
        const payload  = new EncryptedPayload(jsonObj.data.ciphertext, jsonObj.data.salt);
        const plainTxt = EncryptionService.decrypt(payload, password);
        const network  = jsonObj.network_id;
        const generationHash = jsonObj.chain_id;

        // create mnemonic
        const mnemonic = new MnemonicPassPhrase(plainTxt);
        return new MnemonicQR(mnemonic, password, network, generationHash);
    }
}
