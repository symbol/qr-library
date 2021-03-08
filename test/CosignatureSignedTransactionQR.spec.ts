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
    CosignatureSignedTransaction,
    NetworkType,
} from 'symbol-sdk';
import {CosignatureSignedTransactionQR} from "../src/CosignatureSignedTransactionQR";
// internal dependencies

describe('CosignatureSignedTransactionQR -->', () => {

    describe('toJSON() should', () => {

        it('include mandatory NIP-7 QR Code base fields', () => {
            // Arrange:
            const signedTransaction = new CosignatureSignedTransaction(
                "BDCBB0E32AAC378AC04FAFE4D341E002E5DC5790F8E0EDFF65FDD8249A65F97D",
                "0FC21B9AE123CF186318AE312EFDA22634F6CF7D47324FF1731FA12AEF0481A40B449DB1F63814C57BB218496C8210F4561FE62F007139750923CB527A03BC0E",
                "7271588CCD1EB2F8E2FD70088CEA03D55C9275D7340DC5E5DDC756833CD04DFF",
            );


            // Act:
            const signedTx = new CosignatureSignedTransactionQR(signedTransaction, NetworkType.TEST_NET, '');
            const actualJSON = signedTx.toJSON();
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
            const signedTransaction = new CosignatureSignedTransaction(
                "BDCBB0E32AAC378AC04FAFE4D341E002E5DC5790F8E0EDFF65FDD8249A65F97D",
                "0FC21B9AE123CF186318AE312EFDA22634F6CF7D47324FF1731FA12AEF0481A40B449DB1F63814C57BB218496C8210F4561FE62F007139750923CB527A03BC0E",
                "7271588CCD1EB2F8E2FD70088CEA03D55C9275D7340DC5E5DDC756833CD04DFF",
            );

            // Act:
            const qr = new CosignatureSignedTransactionQR(signedTransaction, NetworkType.TEST_NET, "443931795E15914146B774AE550762046525AF94E2C8E32F8DDFA9194D89A567");
            const actualJSON = qr.toJSON();
            const actualObject = JSON.parse(actualJSON);

            // Assert:
            expect(actualObject.data.payload).to.have.property('signature');
        });
    });
    describe('fromJSON() should', () => {
        it('reconstruct signed transaction', () => {
            // Arrange:
            const signedTransaction = new CosignatureSignedTransaction(
                "BDCBB0E32AAC378AC04FAFE4D341E002E5DC5790F8E0EDFF65FDD8249A65F97D",
                "0FC21B9AE123CF186318AE312EFDA22634F6CF7D47324FF1731FA12AEF0481A40B449DB1F63814C57BB218496C8210F4561FE62F007139750923CB527A03BC0E",
                "7271588CCD1EB2F8E2FD70088CEA03D55C9275D7340DC5E5DDC756833CD04DFF",
            );
            const qr = new CosignatureSignedTransactionQR(signedTransaction, NetworkType.TEST_NET, "443931795E15914146B774AE550762046525AF94E2C8E32F8DDFA9194D89A567");
            const mapper = (dto: any) => new CosignatureSignedTransaction(dto.parentHash, dto.signature, dto.signerPublicKey);
            // Act:
            const reconstructedQR = CosignatureSignedTransactionQR.fromJSON(qr.toJSON(), mapper);

            // Assert
            expect(qr.singedTransaction.signature).to.be.equal(reconstructedQR.singedTransaction.signature);
        });
    });

});
