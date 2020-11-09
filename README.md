# Symbol QR Library

[![npm version](https://badge.fury.io/js/symbol-qr-library.svg)](https://badge.fury.io/js/symbol-qr-library)
[![Build Status](https://travis-ci.com/nemtech/symbol-qr-library.svg?branch=main)](https://travis-ci.com/nemtech/symbol-qr-library)
[![Slack](https://img.shields.io/badge/chat-on%20slack-green.svg)](https://nem2.slack.com/messages/CB0UU89GS//)

Library to generate QR codes for Symbol.

This is a PoC to validate the proposed [NIP 7 QR Library Standard Definition](https://github.com/nemtech/NIP/issues/3). When stable, the repository will be moved to the [nemtech](https://github.com/nemtech) organization.

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
    NetworkType.MIJIN_TEST
  ),
  [new Mosaic(new NamespaceId('cat.currency'), UInt64.fromUint(10000000))],
  PlainMessage.create('Welcome to NEM!'),
  NetworkType.MIJIN_TEST
);

// generation hash of the connected network
const generationHash = 'ACECD90E7B248E012803228ADB4424F0D966D24149B72E58987D2BF2F2AF03C4'

// create QR Code base64
const qrCode: TransactionQR = QRCodeGenerator.createTransactionRequest(transfer, NetworkType.MIJIN_TEST, generationHash);

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
const qrCode: ContactQR = QRCodeGenerator.createAddContact(name, accountPublicKey, NetworkType.MIJIN_TEST, generationHash);

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
const encryptedMnemonicQR: MnemonicQR = new MnemonicQR(mnemonic.plain, NetworkType.MIJIN_TEST, generationHash, 'password');
// or
const plainMnemonicQR: MnemonicQR = new MnemonicQR(mnemonic.plain, NetworkType.MIJIN_TEST, generationHash); // no password

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
const encryptedAccountQR: AccountQR = QRCodeGenerator.createExportAccount(accountPrivateKey, NetworkType.MIJIN_TEST, generationHash, 'password')
const plainAccountQR: AccountQR = QRCodeGenerator.createExportAccount(accountPrivateKey, NetworkType.MIJIN_TEST, generationHash) // no password

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
const qrCode: ObjectQR = QRCodeGenerator.createExportObject(object, NetworkType.MIJIN_TEST, generationHash);

// get base64 notation for <img> HTML attribute
const base64 = qrCode.toBase64();
```

## Getting help

Use the following available resources to get help:

- [Symbol Documentation][docs]
- Join the community [slack group (#sig-client)][slack] 
- If you found a bug, [open a new issue][issues]

## Contributing

Contributions are welcome and appreciated. 
Check [CONTRIBUTING](CONTRIBUTING.md) for information on how to contribute.

## License

Copyright 2019-present NEM

Licensed under the [Apache License 2.0](LICENSE)

[self]: https://github.com/nemtech/symbol-qr-library
[docs]: https://nemtech.github.io
[issues]: https://github.com/nemtech/symbol-qr-library/issues
[slack]: https://join.slack.com/t/nem2/shared_invite/enQtMzY4MDc2NTg0ODgyLWZmZWRiMjViYTVhZjEzOTA0MzUyMTA1NTA5OWQ0MWUzNTA4NjM5OTJhOGViOTBhNjkxYWVhMWRiZDRkOTE0YmU
