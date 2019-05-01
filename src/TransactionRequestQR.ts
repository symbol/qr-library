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
import * as QRCode from 'qrcode-generator';
import {
    TransactionMapping,
    Transaction
} from "nem2-sdk";

// internal dependencies
import {
    QRCodeBase,
    QRCodeInterface,
    QRCodeType,
    QRCodeSettings,
} from '../index';

export class TransactionRequestQR extends QRCodeBase implements QRCodeInterface {
    /**
     * Construct a Transaction Request QR Code out of the
     * nem2-sdk Transaction instance.
     * 
     * @param   transaction     {Transaction}
     */
    constructor(/**
                 * The transaction for the request.
                 * @var {Transaction}
                 */
                public readonly transaction: Transaction) {
        super(QRCodeType.TransactionRequest);
    }

    /**
     * The `toJSON()` method should return the JSON
     * representation of the QR Code content.
     *
     * @return {string}
     */
    public toJSON(): string {
        return JSON.stringify(
            this.transaction.toJSON()
        );
    }
}