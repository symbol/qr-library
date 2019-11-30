import {
    Account,
    NetworkType,
    Password,
} from 'nem2-sdk';
import { MnemonicPassPhrase } from 'nem2-hd-wallets';

// create a mnemonic and password.
const mnemonic = MnemonicPassPhrase.createRandom();
const password = new Password('password');


// create QR Code base64
const exportMnemonic = new MnemonicQR(mnemonic, password, NetworkType.MIJIN_TEST, 'no-chain-id');

// get base64 notation for <img> HTML attribute
const base64 = exportMnemonic.toBase64();