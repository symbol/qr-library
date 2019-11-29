import {
    PublicAccount,
    NetworkType,
} from 'nem2-sdk';

const name = 'test-contact-1';
const account = PublicAccount.createFromPublicKey(
                'C5C55181284607954E56CD46DE85F4F3EF4CC713CC2B95000FA741998558D268',
                NetworkType.TEST_NET
            );

// create QR Code base64
const request = QRCodeGenerator.createAddContact(name, account);

// get base64 notation for <img> HTML attribute
const base64 = request.toBase64();