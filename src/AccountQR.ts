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
    NetworkType,
} from "symbol-sdk";

// internal dependencies
import {
    ExportAccountDataSchema,
    QRCode,
    QRCodeDataSchema,
    QRCodeInterface,
    QRCodeType,
} from '../index';

class AccountQR extends QRCode implements QRCodeInterface {
    /**
     * Construct an Account QR Code out of the
     * symbol-sdk Account or PublicAccount instance.
     *
     * @param   account         {Account}
     * @param   password        {string}
     * @param   networkType     {NetworkType}
     * @param   generationHash  {string}
     */
    constructor(/**
                 * The account to be exported
                 * @var {Account}
                 */
                public readonly account: Account,
                /**
                 * The password for encryption
                 * @var {string}
                 */
                public readonly password: string,
                /**
                 * The network type.
                 * @var {NetworkType}
                 */
                public readonly networkType: NetworkType,
                /**
                 * The network generation hash.
                 * @var {string}
                 */
                public readonly generationHash: string) {
        super(QRCodeType.ExportAccount, networkType, generationHash);
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
    public static fromJSON(
        json: string,
        password: string,
    ): AccountQR {

        // create the QRCode object from JSON
        return ExportAccountDataSchema.parse(json, password);
    }

    /**
     * The `getTypeNumber()` method should return the
     * version number for QR codes of the underlying class.
     *
     * @see https://en.wikipedia.org/wiki/QR_code#Storage
     * @see {QRUtil.MAX_LENGTH}
     * @return {number}
     */
    public getTypeNumber(): number {
        // Type version for AccountQR is Version 15, uses correction level M
        // This type of QR can hold up to 412 binary bytes.
        return 15;
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

export {AccountQR};
