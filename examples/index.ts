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

// internal dependencies
import {ExampleAddContactQR} from './ExampleAddContactQR';
import {ExampleExportAccountQR} from './ExampleExportAccountQR';
import {ExampleExportMnemonicQR} from './ExampleExportMnemonicQR';
import {ExampleRequestTransactionQR} from './ExampleRequestTransactionQR';

console.log("Starting examples for nem2-qr-library");
console.log("");

(async () => {
        
// -----------------------------
// EX 1: Contact QR Code example
// -----------------------------
    console.log("1) Creating Contact QR-Code");
    console.log("");

    const contactQR = new ExampleAddContactQR();
    await contactQR.execute();
    console.log("");

// -----------------------------
// EX 2: Account QR Code example
// -----------------------------
    console.log("2) Creating Account QR-Code");
    console.log("");

    const accountQR = new ExampleExportAccountQR();
    await accountQR.execute();
    console.log("");

// -----------------------------
// EX 3: Mnemonic QR Code example
// -----------------------------
    console.log("3) Creating Mnemonic QR-Code");
    console.log("");

    const mnemonicQR = new ExampleExportMnemonicQR();
    await mnemonicQR.execute();
    console.log("");

// -----------------------------
// EX 4: Transaction QR Code example
// -----------------------------
    console.log("3) Creating Transaction Request QR-Code");
    console.log("");

    const transactionQR = new ExampleRequestTransactionQR();
    await transactionQR.execute();
    console.log("");
})();
