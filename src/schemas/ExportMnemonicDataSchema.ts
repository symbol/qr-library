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
 * limitations under the License.
 */
import { MnemonicPassPhrase } from 'symbol-hd-wallets';

// internal dependencies
import {
    EncryptedPayload,
    EncryptionService,
    MnemonicQR,
    QRCodeDataSchema,
    QRCodeType,
} from '../../index';

/**
 * Class `ExportMnemonicDataSchema` describes an export
 * account QR code data schema.
 *
 * @since 0.3.2
 */
class ExportMnemonicDataSchema extends QRCodeDataSchema {

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
        if (qr.encrypted) {
            // we will store a password encrypted copy of the mnemonic plain text
            const encryptedData = EncryptionService.encrypt(qr.mnemonicPlainText, qr.password);
            return {
                "ciphertext": encryptedData.ciphertext,
                "salt": encryptedData.salt,
            };
        } else {
            return {
                "plainMnemonic": qr.mnemonicPlainText
            }
        }
    }

    /**
     * Parse a JSON QR code content into a MnemonicQR
     * object.
     *
     * @param   json        {string}
     * @param   password    {string=} Optional password
     * @return  {MnemonicQR}
     * @throws  {Error}     On empty `json` given.
     * @throws  {Error}     On missing `type` field value.
     * @throws  {Error}     On unrecognized QR code `type` field value.
     * @throws  {Error}     On invalid password.
     */
    public static parse(
        json: string,
        password?: string,
    ): MnemonicQR {
        if (! json.length) {
            throw new Error('JSON argument cannot be empty.');
        }

        const jsonObj = JSON.parse(json);
        if (!jsonObj.type || jsonObj.type !== QRCodeType.ExportMnemonic) {
            throw new Error('Invalid type field value for MnemonicQR.');
        }

        if (!jsonObj.hasOwnProperty('data')) {
            throw new Error('Missing mandatory property for encrypted payload.');
        }

        try {
            // decrypt mnemonic pass phrase
            const plainTxt = EncryptedPayload.isDataEncrypted(jsonObj.data) ? EncryptionService.decrypt(EncryptedPayload.fromJSON(JSON.stringify(jsonObj.data)), password) : jsonObj.data.plainMnemonic;
            if (!plainTxt) {
                throw new Error('Mnemonic pass phrase is not valid!')
            }
            const network  = jsonObj.network_id;
            const generationHash = jsonObj.chain_id;

            return new MnemonicQR(plainTxt, network, generationHash, password);
        }
        catch (e) {
            throw new Error('Could not parse mnemonic pass phrase.');
        }
    }
}

export {ExportMnemonicDataSchema};
