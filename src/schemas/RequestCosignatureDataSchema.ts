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
    TransactionMapping,
} from "symbol-sdk";

// internal dependencies
import {
    CosignatureQR,
    QRCodeType,
    RequestTransactionDataSchema,
} from '../../index';

/**
 * Class `RequestCosignatureDataSchema` describes a transaction
 * cosignature request QR code data schema.
 *
 * @since 0.3.0
 */
class RequestCosignatureDataSchema extends RequestTransactionDataSchema {

    constructor() {
        super();
    }

    /**
     * Parse a JSON QR code content into a CosignatureQR
     * object.
     *
     * @param   json    {string}
     * @return  {CosignatureQR}
     * @throws  {Error}     On empty `json` given.
     * @throws  {Error}     On missing `type` field value.
     * @throws  {Error}     On unrecognized QR code `type` field value.
     */
    public static parse(
        json: string,
    ): CosignatureQR {
        if (! json.length) {
            throw Error('JSON argument cannot be empty.');
        }

        const jsonObj = JSON.parse(json);
        if (!jsonObj.type || jsonObj.type !== QRCodeType.RequestCosignature) {
            throw Error('Invalid type field value for CosignatureQR.');
        }

        // read contact data
        const transaction = TransactionMapping.createFromPayload(jsonObj.data.payload);
        const network = jsonObj.network_id;
        const generationHash = jsonObj.chain_id;

        return new CosignatureQR(transaction as AggregateTransaction, network, generationHash);
    }
}

export {RequestCosignatureDataSchema};
