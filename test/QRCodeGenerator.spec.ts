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
} from 'nem2-sdk';

// internal dependencies
import { QRCodeGenerator } from "../index";

// vectors data
import {
    ExpectedObjectBase64,
} from './vectors/index';

describe('QRCodeGenerator -->', () => {

    describe('createExportObject() should', () => {
        it('generate correct Base64 representation for {test: test}', () => {
            // Arrange:
            const object = {"test": "test"};
            const qrcode = QRCodeGenerator.createExportObject(object, NetworkType.TEST_NET, 'no-chain-id');

            // Act:
            const base64 = qrcode.toBase64();

            // Assert:
            expect(base64).to.not.be.equal('');
            expect(base64.length).to.not.be.equal(0);
            expect(base64).to.be.equal(ExpectedObjectBase64);
        });
    });

    describe('createTransactionRequest() should', () => {
        it('generate correct Base64 representation for TransferTransaction', () => {
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
            const requestTx = QRCodeGenerator.createTransactionRequest(transfer);
            const actualBase64 = requestTx.toBase64();

            // Assert:
            expect(actualBase64).to.not.be.equal('');
            expect(actualBase64.length).to.not.be.equal(0);
            expect(requestTx.toJSON()).to.have.lengthOf.below(2953);
        });
    });
});
