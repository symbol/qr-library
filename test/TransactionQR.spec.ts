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
    Address,
    Deadline,
    Mosaic,
    NamespaceId,
    NetworkType,
    PlainMessage,
    TransferTransaction,
    UInt64,
} from 'symbol-sdk';

// internal dependencies
import {
    TransactionQR,
} from "../index";

describe('TransactionQR -->', () => {

    describe('toJSON() should', () => {

        it('include mandatory NIP-7 QR Code base fields', () => {
            // Arrange:
            const transfer = TransferTransaction.create(
                Deadline.create(),
                Address.createFromPublicKey(
                    'C5C55181284607954E56CD46DE85F4F3EF4CC713CC2B95000FA741998558D268',
                    NetworkType.MIJIN_TEST,
                ),
                [new Mosaic(new NamespaceId('cat.currency'), UInt64.fromUint(10000000))],
                PlainMessage.create('Welcome to NEM!'),
                NetworkType.MIJIN_TEST,
            );

            // Act:
            const requestTx = new TransactionQR(transfer, NetworkType.TEST_NET, '');
            const actualJSON = requestTx.toJSON();
            const actualObject = JSON.parse(actualJSON);

            // Assert:
            expect(actualObject).to.have.property('v');
            expect(actualObject).to.have.property('type');
            expect(actualObject).to.have.property('network_id');
            expect(actualObject).to.have.property('chain_id');
            expect(actualObject).to.have.property('data');
        });

        it('include specialized schema fields', () => {
            // Arrange:
            const transfer = TransferTransaction.create(
                Deadline.create(),
                Address.createFromPublicKey(
                    'C5C55181284607954E56CD46DE85F4F3EF4CC713CC2B95000FA741998558D268',
                    NetworkType.MIJIN_TEST,
                ),
                [new Mosaic(new NamespaceId('cat.currency'), UInt64.fromUint(10000000))],
                PlainMessage.create('Welcome to NEM!'),
                NetworkType.MIJIN_TEST,
            );

            // Act:
            const requestTx = new TransactionQR(transfer, NetworkType.TEST_NET, '');
            const actualJSON = requestTx.toJSON();
            const actualObject = JSON.parse(actualJSON);

            // Assert:
            expect(actualObject.data).to.have.property('payload');
        });
    });

});
