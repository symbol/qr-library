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
    SignedTransaction,
    TransactionType,
    TransferTransaction,
    UInt64,
} from 'symbol-sdk';
import {SignedTransactionQR} from "../src/SignedTransactionQR";
// internal dependencies

describe('SignedTransactionQR -->', () => {

    describe('toJSON() should', () => {

        it('include mandatory NIP-7 QR Code base fields', () => {
            // Arrange:
            const signedTransaction = new SignedTransaction(
                "B0000000000000008002CDB5CD04681FE26FA770968DC5144591BA15B994EBE9B1B6C72A493C3439770C069AF0786026CE271FB28125396606755DC8436DB9BB979080E61CFE4B0BF530A00F5788DC3025E7F7F6000AF50C7A91283AFB1324E0E5D1BB494339EDE2000000000198544120040000000000009DD664810900000098808E6DE3E834FC51CCB1A7F56D20628BD0F5B05265C2A400000100000000009EF30755E803F42C0000000000000000",
                "443931795E15914146B774AE550762046525AF94E2C8E32F8DDFA9194D89A567",
                "443931795E15914146B774AE550762046525AF94E2C8E32F8DDFA9194D89A567",
                TransactionType.TRANSFER,
                NetworkType.TEST_NET,
            );


            // Act:
            const signedTx = new SignedTransactionQR(signedTransaction, NetworkType.TEST_NET, '');
            const actualJSON = signedTx.toJSON();
            const actualObject = JSON.parse(actualJSON);

            // Assert:
            expect(actualObject).to.have.property('v');
            expect(actualObject).to.have.property('type');
            expect(actualObject).to.have.property('network_id');
            expect(actualObject).to.have.property('chain_id');
            expect(actualObject).to.have.property('data');
        });
    });

});
