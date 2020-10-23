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
import {expect} from "chai";
import {
    TransferTransaction,
    Deadline,
    Address,
    Mosaic,
    NamespaceId,
    UInt64,
    PlainMessage,
    NetworkType,
    PublicAccount,
    Account,
    Password, TransactionMapping
} from 'symbol-sdk';
import { MnemonicPassPhrase } from 'symbol-hd-wallets';

// internal dependencies
import {
    QRCodeType,
    QRCodeGenerator,
    ContactQR,
    AccountQR,
    TransactionQR,
    ObjectQR,
    MnemonicQR,
} from "../index";

const generationHash = '17FA4747F5014B50413CCF968749604D728D7065DC504291EEE556899A534CBB';
const networkType = NetworkType.MIJIN_TEST

describe('QRCodeGenerator -->', () => {

    describe('createExportObject() should', () => {

        it('use default values for network_id and chain_id', () => {
            // Arrange:
            const object = {};

            // Act:
            const objectQR = QRCodeGenerator.createExportObject(object, networkType, generationHash);

            // Assert:
            expect(objectQR.networkType).to.be.equal(NetworkType.MIJIN_TEST);
            expect(objectQR.generationHash).to.not.be.undefined;
            expect(objectQR.generationHash).to.have.lengthOf(64);
        });

        it('fill object property correctly with {test: test}', () => {
            // Arrange:
            const object = {test: "test"};

            // Act:
            const objectQR = QRCodeGenerator.createExportObject(object, networkType, generationHash);

            // Assert:
            expect(objectQR.object).to.deep.equal(object);
        });
    });

    describe('createTransactionRequest() should', () => {

        it('generate correct Base64 representation for TransferTransaction', async () => {
            // Arrange:
            const transfer = TransferTransaction.create(
                Deadline.create(),
                Address.createFromPublicKey(
                    'C5C55181284607954E56CD46DE85F4F3EF4CC713CC2B95000FA741998558D268',
                    NetworkType.MIJIN_TEST
                ),
                [new Mosaic(new NamespaceId('cat.currency'), UInt64.fromUint(10000000))],
                PlainMessage.create('Welcome to NEM!'),
                NetworkType.MIJIN_TEST
            );

            // Act:
            const requestTx = QRCodeGenerator.createTransactionRequest(transfer, networkType, generationHash);
            const actualBase64 = await requestTx.toBase64().toPromise();

            // Assert:
            expect(actualBase64).to.not.be.equal('');
            expect(actualBase64.length).to.not.be.equal(0);
            expect(requestTx.toJSON()).to.have.lengthOf.below(2953);
        });
    });

    describe('createAddContact() should', () => {

        it('generate correct Base64 representation for AddContact', async () => {
            // Arrange:
            const name = 'test-contact-1';
            const account = PublicAccount.createFromPublicKey(
                'C5C55181284607954E56CD46DE85F4F3EF4CC713CC2B95000FA741998558D268',
                NetworkType.MIJIN_TEST
            );

            // Act:
            const createContact = QRCodeGenerator.createAddContact(name, account.publicKey, networkType, generationHash);
            const actualBase64 = await createContact.toBase64().toPromise();

            // Assert:
            expect(actualBase64).to.not.be.equal('');
            expect(actualBase64.length).to.not.be.equal(0);
            expect(createContact.toJSON()).to.have.lengthOf.below(2953);
        });
    });

    describe('createExportAccount() should', () => {

        it('generate correct Base64 representation for ExportAccount', async () => {
            // Arrange:
            const account = Account.createFromPrivateKey(
                'F97AE23C2A28ECEDE6F8D6C447C0A10B55C92DDE9316CCD36C3177B073906978',
                NetworkType.MIJIN_TEST
            );

            // Act:
            const exportAccount = QRCodeGenerator.createExportAccount(account.privateKey, networkType, generationHash, 'password');
            const actualBase64 = await exportAccount.toBase64().toPromise();

            // Assert:
            expect(actualBase64).to.not.be.equal('');
            expect(actualBase64.length).to.not.be.equal(0);
            expect(exportAccount.toJSON()).to.have.lengthOf.below(2953);
        });
    });

    describe('createExportMnemonic() should', () => {

        it('generate correct Base64 representation for ExportMnemonic', async () => {
            // Arrange:
            const mnemonic = MnemonicPassPhrase.createRandom();

            // Act:
            const exportMnemonic = QRCodeGenerator.createExportMnemonic(mnemonic.plain, networkType, generationHash, 'password');
            const actualBase64 = await exportMnemonic.toBase64().toPromise();

            // Assert:
            expect(actualBase64).to.not.be.equal('');
            expect(actualBase64.length).to.not.be.equal(0);
            expect(exportMnemonic.toJSON()).to.have.lengthOf.below(2953);
        });
    });

    describe('fromJSON() should', () => {

        it('Populate transaction data given TransactionQR JSON', () => {
            // Arrange:
            const transfer = TransferTransaction.create(
                Deadline.create(),
                Address.createFromPublicKey(
                    'C5C55181284607954E56CD46DE85F4F3EF4CC713CC2B95000FA741998558D268',
                    NetworkType.MIJIN_TEST
                ),
                [new Mosaic(new NamespaceId('cat.currency'), UInt64.fromUint(10000000))],
                PlainMessage.create('Welcome to NEM!'),
                NetworkType.MIJIN_TEST
            );

            const requestTx = QRCodeGenerator.createTransactionRequest(transfer, networkType, generationHash);
            const txJSON = requestTx.toJSON();

            // Act:
            const transactionObj: TransactionQR = QRCodeGenerator.fromJSON(txJSON, TransactionMapping.createFromPayload) as TransactionQR;

            // Assert:
            expect(transactionObj.toJSON()).to.not.be.equal('');
            expect(transactionObj.type).to.be.equal(QRCodeType.RequestTransaction);
            expect(transactionObj.transaction.serialize()).to.be.equal(transfer.serialize());
        });

        it('Populate contact information given ContactQR JSON', () => {
            // Arrange:
            const name = 'test-contact-1';
            const account = PublicAccount.createFromPublicKey(
                'C5C55181284607954E56CD46DE85F4F3EF4CC713CC2B95000FA741998558D268',
                networkType
            );

            const createContact = QRCodeGenerator.createAddContact(
                name,
                account.publicKey
                , networkType, generationHash);
            const contactJSON = createContact.toJSON();

            // Act:
            const contactObj: ContactQR = QRCodeGenerator.fromJSON(contactJSON, TransactionMapping.createFromPayload) as ContactQR;

            // Assert:
            expect(contactObj.toJSON()).to.not.be.equal('');
            expect(contactObj.type).to.be.equal(QRCodeType.AddContact);
            expect(contactObj.accountPublicKey).to.deep.equal(account.publicKey);
            expect(contactObj.name).to.be.equal(name);
        });

        it('Populate account information given AccountQR JSON', () => {
            // Arrange:
            const account = Account.createFromPrivateKey(
                'F97AE23C2A28ECEDE6F8D6C447C0A10B55C92DDE9316CCD36C3177B073906978',
                NetworkType.MIJIN_TEST
            );

            const exportAccount = QRCodeGenerator.createExportAccount(account.privateKey, networkType, generationHash, 'password');
            const actualObj = exportAccount.toJSON();

            // Act:
            const accountObj: AccountQR = QRCodeGenerator.fromJSON(actualObj, TransactionMapping.createFromPayload, 'password') as AccountQR;

            // Assert:
            expect(accountObj.toJSON()).to.not.be.equal('');
            expect(accountObj.type).to.be.equal(QRCodeType.ExportAccount);
            expect(Account.createFromPrivateKey(accountObj.accountPrivateKey, networkType)).to.deep.equal(account);
            expect(accountObj.accountPrivateKey).to.be.equal('F97AE23C2A28ECEDE6F8D6C447C0A10B55C92DDE9316CCD36C3177B073906978');
        });

        it('Populate object given ObjectQR JSON', () => {
            // Arrange:
            const object = {
                key: "Value1",
                key2: "Value2"
            };

            const exportObject = QRCodeGenerator.createExportObject(object, networkType, generationHash);
            const actualObj = exportObject.toJSON();

            // Act:
            const objectObj: ObjectQR = QRCodeGenerator.fromJSON(actualObj, TransactionMapping.createFromPayload) as ObjectQR;

            // Assert:
            expect(objectObj.toJSON()).to.not.be.equal('');
            expect(objectObj.type).to.be.equal(QRCodeType.ExportObject);
            expect(objectObj.object).to.deep.equal(object);
        });

        it('Populate mnemonic pass phrase given MnemonicQR JSON', () => {
            // Arrange:
            const mnemonic = MnemonicPassPhrase.createRandom();

            const exportMnemonic = QRCodeGenerator.createExportMnemonic(mnemonic.plain, networkType, generationHash, 'password');
            const actualObj = exportMnemonic.toJSON();

            // Act:
            const mnemonicObj: MnemonicQR = QRCodeGenerator.fromJSON(actualObj, TransactionMapping.createFromPayload, 'password') as MnemonicQR;

            // create mnemonic
            const exportedMnemonic = new MnemonicPassPhrase(mnemonicObj.mnemonicPlainText);

            // more content validation
            if (!exportedMnemonic.isValid()) {
                throw new Error('Invalid encrypted mnemonic pass phrase.');
            }

            // Assert:
            expect(mnemonicObj.toJSON()).to.not.be.equal('');
            expect(mnemonicObj.type).to.be.equal(QRCodeType.ExportMnemonic);
            expect(exportedMnemonic).to.deep.equal(mnemonic);
            expect(mnemonicObj.mnemonicPlainText).to.be.equal(mnemonic.plain);
        });
    });

});
