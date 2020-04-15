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
import {
    Account,
    Password,
} from "symbol-sdk";

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

        // we will store a password encrypted copy of the private key
        const encrypted = EncryptionService.encrypt(qr.account.privateKey, qr.password);

        return {
            "ciphertext": encrypted.ciphertext,
            "salt": encrypted.salt,
        };
    }

    /**
     * Parse a JSON QR code content into a AccountQR
     * object.
     *
     * @param   json        {string}
     * @param   password    {string}
     * @return  {AccountQR}
     * @throws  {Error}     On empty `json` given.
     * @throws  {Error}     On missing `type` field value.
     * @throws  {Error}     On unrecognized QR code `type` field value.
     * @throws  {Error}     On invalid password.
     */
    public static parse(
        json: string,
        password: string,
    ): AccountQR {
        if (! json.length) {
            throw new Error('JSON argument cannot be empty.');
        }

        const jsonObj = JSON.parse(json);
        if (!jsonObj.type || jsonObj.type !== QRCodeType.ExportAccount) {
            throw new Error('Invalid type field value for AccountQR.');
        }

        if (!jsonObj.hasOwnProperty('data')) {
            throw new Error('Missing mandatory property for encrypted payload.');
        }

        try {
            // encrypted payload validation
            const payload = EncryptedPayload.fromJSON(JSON.stringify(jsonObj.data));

            // decrypt private key
            const privKey = EncryptionService.decrypt(payload, password);

            // more content validation
            if (!privKey || (privKey.length !== 64 && privKey.length !== 66)) {
                throw new Error('Invalid encrypted private key.');
            }

            const network = jsonObj.network_id;
            const generationHash = jsonObj.chain_id;

            // create account
            const account = Account.createFromPrivateKey(privKey, network);
            return new AccountQR(account, password, network, generationHash);
        }
        catch (e) {
            throw new Error('Could not parse encrypted account information.');
        }
    }
}

export {ExportAccountDataSchema};
