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
    Account,
    PublicAccount,
    NetworkType,
    Password,
} from "nem2-sdk";

// internal dependencies
import {
    QRCode,
    QRCodeInterface,
    QRCodeType,
    QRCodeSettings,
    EncryptionService,
    EncryptedPayload,
    QRCodeDataSchema,
    ExportAccountDataSchema
} from '../index';

export class AccountQR extends QRCode implements QRCodeInterface {
    /**
     * Construct an Account QR Code out of the
     * nem2-sdk Account or PublicAccount instance.
     *
     * @param   account     {Account}
     * @param   networkType     {NetworkType}
     * @param   chainId         {string}
     */
    constructor(/**
                 * The account to be exported
                 * @var {Account}
                 */
                public readonly account: Account,
                /**
                 * The password for encryption
                 * @var {Password}
                 */
                public readonly password: Password,
                /**
                 * The network type.
                 * @var {NetworkType}
                 */
                public readonly networkType: NetworkType,
                /**
                 * The chain Id.
                 * @var {string}
                 */
                public readonly chainId: string) {
        super(QRCodeType.ExportAccount, networkType, chainId);
    }

    /**
     * Parse a JSON QR code content into a AccountQR
     * object.
     *
     * @param   json        {string}
     * @param   password    {Password}
     * @return  {AccountQR}
     * @throws  {Error}     On empty `json` given.
     * @throws  {Error}     On missing `type` field value.
     * @throws  {Error}     On unrecognized QR code `type` field value.
     */
    static fromJSON(
        json: string,
        password: Password
    ): AccountQR {

        // create the QRCode object from JSON
        return ExportAccountDataSchema.parse(json, password);
    }

    /**
     * The `getTypeNumber()` method should return the
     * version number for QR codes of the underlying class.
     *
     * @see https://en.wikipedia.org/wiki/QR_code#Storage
     * @return {number}
     */
    public getTypeNumber(): number {
        // Type version for ContactQR is Version 10
        // This type of QR can hold up to 174 bytes of data.
        return 20;
    }

    /**
     * The `getSchema()` method should return an instance
     * of a sub-class of QRCodeDataSchema which describes
     * the QR Code data.
     *
     * @return {QRCodeDataSchema}
     */
    public getSchema(): QRCodeDataSchema {
        return new ExportAccountDataSchema();
    }
}
