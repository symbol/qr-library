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

// internal dependencies
import {
    AccountQR,
    EncryptedPayload,
    EncryptionService,
    QRCodeDataSchema,
    QRCodeType,
} from '../../index';

/**
 * Class `ExportAccountDataSchema` describes an export
 * account QR code data schema.
 *
 * @since 0.3.0
 */
class ExportAccountDataSchema extends QRCodeDataSchema {

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
    public getData(qr: AccountQR): any {
        if (qr.encrypted) {
            // we will store a password encrypted copy of the private key
            const encryptedData = EncryptionService.encrypt(qr.accountPrivateKey, qr.password);
            return {
                "ciphertext": encryptedData.ciphertext,
                "salt": encryptedData.salt,
            };
        } else {
            return {
                "privateKey": qr.accountPrivateKey
            }
        }
    }

    /**
     * Parse a JSON QR code content into a AccountQR
     * object.
     *
     * @param   json        {string}
     * @param   password    {string=} Optional password
     * @return  {AccountQR}
     * @throws  {Error}     On empty `json` given.
     * @throws  {Error}     On missing `type` field value.
     * @throws  {Error}     On unrecognized QR code `type` field value.
     * @throws  {Error}     On invalid password.
     */
    public static parse(
        json: string,
        password?: string,
    ): AccountQR {
        if (! json.length) {
            throw new Error('JSON argument cannot be empty.');
        }

        const jsonObj = JSON.parse(json);
        if (!jsonObj.type || jsonObj.type !== QRCodeType.ExportAccount) {
            throw new Error('Invalid type field value for AccountQR.');
        }

        if (!jsonObj.hasOwnProperty('data')) {
            throw new Error('Missing mandatory property for payload.');
        }

        try {
            // decrypt private key
            const privKey = EncryptedPayload.isDataEncrypted(jsonObj.data) ? EncryptionService.decrypt(EncryptedPayload.fromJSON(JSON.stringify(jsonObj.data)), password) : jsonObj.data.privateKey;

            // more content validation
            if (!privKey || (privKey.length !== 64 && privKey.length !== 66)) {
                throw new Error('Invalid private key.');
            }

            const network = jsonObj.network_id;
            const generationHash = jsonObj.chain_id;

            // create account
            return new AccountQR(privKey, network, generationHash, password);
        }
        catch (e) {
            throw new Error('Could not parse account information.');
        }
    }
}

export {ExportAccountDataSchema};
