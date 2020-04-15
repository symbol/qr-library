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
    AggregateTransaction,
    NetworkType,
} from 'symbol-sdk';

// internal dependencies
import {
    QRCodeDataSchema,
    QRCodeInterface,
    QRCodeType,
    RequestCosignatureDataSchema,
    TransactionQR,
} from '../index';

class CosignatureQR extends TransactionQR implements QRCodeInterface {
    /**
     * Construct a Transaction Request QR Code out of the
     * symbol-sdk Transaction instance.
     *
     * @param   transaction     {Transaction}
     * @param   networkType     {NetworkType}
     * @param   generationHash         {string}
     */
    constructor(/**
                 * The transaction for the request.
                 * @var {AggregateTransaction}
                 */
                public readonly transaction: AggregateTransaction,
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
        super(transaction, networkType, generationHash, QRCodeType.RequestCosignature);
    }

    /**
     * Parse a JSON QR code content into a CosignatureQR
     * object.
     *
     * @param   json        {string}
     * @return  {CosignatureQR}
     * @throws  {Error}     On empty `json` given.
     * @throws  {Error}     On missing `type` field value.
     * @throws  {Error}     On unrecognized QR code `type` field value.
     */
    public static fromJSON(
        json: string,
    ): CosignatureQR {

        // create the QRCode object from JSON
        return RequestCosignatureDataSchema.parse(json);
    }

    /**
     * The `getTypeNumber()` method should return the
     * version number for QR codes of the underlying class.
     *
     * @see https://en.wikipedia.org/wiki/QR_code#Storage
     * @return {number}
     */
    public getTypeNumber(): number {
        // Type version for ContactQR is Version 40, uses correction level L
        // This type of QR can hold up to 2953 bytes of data.
        return 40;
    }

    /**
     * The `getSchema()` method should return an instance
     * of a sub-class of QRCodeDataSchema which describes
     * the QR Code data.
     *
     * @return {QRCodeDataSchema}
     */
    public getSchema(): QRCodeDataSchema {
        return new RequestCosignatureDataSchema();
    }
}

export {CosignatureQR};
