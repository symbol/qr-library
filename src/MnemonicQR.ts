/**
 * (C) Symbol Contributors 2022
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
    ExportMnemonicDataSchema,
    QRCode,
    QRCodeDataSchema,
    QRCodeInterface,
    QRCodeType,
} from '../index';
import {INetworkType} from "./sdk";

class MnemonicQR extends QRCode implements QRCodeInterface {
    /**
     * Construct a Mnemonic Export QR Code out of the
     * MnemonicPassPhrase and Password instances.
     *
     * @param   mnemonic        {string}
     * @param   password        {Password}
     * @param   networkType     {NetworkType}
     * @param   generationHash  {string}
     */
    constructor(/**
                 * The mnemonic pass phrase to be exported
                 */
                public readonly mnemonicPlainText: string,
                /**
                 * The network type.
                 */
                public readonly networkType: INetworkType,
                /**
                 * The network generation hash.
                 */
                public readonly generationHash: string,
                /**
                 * Optional password for encryption when not provided means non-password-protected
                 * @var {string}
                 */
                public readonly password?: string) {
        super(QRCodeType.ExportMnemonic, networkType, generationHash, password !== undefined);
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
     */
    public static fromJSON(
        json: string,
        password?: string,
    ): MnemonicQR {
        // create the QRCode object from JSON
        return ExportMnemonicDataSchema.parse(json, password);
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
        // Type version for MnemonicQR is Version 20, uses correction level M
        // This type of QR can hold up to 666 binary bytes.
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
        return new ExportMnemonicDataSchema();
    }
}

export {MnemonicQR};
