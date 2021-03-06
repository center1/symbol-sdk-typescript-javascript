/*
 * Copyright 2018 NEM
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {deepEqual} from 'assert';
import {expect} from 'chai';
import {NetworkCurrencyLocal} from '../../../src/model/mosaic/NetworkCurrencyLocal';
import { NetworkCurrencyPublic } from '../../../src/model/mosaic/NetworkCurrencyPublic';
import {NamespaceId} from '../../../src/model/namespace/NamespaceId';
import { UInt64 } from '../../../src/model/UInt64';

describe('NetworkCurrencyLocal', () => {

    it('should createComplete an NetworkCurrencyLocal object', () => {

        const currency = NetworkCurrencyLocal.createRelative(1000);

        deepEqual(currency.id.id.toHex(), '85BBEA6CC462B244'); // holds NAMESPACE_ID
        expect(currency.amount.compact()).to.be.equal(1000 * 1000000);
    });

    it('should set amount in smallest unit when toDTO()', () => {

        const currency = NetworkCurrencyLocal.createRelative(1000);
        expect(UInt64.fromNumericString(currency.toDTO().amount).toDTO()[0]).to.be.equal(1000 * 1000000);
    });

    it('should have valid statics', () => {
        deepEqual(NetworkCurrencyLocal.NAMESPACE_ID.id, new NamespaceId([3294802500, 2243684972]).id);
        expect(NetworkCurrencyLocal.DIVISIBILITY).to.be.equal(6);
        expect(NetworkCurrencyLocal.TRANSFERABLE).to.be.equal(true);
        expect(NetworkCurrencyLocal.SUPPLY_MUTABLE).to.be.equal(false);
    });
});

describe('NetworkCurrencyPublic', () => {

    it('should createComplete an NetworkCurrencyPublic object', () => {

        const currency = NetworkCurrencyPublic.createRelative(1000);
        deepEqual(currency.id.id.toHex(), 'E74B99BA41F4AFEE'); // holds NAMESPACE_ID
        expect(currency.amount.compact()).to.be.equal(1000 * 1000000);
    });

    it('should set amount in smallest unit when toDTO()', () => {

        const currency = NetworkCurrencyPublic.createRelative(1000);
        expect(UInt64.fromNumericString(currency.toDTO().amount).toDTO()[0]).to.be.equal(1000 * 1000000);
    });

    it('should have valid statics', () => {
        deepEqual(NetworkCurrencyPublic.NAMESPACE_ID.id, new NamespaceId([1106554862, 3880491450]).id);
        expect(NetworkCurrencyPublic.DIVISIBILITY).to.be.equal(6);
        expect(NetworkCurrencyPublic.TRANSFERABLE).to.be.equal(true);
        expect(NetworkCurrencyPublic.SUPPLY_MUTABLE).to.be.equal(false);
    });
});
