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
    AggregateTransaction,
    Deadline,
    Mosaic,
    NamespaceId,
    NetworkType,
    PlainMessage,
    PublicAccount,
    TransferTransaction,
    UInt64,
} from 'symbol-sdk';

// internal dependencies
import {
    CosignatureQR,
    QRCodeType,
} from "../index";

const bondedCreationHelper = () => {
    const account = PublicAccount.createFromPublicKey(
        'C5C55181284607954E56CD46DE85F4F3EF4CC713CC2B95000FA741998558D268',
        NetworkType.MIJIN_TEST,
    );
    const transfer = TransferTransaction.create(
        Deadline.create(1),
        Address.createFromPublicKey(
            'C5C55181284607954E56CD46DE85F4F3EF4CC713CC2B95000FA741998558D268',
            NetworkType.MIJIN_TEST,
        ),
        [new Mosaic(new NamespaceId('cat.currency'), UInt64.fromUint(10000000))],
        PlainMessage.create('Welcome to NEM!'),
        NetworkType.MIJIN_TEST,
    );
    const bonded = AggregateTransaction.createBonded(
        Deadline.create(1),
        [transfer.toAggregate(account)],
        NetworkType.MIJIN_TEST,
    );

    return bonded;
};

describe('CosignatureQR -->', () => {

    describe('toJSON() should', () => {

        it('include mandatory NIP-7 QR Code base fields', () => {
            // Arrange:
            const bonded = bondedCreationHelper();

            // Act:
            const requestTx = new CosignatureQR(bonded, NetworkType.TEST_NET, '');
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
            const bonded = bondedCreationHelper();

            // Act:
            const requestTx = new CosignatureQR(bonded, NetworkType.TEST_NET, '');
            const actualJSON = requestTx.toJSON();
            const actualObject = JSON.parse(actualJSON);

            // Assert:
            expect(actualObject.data).to.have.property('payload');
        });
    });

    describe('fromJSON() should', () => {

        it('reconstruct aggregate bonded given CosignatureQR JSON', () => {
            // Arrange:
            const bonded = bondedCreationHelper();

            // Act:
            const exportCosig = new CosignatureQR(bonded, NetworkType.MIJIN_TEST, 'no-chain-id');
            const importCosig = CosignatureQR.fromJSON(exportCosig.toJSON());

            // Assert
            expect(importCosig.transaction.serialize()).to.be.equal(exportCosig.transaction.serialize());
        });

        it('reconstruct aggregate bonded given correct JSON structure', () => {
            // Arrange:
            const cosigInfo = {
                v: 3,
                type: QRCodeType.RequestCosignature,
                network_id: NetworkType.MIJIN_TEST,
                chain_id: '9F1979BEBA29C47E59B40393ABB516801A353CFC0C18BC241FEDE41939C907E7',
                data: {
                    payload: '1801000000000000000000000000000000000000000000000000000000000000'
                           + '0000000000000000000000000000000000000000000000000000000000000000'
                           + '0000000000000000000000000000000000000000000000000000000000000000'
                           + '000000000000000000000000019041420000000000000000076BB7C31A000000'
                           + 'CAD12D0EF5EA473B28F810B164E14E2968BABF88EE51F60975635C7F446AB689'
                           + '70000000000000007000000000000000C5C55181284607954E56CD46DE85F4F3'
                           + 'EF4CC713CC2B95000FA741998558D26800000000019054419051F5B062FE3931'
                           + 'B29B095AB8FD42FCC2010AE1A67D903BC50110000000000044B262C46CEABB85'
                           + '80969800000000000057656C636F6D6520746F204E454D21',
                },
            };

            // Act:
            const importCosig = CosignatureQR.fromJSON(JSON.stringify(cosigInfo));

            // Assert:
            expect(importCosig.transaction.serialize()).to.be.equal(cosigInfo.data.payload);
        });

    });

});
