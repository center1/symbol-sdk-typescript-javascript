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

import localVarRequest = require('request');
import http = require('http');

/* tslint:disable:no-unused-locals */
import { AccountIds } from '../model/accountIds';
import { AccountRestrictionsInfoDTO } from '../model/accountRestrictionsInfoDTO';
import { ModelError } from '../model/modelError';

import { ObjectSerializer, Authentication, VoidAuth } from '../model/models';

let defaultBasePath = 'http://localhost:3000';

// ===============================================
// This file is autogenerated - Please do not edit
// ===============================================

export enum RestrictionAccountRoutesApiApiKeys {
}

export class RestrictionAccountRoutesApi {
    protected _basePath = defaultBasePath;
    protected defaultHeaders : any = {};
    protected _useQuerystring : boolean = false;

    protected authentications = {
        'default': <Authentication>new VoidAuth(),
    }

    constructor(basePath?: string);
    constructor(basePathOrUsername: string, password?: string, basePath?: string) {
        if (password) {
            if (basePath) {
                this.basePath = basePath;
            }
        } else {
            if (basePathOrUsername) {
                this.basePath = basePathOrUsername
            }
        }
    }

    set useQuerystring(value: boolean) {
        this._useQuerystring = value;
    }

    set basePath(basePath: string) {
        this._basePath = basePath;
    }

    get basePath() {
        return this._basePath;
    }

    public setDefaultAuthentication(auth: Authentication) {
        this.authentications.default = auth;
    }

    public setApiKey(key: RestrictionAccountRoutesApiApiKeys, value: string) {
        (this.authentications as any)[RestrictionAccountRoutesApiApiKeys[key]].apiKey = value;
    }

    /**
     * Returns the account restrictions for a given account.
     * @summary Get the account restrictions
     * @param accountId Account public key or address.
     */
    public async getAccountRestrictions (accountId: string, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{ response: http.ClientResponse; body: AccountRestrictionsInfoDTO;  }> {
        const localVarPath = this.basePath + '/restrictions/account/{accountId}'
            .replace('{' + 'accountId' + '}', encodeURIComponent(String(accountId)));
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
        let localVarFormParams: any = {};

        // verify required parameter 'accountId' is not null or undefined
        if (accountId === null || accountId === undefined) {
            throw new Error('Required parameter accountId was null or undefined when calling getAccountRestrictions.');
        }

        (<any>Object).assign(localVarHeaderParams, options.headers);

        let localVarUseFormData = false;

        let localVarRequestOptions: localVarRequest.Options = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };

        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    (<any>localVarRequestOptions).formData = localVarFormParams;
                } else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise<{ response: http.ClientResponse; body: AccountRestrictionsInfoDTO;  }>((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    } else {
                        body = ObjectSerializer.deserialize(body, "AccountRestrictionsInfoDTO");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        } else {
                            reject({ response: {
                                                 statusCode: response.statusCode,
                                                 statusMessage: response.statusMessage,
                                               }, body: response.body });
                        }
                    }
                });
            });
        });
    }
    /**
     * Returns the account restrictions for a given array of addresses.
     * @summary Get account restrictions for given array of addresses
     * @param accountIds 
     */
    public async getAccountRestrictionsFromAccounts (accountIds?: AccountIds, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{ response: http.ClientResponse; body: Array<AccountRestrictionsInfoDTO>;  }> {
        const localVarPath = this.basePath + '/restrictions/account';
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
        let localVarFormParams: any = {};

        (<any>Object).assign(localVarHeaderParams, options.headers);

        let localVarUseFormData = false;

        let localVarRequestOptions: localVarRequest.Options = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(accountIds, "AccountIds")
        };

        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    (<any>localVarRequestOptions).formData = localVarFormParams;
                } else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise<{ response: http.ClientResponse; body: Array<AccountRestrictionsInfoDTO>;  }>((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    } else {
                        body = ObjectSerializer.deserialize(body, "Array<AccountRestrictionsInfoDTO>");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        } else {
                            reject({ response: {
                                                 statusCode: response.statusCode,
                                                 statusMessage: response.statusMessage,
                                               }, body: response.body });
                        }
                    }
                });
            });
        });
    }
}
