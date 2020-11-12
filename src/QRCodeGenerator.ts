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

// internal dependencies
import {
    AccountQR,
    AddressQR,
    ContactQR,
    CosignatureQR,
    MnemonicQR,
    ObjectQR,
    QRCode,
    QRCodeType,
    TransactionQR,
} from '../index';
import { INetworkType, ITransaction } from "./sdk";

/**
 * Class `QRCodeGenerator` describes a NIP-7 compliant QR Code
 * generator (factory).
 *
 * @since 0.2.0
 */
class QRCodeGenerator {

    /**
     * Factory/Singleton pattern, constructor is private.
     *
     * @access private
     */
    private constructor() {}

    /**
     * Create a JSON object QR Code from a JSON object.
     *
     * @see {ObjectQR}
     * @param   object          {Object}
     * @param   networkType     {NetworkType}
     * @param   generationHash         {string}
     */
    public static createExportObject(
        object: object,
        networkType: INetworkType,
        generationHash: string,
    ): ObjectQR {
        return new ObjectQR(object, networkType, generationHash);
    }

    /**
     * Create an Address QR Code from a contact name
     * and address.
     *
     * @see {AddressQR}
     * @param   name the name
     * @param   address     the account address
     * @param   networkType     {NetworkType}
     * @param   generationHash         {string}
     */
    public static createExportAddress(
        name: string,
        address: string,
        networkType: INetworkType,
        generationHash: string,
    ): AddressQR {
        return new AddressQR(name, address, networkType, generationHash);
    }

    /**
     * Create a Contact QR Code from a contact name
     * and account.
     *
     * @see {ContactQR}
     * @param   name the name
     * @param   accountPublicKey     the account public key
     * @param   networkType     {NetworkType}
     * @param   generationHash         {string}
     */
    public static createAddContact(
        name: string,
        accountPublicKey: string,
        networkType: INetworkType,
        generationHash: string,
    ): ContactQR {
        return new ContactQR(name, accountPublicKey, networkType, generationHash);
    }

    /**
     * Create an Account Export QR Code from an Account
     * instance, encrypted with given password.
     *
     * @see {AccountQR}
     * @param   accountPrivateKey    the account private key.
     * @param   networkType     {NetworkType}
     * @param   generationHash         {string}
     * @param   password        {string=}
     */
    public static createExportAccount(
        accountPrivateKey: string,
        networkType: INetworkType,
        generationHash: string,
        password?: string,
    ): AccountQR {
        return new AccountQR(accountPrivateKey, networkType, generationHash, password);
    }

    /**
     * Create a Transaction Request QR Code from a Transaction
     * instance.
     *
     * @see {TransactionQR}
     * @param   transaction     {Transaction}
     * @param   networkType     {NetworkType}
     * @param   generationHash         {string}
     */
    public static createTransactionRequest(
        transaction: ITransaction,
        networkType: INetworkType,
        generationHash: string,
    ): TransactionQR {
        return new TransactionQR(transaction, networkType, generationHash);
    }

    /**
     * Create a Mnemonic Export QR Code from a MnemonicPassPhrase
     * instance, encrypted with given password.
     *
     * @see {MnemonicQR}
     * @param   networkType     {NetworkType}
     * @param   generationHash         {string}
     * @param   password        {string=}
     */
    public static createExportMnemonic(
        mnemonicPlainText: string,
        networkType: INetworkType,
        generationHash: string,
        password: string,
    ): MnemonicQR {
        return new MnemonicQR(mnemonicPlainText, networkType, generationHash, password);
    }

    /**
     * Parse a JSON QR code content into a sub-class
     * of QRCode.
     *
     * @param   json    {string}
     * @param   transactionCreateFromPayload the transaction factory to create ITransaction from a binary payload if the qr is a transaction based one.
     * @param   password to decrypt private keys.
     * @return  {QRCode}
     * @throws  {Error}     On empty `json` given.
     * @throws  {Error}     On missing `type` field value.
     * @throws  {Error}     On unrecognized QR code `type` field value.
     */
    public static fromJSON(
        json: string,
        transactionCreateFromPayload: (payload: string) => ITransaction,
        password?: string,
    ): QRCode {

        if (! json.length) {
            throw new Error('JSON argument cannot be empty.');
        }

        let jsonObject: any;
        try {
            jsonObject = JSON.parse(json);
            if (!jsonObject.type) {
                throw new Error('Missing mandatory field with name "type".');
            }
        }
        catch (e) {
            // Invalid JSON provided, forward error
            throw new Error(e);
        }

        // We will use the `fromJSON` static implementation
        // of specialized QRCode classes (child classes).
        // An error will be thrown if the QRCodeType is not
        // recognized or invalid.

        switch (jsonObject.type) {

            // create a ContactQR from JSON
            case QRCodeType.AddContact:
                return ContactQR.fromJSON(json);

            // create a AddressQR from JSON
            case QRCodeType.ExportAddress:
                return AddressQR.fromJSON(json);

            // create an AccountQR from JSON
            case QRCodeType.ExportAccount:
                return AccountQR.fromJSON(json, password);

            // create a ObjectQR from JSON
            case QRCodeType.ExportObject:
                return ObjectQR.fromJSON(json);

            // create a CosignatureQR from JSON
            case QRCodeType.RequestCosignature:
                return CosignatureQR.fromJSON(json, transactionCreateFromPayload);

            // create a TransactionQR from JSON
            case QRCodeType.RequestTransaction:
                return TransactionQR.fromJSON(json, transactionCreateFromPayload);

            // create an MnemonicQR from JSON
            case QRCodeType.ExportMnemonic:
                return MnemonicQR.fromJSON(json, password);

            default:
                break;
            }

            throw new Error("Unrecognized QR Code 'type': '" + jsonObject.type + "'.");
    }
}

export {QRCodeGenerator};
