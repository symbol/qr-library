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
    TransactionMapping,
    Transaction,
} from "nem2-sdk";

// internal dependencies
import {
    QRCode,
    QRCodeInterface,
    QRCodeType,
    QRCodeSettings,
    QRCodeDataSchema,
    RequestTransactionDataSchema
} from '../index';

export class TransactionQR extends QRCode implements QRCodeInterface {
    /**
     * Construct a Transaction Request QR Code out of the
     * nem2-sdk Transaction instance.
     *
     * @param   transaction     {Transaction}
     * @param   networkType     {NetworkType}
     * @param   generationHash         {string}
     */
    constructor(/**
                 * The transaction for the request.
                 * @var {Transaction}
                 */
                public readonly transaction: Transaction,
                /**
                 * The network type.
                 * @var {NetworkType}
                 */
                public readonly networkType: NetworkType,
                /**
                 * The chain Id.
                 * @var {string}
                 */
                public readonly generationHash: string,
                /**
                 * The QR Code Type
                 * 
                 * @var {QRCodeType} 
                 */
                public readonly type: QRCodeType = QRCodeType.RequestTransaction) {
        super(type, networkType, generationHash);
    }

    /**
     * Parse a JSON QR code content into a TransactionQR
     * object.
     *
     * @param   json        {string}
     * @return  {TransactionQR}
     * @throws  {Error}     On empty `json` given.
     * @throws  {Error}     On missing `type` field value.
     * @throws  {Error}     On unrecognized QR code `type` field value.
     */
    static fromJSON(
        json: string
    ): TransactionQR {

        // create the QRCode object from JSON
        return RequestTransactionDataSchema.parse(json);
    }

    /**
     * The `getTypeNumber()` method should return the
     * version number for QR codes of the underlying class.
     *
     * @see https://en.wikipedia.org/wiki/QR_code#Storage
     * @return {number}
     */
    public getTypeNumber(): number {
        // Type version for ContactQR is Version 40
        // This type of QR can hold up to 1264 bytes of data.
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
        return new RequestTransactionDataSchema();
    }
}
