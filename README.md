# Symbol QR Library

[![npm version](https://badge.fury.io/js/symbol-qr-library.svg)](https://badge.fury.io/js/symbol-qr-library)
[![Build Status](https://travis-ci.com/symbol/symbol-qr-library.svg?branch=main)](https://travis-ci.com/symbol/symbol-qr-library.svg?branch=main)
[![Discord](https://img.shields.io/badge/chat-on%20discord-green.svg)](https://discord.com/invite/xymcity)


Library to generate QR codes for Symbol.

**NOTE**: The author of this package cannot be held responsible for any loss of money or any malintentioned usage forms of this package. Please use this package with caution.

## Features

The software allows you to create the following QR types:

* **TransactionRequest**: QR to prepare transactions ready to be signed.
* **Address**: QR to share the account address with others.
* **Contact**: QR to share the account address and public key with others.
* **Mnemonic**: QR to generate account mnemonic backups (encrypted | plain).
* **Account**: QR to generate account private key backups (encrypted | plain).
* **Object**: QR to export  a custom object.

## Requirements

- Node.js 12 LTS

## Installation

`npm install symbol-qr-library`


## Usage

### Generate QRCode for a Transaction Request

```typescript
import { QRCodeGenerator, TransactionQR } from 'symbol-qr-library';
import { Address, Deadline, Mosaic, NamespaceId, NetworkType, PlainMessage, TransferTransaction, UInt64 } from "symbol-sdk";

// (Optional) create transfer transaction (or read from network)
const transfer = TransferTransaction.create(
  Deadline.create(),
  Address.createFromPublicKey(
    'C5C55181284607954E56CD46DE85F4F3EF4CC713CC2B95000FA741998558D268',
    NetworkType.TEST_NET
  ),
  [new Mosaic(new NamespaceId('symbol.xym'), UInt64.fromUint(10000000))],
  PlainMessage.create('Welcome to Symbol!'),
  NetworkType.TEST_NET
);

// generation hash of the connected network
const generationHash = 'ACECD90E7B248E012803228ADB4424F0D966D24149B72E58987D2BF2F2AF03C4'

// create QR Code base64
const qrCode: TransactionQR = QRCodeGenerator.createTransactionRequest(transfer, NetworkType.TEST_NET, generationHash);

// get base64 notation for <img> HTML attribute
const base64 = qrCode.toBase64();
```

### Generate AddressQR code

```typescript
import { QRCodeGenerator, AddressQR } from 'symbol-qr-library';
import { NetworkType } from 'symbol-sdk';

const name = 'test-address-1';
const contactAddress = 'TA6QZTYPOIYQYR5NRY4WQ2WRQUX2FN5UK2DO6DI'

// generation hash of the connected network
const generationHash = 'ACECD90E7B248E012803228ADB4424F0D966D24149B72E58987D2BF2F2AF03C4'

// create QR Code base64
const qrCode: AddressQR = QRCodeGenerator.createExportAddress(name, contactAddress, NetworkType.TEST_NET, generationHash);

// get base64 notation for <img> HTML attribute
const base64 = qrCode.toBase64();
```

### Generate ContactQR code

```typescript
import { QRCodeGenerator, ContactQR } from 'symbol-qr-library';
import { NetworkType } from 'symbol-sdk';

const name = 'test-contact-1';
const accountPublicKey = 'C5C55181284607954E56CD46DE85F4F3EF4CC713CC2B95000FA741998558D268'

// generation hash of the connected network
const generationHash = 'ACECD90E7B248E012803228ADB4424F0D966D24149B72E58987D2BF2F2AF03C4'

// create QR Code base64
const qrCode: ContactQR = QRCodeGenerator.createAddContact(name, accountPublicKey, NetworkType.TEST_NET, generationHash);

// get base64 notation for <img> HTML attribute
const base64 = qrCode.toBase64();

```

### Generate QRCode for a Mnemonic data

```typescript
import { QRCodeGenerator, MnemonicQR } from 'symbol-qr-library';
import { NetworkType } from 'symbol-sdk';
import { MnemonicPassPhrase } from 'symbol-hd-wallets';

// create a mnemonic and password.
const mnemonic = MnemonicPassPhrase.createRandom();

// generation hash of the connected network
const generationHash = 'ACECD90E7B248E012803228ADB4424F0D966D24149B72E58987D2BF2F2AF03C4'

// create QR Code base64
const encryptedMnemonicQR: MnemonicQR = new MnemonicQR(mnemonic.plain, NetworkType.TEST_NET, generationHash, 'password');
// or
const plainMnemonicQR: MnemonicQR = new MnemonicQR(mnemonic.plain, NetworkType.TEST_NET, generationHash); // no password

// get base64 notation for <img> HTML attribute
const base64 = encryptedMnemonicQR.toBase64();

```

The produced Base64 encoded payload can be used to display the QR Code. An example of display can be done easily with HTML, as follows:

```html
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="Transfer Transaction QR code" />
```

### Generate QRCode for an Account Private Key

```typescript
import { QRCodeGenerator, AccountQR } from 'symbol-qr-library';
import { NetworkType } from 'symbol-sdk';

const accountPrivateKey = 'F97AE23C2A28ECEDE6F8D6C447C0A10B55C92DDE9316CCD36C3177B073906978'

// generation hash of the connected network
const generationHash = 'ACECD90E7B248E012803228ADB4424F0D966D24149B72E58987D2BF2F2AF03C4'

// create QR Code base64
const encryptedAccountQR: AccountQR = QRCodeGenerator.createExportAccount(accountPrivateKey, NetworkType.TEST_NET, generationHash, 'password')
const plainAccountQR: AccountQR = QRCodeGenerator.createExportAccount(accountPrivateKey, NetworkType.TEST_NET, generationHash) // no password

// get base64 notation for <img> HTML attribute
const base64 = encryptedAccountQR.toBase64();
```


### Generate QRCode for a custom object

```typescript
import { QRCodeGenerator, ObjectQR } from 'symbol-qr-library';
import { NetworkType } from 'symbol-sdk';

// define custom object to suit your application use case.
const object = {"obj": "test"};

// generation hash of the connected network
const generationHash = 'ACECD90E7B248E012803228ADB4424F0D966D24149B72E58987D2BF2F2AF03C4'

// create QR Code base64
const qrCode: ObjectQR = QRCodeGenerator.createExportObject(object, NetworkType.TEST_NET, generationHash);

// get base64 notation for <img> HTML attribute
const base64 = qrCode.toBase64();
```

## Getting help

Use the following available resources to get help:

- [Symbol Documentation][docs]
- Join the community [discord][discord] 
- If you found a bug, [open a new issue][issues]

## Contributing

Contributions are welcome and appreciated. 
Check [CONTRIBUTING](CONTRIBUTING.md) for information on how to contribute.

## License

(C) Symbol Contributors 2022

Licensed under the [Apache License 2.0](LICENSE)

[self]: https://github.com/symbol/symbol-qr-library
[docs]: https://docs.symbolplatform.com/
[issues]: https://github.com/symbol/symbol-qr-library/issues
[discord]: https://discord.com/invite/xymcity
