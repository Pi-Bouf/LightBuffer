// TextEncoder/TextDecoder polyfills for utf-8 - an implementation of TextEncoder/TextDecoder APIs
// Written in 2013 by Viktor Mukhachev <vic99999@yandex.ru>
// To the extent possible under law, the author(s) have dedicated all copyright and related and neighboring rights to this software to the public domain worldwide. This software is distributed without any warranty.
// You should have received a copy of the CC0 Public Domain Dedication along with this software. If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.

// Some important notes about the polyfill below:
// Native TextEncoder/TextDecoder implementation is overwritten
// String.prototype.codePointAt polyfill not included, as well as String.fromCodePoint
// TextEncoder.prototype.encode returns a regular array instead of Uint8Array
// No options (fatal of the TextDecoder constructor and stream of the TextDecoder.prototype.decode method) are supported.
// TextDecoder.prototype.decode does not valid byte sequences
// This is a demonstrative implementation not intended to have the best performance

// http://encoding.spec.whatwg.org/#textencoder

// http://encoding.spec.whatwg.org/#textencoder

export function TextDecoder(bytes: number[]): string {
    var string = "";
    var i = 0;
    while (i < bytes.length) {
        var octet = bytes[i];
        var bytesNeeded = 0;
        var codePoint = 0;
        if (octet <= 0x7F) {
            bytesNeeded = 0;
            codePoint = octet & 0xFF;
        } else if (octet <= 0xDF) {
            bytesNeeded = 1;
            codePoint = octet & 0x1F;
        } else if (octet <= 0xEF) {
            bytesNeeded = 2;
            codePoint = octet & 0x0F;
        } else if (octet <= 0xF4) {
            bytesNeeded = 3;
            codePoint = octet & 0x07;
        }
        if (bytes.length - i - bytesNeeded > 0) {
            var k = 0;
            while (k < bytesNeeded) {
                octet = bytes[i + k + 1];
                codePoint = (codePoint << 6) | (octet & 0x3F);
                k += 1;
            }
        } else {
            codePoint = 0xFFFD;
            bytesNeeded = bytes.length - i;
        }
        string += String.fromCodePoint(codePoint);
        i += bytesNeeded + 1;
    }
    return string
}
