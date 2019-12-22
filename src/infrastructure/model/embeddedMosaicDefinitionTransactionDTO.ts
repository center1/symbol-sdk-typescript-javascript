/*
 * Copyright 2019 NEM
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
/**
 * Catapult REST Endpoints
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.7.20.6
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { EmbeddedTransactionDTO } from './embeddedTransactionDTO';
import { MosaicDefinitionTransactionBodyDTO } from './mosaicDefinitionTransactionBodyDTO';
import { NetworkTypeEnum } from './networkTypeEnum';

export class EmbeddedMosaicDefinitionTransactionDTO {
    'signerPublicKey': string;
    /**
    * Entity version.
    */
    'version': number;
    'network': NetworkTypeEnum;
    'type': number;
    /**
    * Absolute amount. An amount of 123456789 (absolute) for a mosaic with divisibility 6 means 123.456789 (relative).
    */
    'maxFee': string;
    /**
    * Duration expressed in number of blocks.
    */
    'deadline': string;
    /**
    * Mosaic identifier.
    */
    'id': string;
    /**
    * Duration expressed in number of blocks.
    */
    'duration': string;
    /**
    * Random nonce used to generate the mosaic id.
    */
    'nonce': number;
    /**
    * - 0x00 (none) - No flags present. - 0x01 (supplyMutable) - Mosaic supports supply changes even when mosaic owner owns partial supply. - 0x02 (transferable) - Mosaic supports transfers between arbitrary accounts. When not set, mosaic can only be transferred to and from mosaic owner. - 0x04 (restrictable) - Mosaic supports custom restrictions configured by mosaic owner. 
    */
    'flags': number;
    /**
    * Determines up to what decimal place the mosaic can be divided. Divisibility of 3 means that a mosaic can be divided into smallest parts of 0.001 mosaics. The divisibility must be in the range of 0 and 6. 
    */
    'divisibility': number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "signerPublicKey",
            "baseName": "signerPublicKey",
            "type": "string"
        },
        {
            "name": "version",
            "baseName": "version",
            "type": "number"
        },
        {
            "name": "network",
            "baseName": "network",
            "type": "NetworkTypeEnum"
        },
        {
            "name": "type",
            "baseName": "type",
            "type": "number"
        },
        {
            "name": "maxFee",
            "baseName": "maxFee",
            "type": "string"
        },
        {
            "name": "deadline",
            "baseName": "deadline",
            "type": "string"
        },
        {
            "name": "id",
            "baseName": "id",
            "type": "string"
        },
        {
            "name": "duration",
            "baseName": "duration",
            "type": "string"
        },
        {
            "name": "nonce",
            "baseName": "nonce",
            "type": "number"
        },
        {
            "name": "flags",
            "baseName": "flags",
            "type": "number"
        },
        {
            "name": "divisibility",
            "baseName": "divisibility",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return EmbeddedMosaicDefinitionTransactionDTO.attributeTypeMap;
    }
}

