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
    Account,
    Password,
} from 'nem2-sdk';

// internal dependencies
import {
    AccountQR,
    QRCodeType,
} from '../index';
import {Example} from './Example';

export class ExampleExportAccountQR extends Example {

    /**
     * The `execute()` method should run the underlying
     * example business flow.
     *
     * @return {number}
     */
    public async execute(): Promise<number> {

        // Arrange
        const accountInfo = {
            v: 3,
            type: 2,
            network_id: 144,
            chain_id: '9F1979BEBA29C47E59B40393ABB516801A353CFC0C18BC241FEDE41939C907E7',
            data: {
                ciphertext: 'cdc2f1ff390dd21b4528f5b75e69b30aNkYsuMlvsC7bShwqilk8P0txdWiQptMNypbjV9p5VFw766YIGqOfm336U1mMrMGwbPeIqbuPXsc8+stuGJ/M0OswzzDJ9BZyDQ+UK7sYBwE=',
                salt: '9860f8643b3b1d77514a63eb4cbc0d9dbd6091bca10e742663d2bcc6b79fe7fb'
            }
        };

        // create QR Code with JSON content and password
        const accountQR = AccountQR.fromJSON(
            JSON.stringify(accountInfo),
            new Password('Intranet123')
        );

        console.log("JSON: ", accountQR.toJSON());
        console.log("BASE64: ", accountQR.toBase64());
        console.log("");
        console.log("ASCII: ");
        console.log(accountQR.toASCII());
        console.log("");
        return this.resolve(0);
    }
}

