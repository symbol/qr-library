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
    TransactionMapping,
    Account,
    PublicAccount,
    Password
} from "nem2-sdk";
import * as CryptoJS from "crypto-js";

// internal dependencies
import {
    QRCodeInterface,
    QRCodeType,
    AccountQR,
    ContactQR,
    ObjectQR,
    TransactionQR,
    QRService,
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
        networkType: NetworkType = NetworkType.MIJIN_TEST,
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
        networkType: NetworkType = NetworkType.MIJIN_TEST,
        chainId: string = 'E2A9F95E129283EF47B92A62FD748DBA4D32AA718AE6F8AC99C105CFA9F27A31'
    ): TransactionQR {
        return new TransactionQR(transaction, networkType, chainId);
    }

    /**
     * Create a Transaction Request QR Code from a Transaction
     * instance.
     *
     * @param   transaction     {Transaction}
     * @param   networkType     {NetworkType}
     * @param   chainId         {string}
     */
    public static createContact(
        account: Account | PublicAccount,
        networkType: NetworkType = NetworkType.MIJIN_TEST,
        chainId: string = 'E2A9F95E129283EF47B92A62FD748DBA4D32AA718AE6F8AC99C105CFA9F27A31'
    ): ContactQR {
        return new ContactQR(account, networkType, chainId);
    }

    public static createExportAccount(
        account: Account,
        password: Password,
        networkType: NetworkType = NetworkType.MIJIN_TEST,
        chainId: string = 'E2A9F95E129283EF47B92A62FD748DBA4D32AA718AE6F8AC99C105CFA9F27A31',
    ): AccountQR {
        return new AccountQR(account, password, networkType, chainId);
    }

    /**
     * Read JSON Content from QRcode.
     * @param   json    {string}
     */
    static fromJSON(json:string, password?: Password) :any {

        if (json == null || json == '') {
            throw Error('QR json object is missing');
        }

        const jsonObj = JSON.parse(json || '');

        switch(jsonObj.type) {
            case QRCodeType.AddContact: {
                return new ContactQR(jsonObj.data.address, jsonObj.network_id, jsonObj.chainId)
            }
            case QRCodeType.ExportAccount: {
                if (password == null){
                    throw Error('Password are required');
                }

                const qrService: QRService = new QRService();
                const privatekey: string = qrService.AES_PBKF2_decryption(password,jsonObj);

                const account = Account.createFromPrivateKey(privatekey,
                    NetworkType.MIJIN_TEST);

               return new AccountQR(account, password, jsonObj.network_id, jsonObj.chainId)
            }
            case QRCodeType.RequestTransaction: {
                let txMapping: Transaction = TransactionMapping.createFromPayload(jsonObj.data.payload);

                return new TransactionQR(txMapping, jsonObj.network_id, jsonObj.chainId)
            }
            case QRCodeType.RequestCosignature: {
                // Todo: In progress;
                break;
            }
            case QRCodeType.ExportObject: {
                return new ObjectQR(jsonObj.data.object, jsonObj.network_id, jsonObj.chainId);
            }
         }
    }
}
