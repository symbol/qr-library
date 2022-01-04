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
    ITransaction,
    QRCodeDataSchema,
    QRCodeType,
    TransactionQR,
} from '../../index';
import {CosignatureSignedTransactionQR} from "../CosignatureSignedTransactionQR";

/**
 * Class `SignedTransactionDataSchema` describes a transaction
 * request QR code data schema.
 *
 * @since 0.3.0
 */
class CosignatureSignedTransactionDataSchema extends QRCodeDataSchema {

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
    public getData(qr: CosignatureSignedTransactionQR): any {
        return {
            "payload": qr.singedTransaction,
        };
    }

    /**
     * Parse a JSON QR code content into a CosignatureSignedTransactionQR
     * object.
     *
     * @param   json    {string}
     * @param   transactionCreateFromPayload the transaction parser that creates a transaction from a binary payload.
     * @return  {TransactionQR}
     * @throws  {Error}     On empty `json` given.
     * @throws  {Error}     On missing `type` field value.
     * @throws  {Error}     On unrecognized QR code `type` field value.
     */
    public static parse(
        json: string,
        transactionCreateFromPayload: (payload: string) => any
    ): CosignatureSignedTransactionQR {
        if (! json.length) {
            throw Error('JSON argument cannot be empty.');
        }

        const jsonObj = JSON.parse(json);
        if (!jsonObj.type || jsonObj.type !== QRCodeType.CosignatureSignedTransaction) {
            throw Error('Invalid type field value for CosignatureSignedTransactionQR.');
        }

        // read contact data
        const transaction = transactionCreateFromPayload(jsonObj.data.payload);
        const network = jsonObj.network_id;
        const generationHash = jsonObj.chain_id;

        return new CosignatureSignedTransactionQR(transaction, network, generationHash);
    }
}

export {CosignatureSignedTransactionDataSchema};
