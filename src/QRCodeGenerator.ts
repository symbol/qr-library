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
    Transaction,
} from "nem2-sdk";
import {QRCode} from 'qrcode-generator-ts';

// internal dependencies
import {
    QRCodeInterface,
    AccountQR,
    ContactQR,
    ObjectQR,
    TransactionQR,
} from '../index';

/**
 * Class `QRCodeGenerator` describes a NIP-7 compliant QR Code
 * generator (factory).
 * 
 * @since 0.2.0
 */
export class QRCodeGenerator {

    /**
     * Factory/Singleton pattern, constructor is private.
     *
     * @access private
     */
    private constructor() {}

    /**
     * Create a JSON object QR Code from a JSON object.
     *
     * @param   object          {Object}
     * @param   networkType     {NetworkType}
     * @param   chainId         {string}
     */
    public static createExportObject(
        object: Object,
        networkType: NetworkType = NetworkType.TEST_NET,
        chainId: string = 'E2A9F95E129283EF47B92A62FD748DBA4D32AA718AE6F8AC99C105CFA9F27A31'
    ): ObjectQR {
        return new ObjectQR(object, networkType, chainId);
    }

    /**
     * Create a Transaction Request QR Code from a Transaction
     * instance.
     *
     * @param   transaction     {Transaction}
     * @param   networkType     {NetworkType}
     * @param   chainId         {string}
     */
    public static createTransactionRequest(
        transaction: Transaction,
        networkType: NetworkType = NetworkType.TEST_NET,
        chainId: string = 'E2A9F95E129283EF47B92A62FD748DBA4D32AA718AE6F8AC99C105CFA9F27A31'
    ): TransactionQR {
        return new TransactionQR(transaction, networkType, chainId);
    }
};