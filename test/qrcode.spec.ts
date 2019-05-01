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

describe('QRCodeGenerator -->', () => {

    describe('fromTransaction() should', () => {
        it('generate base64 out of transfer transaction', () => {
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
            const actualBase64 = QRCodeGenerator.createTransactionRequest(transfer).toBase64();
            const expectedBase64 = 'data:image/gif;base64,R0lGODdhcwBzAIAAAAAAAP///ywAAAAAcwBzAAAC/4'
                                + 'yPqcvtD6OctNqLs968+w+G4kiWF4Cm6sq2bbJOMeLWtuvcug6rsk/bCV+NoRF4mE'
                                + 'WUhqMz5zT2Uj9qMCqEYndTVNV73d604A0zYOsCyGvOWd05p8NtxvuEXNwt8hq8mJ'
                                + 'ex1xSI0YdDxxZXmOgWOJfEGGllJklIecnTOCn2xzm2qfeYFYomVpZZlwqZqkjHao'
                                + 'oZ21k65Ckqa1t7qjrbq/vp+gl7SBv86ld660s8muuM6qvWLLsM3Lr7rB19LQ24DX'
                                + 'osjj3uPZxcbk1aXvwL7c6lnK3J/q4OTh19T0+OS1SPD10/Be3y9Zpmb164gfsWmv'
                                + 'PHoiFCROkUGmTTruHFb//c1jFEBk6jwIcELVHIqHCZIZODTiYE2LEaHpkV+bwciL'
                                + 'ISzY82Q6aU11Mf0Ao5cd4UxJLXRpjwlP6D6PRoUWZRhZ6rKtFi1YMgo2ZlupXrVa'
                                + '8/wW41MQIW2rUh1LJ964gi3Lk6n9K9GzQi3pJy+fJzudNvUykc9drxCNgqxIl/GY'
                                + 'tdNfLLY8GO3Y6d3E2y5q4OHWOMLKGlyHiH+640HTrpqc+BJYsuzPpI7MmuTQqDGm'
                                + 'X2ItRLVBvD3To1bwgtld6m+mRmTMUkVcLmnFn4csy+aWtNntd5TZ6LoSPevL35UM'
                                + 'reSRM9qp07+cunmR+33L309Nfyrdf3LJ16wOD3lQ//pq9eQbY9lx1n4MUHGX8IJv'
                                + 'bfgOHNJuBwD0Q4nQjdRNfbfhW2hRiGxL0z1W5/eTghiOjFNeJ3+eH34F4sGtWXQQ'
                                + 'CutVSC85moII0jUdighvaxVSNyN/ro4oskyYgjc2HN2N5gx0HIC1ohjldZlCZM2e'
                                + 'Jlxl15YpY2OiVll+qlx2CV2MGoZHUi9vjbkWoSqAGPWHy1IJkHCrkFnevV6Z+Zsp'
                                + 'XFp1kxSiVmiTm+1yGhPhVYF5uGoekklXAi5eNUljoY6HmVKrqhl3tSOqRdTF5nl5'
                                + '/6hfqoeBmiWpyKgoqK6ackzppkqqO+mqqpiJqn6oebBkbrr52SIGeso8F6aJ/lb7'
                                + 'k36YXGKqvls7hi+UGxyU5b6Jq6Qhtnra0CK62vzK7q6LdpXivuj4ay+mZ/INy6YL'
                                + 'DnjqspveuW226moC6pJ3yCUYvnlkwZqdt4S3LqaG2LAkfWwAbmB/DBC7spoZHwFo'
                                + 'lxxhpvzHHHHn8McsgFAAA7';

            // Assert:
            expect(actualBase64).to.deep.equal(expectedBase64);
        });
    });
});
