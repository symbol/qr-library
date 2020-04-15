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
    NetworkType,
} from "symbol-sdk";

// internal dependencies
import {
    ExportObjectDataSchema,
    QRCode,
    QRCodeDataSchema,
    QRCodeInterface,
    QRCodeType,
} from '../index';

class ObjectQR extends QRCode implements QRCodeInterface {
    /**
     * Construct a Object QR Code out of the
     * JSON object.
     *
     * @param   object          {Object}
     * @param   networkType     {NetworkType}
     * @param   generationHash         {string}
     */
    constructor(/**
                 * The object to display
                 * @var {Object}
                 */
                public readonly object: object,
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
        super(QRCodeType.ExportObject, networkType, generationHash);
    }

    /**
     * Parse a JSON QR code content into a ObjectQR
     * object.
     *
     * @param   json        {string}
     * @return  {ObjectQR}
     * @throws  {Error}     On empty `json` given.
     * @throws  {Error}     On missing `type` field value.
     * @throws  {Error}     On unrecognized QR code `type` field value.
     */
    public static fromJSON(
        json: string,
    ): ObjectQR {

        // create the QRCode object from JSON
        return ExportObjectDataSchema.parse(json);
    }

    /**
     * The `getTypeNumber()` method should return the
     * version number for QR codes of the underlying class.
     *
     * @see https://en.wikipedia.org/wiki/QR_code#Storage
     * @return {number}
     */
    public getTypeNumber(): number {
        // Type version for ContactQR is Version 10, uses correction level M
        // This type of QR can hold up to 213 bytes of data.
        return 10;
    }

    /**
     * The `getSchema()` method should return an instance
     * of a sub-class of QRCodeDataSchema which describes
     * the QR Code data.
     *
     * @return {QRCodeDataSchema}
     */
    public getSchema(): QRCodeDataSchema {
        return new ExportObjectDataSchema();
    }
}

export {ObjectQR};
