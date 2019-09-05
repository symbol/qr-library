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
} from 'nem2-sdk';

// internal dependencies
import {Example} from './Example';
import {ExampleAddContactQR} from './ExampleAddContactQR';
import {ExampleExportAccountQR} from './ExampleExportAccountQR';

console.log("Starting examples for nem2-qr-library");
console.log("");

// -----------------------------
// EX 1: Contact QR Code example
// -----------------------------
console.log("1) Creating Contact QR-Code");
console.log("");

const contactQR = new ExampleAddContactQR();
contactQR.execute();
console.log("");

// -----------------------------
// EX 2: Account QR Code example
// -----------------------------
console.log("2) Creating Account QR-Code");
console.log("");

const accountQR = new ExampleExportAccountQR();
accountQR.execute();
console.log("");
