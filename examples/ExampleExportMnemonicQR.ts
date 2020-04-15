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
import {
    NetworkType,
} from 'symbol-sdk';

// internal dependencies
import {
    MnemonicQR,
    QRCodeSettings,
    QRCodeType,
} from '../index';
import {Example} from './Example';

class ExampleExportMnemonicQR extends Example {

    /**
     * The `execute()` method should run the underlying
     * example business flow.
     *
     * This example uses an encryption password value of `password`
     * and following 24-words mnemonic pass phrase:
     * 
     *    stumble shoot spawn bitter forest waste attitude chest
     *    square kite dawn photo twice message bargain trap
     *    spin vote lamp wire also either else pupil
     *
     * @return {number}
     */
    public async execute(): Promise<number> {

        // MnemonicQR example data
        const mnemonicInfo = {
            v: 3,
            type: QRCodeType.ExportMnemonic,
            network_id: NetworkType.MIJIN_TEST,
            chain_id: "9F1979BEBA29C47E59B40393ABB516801A353CFC0C18BC241FEDE41939C907E7",
            data: {
                ciphertext: "964322228f401a2ec576ac256cbbdce29YfW+CykqESzGSzDYuKJxJUSpQ4woqMdD8Up7mjbow09I/UYV4e8HEgbhjlLjf30YLlQ+JKLBTf9kUGMnp3tZqYSq3lLZRDp8TVE6GzHiX4V59RTP7BOixwpDWDmfOP0B0i+Q1s0+OPfmyck4p7YZkVNi/HYvQF4kDV27sjRTZKs+uETKA0Ae0rl17d9EMV3eLUVcWEGE/ChgEfmnMlN1g==",
                salt: "b248953e9ebfa269cd7b940f9c03d2d4b192f90db61638375b5e78296bbe675a"
            }
        };

        // create QR Code with JSON content and password
        const mnemonicQR = MnemonicQR.fromJSON(
            JSON.stringify(mnemonicInfo),
            'password'
        );

        console.log("MnemonicQR JSON: ", mnemonicQR.toJSON());
        console.log("MnemonicQR BASE64: ", await mnemonicQR.toBase64().toPromise());
        console.log("MnemonicQR OBJECT: ", await mnemonicQR.toString(new QRCodeSettings('M', 100)).toPromise());
        console.log("");
        return this.resolve(0);
    }
}

export {ExampleExportMnemonicQR};
