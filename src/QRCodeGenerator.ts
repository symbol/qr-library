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
import { MnemonicPassPhrase } from 'symbol-hd-wallets';
import {
    Account,
    NetworkType,
    PublicAccount,
    Transaction,
} from "symbol-sdk";

// internal dependencies
import {
    AccountQR,
    ContactQR,
    CosignatureQR,
    MnemonicQR,
    ObjectQR,
    QRCode,
    QRCodeType,
    TransactionQR,
} from '../index';

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
        networkType: NetworkType = NetworkType.MIJIN_TEST,
        generationHash: string = '17FA4747F5014B50413CCF968749604D728D7065DC504291EEE556899A534CBB',
    ): ObjectQR {
        return new ObjectQR(object, networkType, generationHash);
    }

    /**
     * Create a Contact QR Code from a contact name
     * and account.
     *
     * @see {ContactQR}
     * @param   transaction     {Transaction}
     * @param   networkType     {NetworkType}
     * @param   generationHash         {string}
     */
    public static createAddContact(
        name: string,
        account: Account | PublicAccount,
        networkType: NetworkType = NetworkType.MIJIN_TEST,
        generationHash: string = '17FA4747F5014B50413CCF968749604D728D7065DC504291EEE556899A534CBB',
    ): ContactQR {
        return new ContactQR(name, account, networkType, generationHash);
    }

    /**
     * Create an Account Export QR Code from an Account
     * instance, encrypted with given password.
     *
     * @see {AccountQR}
     * @param   account         {Account}
     * @param   password        {string}
     * @param   networkType     {NetworkType}
     * @param   generationHash         {string}
     */
    public static createExportAccount(
        account: Account,
        password: string,
        networkType: NetworkType = NetworkType.MIJIN_TEST,
        generationHash: string = '17FA4747F5014B50413CCF968749604D728D7065DC504291EEE556899A534CBB',
    ): AccountQR {
        return new AccountQR(account, password, networkType, generationHash);
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
        transaction: Transaction,
        networkType: NetworkType = NetworkType.MIJIN_TEST,
        generationHash: string = '17FA4747F5014B50413CCF968749604D728D7065DC504291EEE556899A534CBB',
    ): TransactionQR {
        return new TransactionQR(transaction, networkType, generationHash);
    }

    /**
     * Create a Mnemonic Export QR Code from a MnemonicPassPhrase
     * instance, encrypted with given password.
     *
     * @see {MnemonicQR}
     * @param   mnemonic        {MnemonicPassPhrase}
     * @param   password        {string}
     * @param   networkType     {NetworkType}
     * @param   generationHash         {string}
     */
    public static createExportMnemonic(
        mnemonic: MnemonicPassPhrase,
        password: string,
        networkType: NetworkType = NetworkType.MIJIN_TEST,
        generationHash: string = '17FA4747F5014B50413CCF968749604D728D7065DC504291EEE556899A534CBB',
    ): MnemonicQR {
        return new MnemonicQR(mnemonic, password, networkType, generationHash);
    }

    /**
     * Parse a JSON QR code content into a sub-class
     * of QRCode.
     *
     * @param   json    {string}
     * @return  {QRCode}
     * @throws  {Error}     On empty `json` given.
     * @throws  {Error}     On missing `type` field value.
     * @throws  {Error}     On unrecognized QR code `type` field value.
     */
    public static fromJSON(
        json: string,
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

        // create an AccountQR from JSON
        case QRCodeType.ExportAccount:

            // password obligatory for encryption
            if (! password) {
                throw new Error('Missing password to decrypt AccountQR QR code.');
            }

            return AccountQR.fromJSON(json, password);

        // create a ObjectQR from JSON
        case QRCodeType.ExportObject:
            return ObjectQR.fromJSON(json);

        // create a CosignatureQR from JSON
        case QRCodeType.RequestCosignature:
            return CosignatureQR.fromJSON(json);

        // create a TransactionQR from JSON
        case QRCodeType.RequestTransaction:
            return TransactionQR.fromJSON(json);

        // create an MnemonicQR from JSON
        case QRCodeType.ExportMnemonic:

            // password obligatory for encryption
            if (! password) {
                throw new Error('Missing password to decrypt MnemonicQR QR code.');
            }

            return MnemonicQR.fromJSON(json, password);

        default:
            break;
        }

        throw new Error("Unrecognized QR Code 'type': '" + jsonObject.type + "'.");
    }
}

export {QRCodeGenerator};
