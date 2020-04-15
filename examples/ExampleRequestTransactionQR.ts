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
} from 'symbol-sdk';

// internal dependencies
import {
    TransactionQR,
    QRCodeSettings,
    QRCodeType,
} from '../index';
import {Example} from './Example';

class ExampleRequestTransactionQR extends Example {

    /**
     * The `execute()` method should run the underlying
     * example business flow.
     *
     * This example uses an unsigned transfer transaction
     * with following details:
     *    - Recipient: namespaceId "nemtech"
     *    - Mosaics: 1 mosaic with namespaceId "cat.currency" and absolute amount 1
     *    - Message: Empty
     *
     * @return {number}
     */
    public async execute(): Promise<number> {

        const unsignedTransferInfo = {
            v: 3,
            type: QRCodeType.RequestTransaction,
            network_id: NetworkType.MIJIN_TEST,
            chain_id: '9F1979BEBA29C47E59B40393ABB516801A353CFC0C18BC241FEDE41939C907E7',
            data: {
                payload: 'A500000000000000000000000000000000000000000000000000000000000000'
                       + '0000000000000000000000000000000000000000000000000000000000000000'
                       + '0000000000000000000000000000000000000000000000000000000000000000'
                       + '000000000190544100000000000000008CDC693819000000912C7BC6007CB8AC'
                       + 'B8000000000000000000000000000000000100010044B262C46CEABB85010000'
                       + '0000000000'
            }
        };

        // create QR Code with JSON content
        const transactionQR = TransactionQR.fromJSON(
            JSON.stringify(unsignedTransferInfo),
        );

        console.log("TransactionQR JSON: ", transactionQR.toJSON());
        console.log("TransactionQR BASE64: ", await transactionQR.toBase64().toPromise());
        console.log("TransactionQR OBJECT: ", await transactionQR.toString(new QRCodeSettings('M', 100)).toPromise());
        console.log("");
        return this.resolve(0);
    }
}

export {ExampleRequestTransactionQR};
