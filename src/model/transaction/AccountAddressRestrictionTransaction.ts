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

import {
    AccountAddressRestrictionTransactionBuilder,
    AmountDto,
    EmbeddedAccountAddressRestrictionTransactionBuilder,
    EmbeddedTransactionBuilder,
    KeyDto,
    SignatureDto,
    TimestampDto,
    UnresolvedAddressDto,
} from 'catbuffer';
import { Convert } from '../../core/format';
import { DtoMapping } from '../../core/utils/DtoMapping';
import { UnresolvedMapping } from '../../core/utils/UnresolvedMapping';
import { Address } from '../account/Address';
import { PublicAccount } from '../account/PublicAccount';
import { NetworkType } from '../blockchain/NetworkType';
import { NamespaceId } from '../namespace/NamespaceId';
import { Statement } from '../receipt/Statement';
import { AccountRestrictionFlags } from '../restriction/AccountRestrictionType';
import { UInt64 } from '../UInt64';
import { Deadline } from './Deadline';
import { Transaction } from './Transaction';
import { TransactionInfo } from './TransactionInfo';
import { TransactionType } from './TransactionType';
import { TransactionVersion } from './TransactionVersion';

export class AccountAddressRestrictionTransaction extends Transaction {

    /**
     * Create a modify account address restriction transaction object
     * @param deadline - The deadline to include the transaction.
     * @param restrictionFlags - The account restriction flags.
     * @param restrictionAdditions - Account restriction additions.
     * @param restrictionDeletions - Account restriction deletions.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @returns {AccountAddressRestrictionTransaction}
     */
    public static create(deadline: Deadline,
                         restrictionFlags: AccountRestrictionFlags,
                         restrictionAdditions: Array<Address | NamespaceId>,
                         restrictionDeletions: Array<Address | NamespaceId>,
                         networkType: NetworkType,
                         maxFee: UInt64 = new UInt64([0, 0])): AccountAddressRestrictionTransaction {
        return new AccountAddressRestrictionTransaction(networkType,
            TransactionVersion.ACCOUNT_ADDRESS_RESTRICTION,
            deadline,
            maxFee,
            restrictionFlags,
            restrictionAdditions,
            restrictionDeletions);
    }

    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param restrictionFlags
     * @param restrictionAdditions
     * @param restrictionDeletions
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType: NetworkType,
                version: number,
                deadline: Deadline,
                maxFee: UInt64,
                public readonly restrictionFlags: AccountRestrictionFlags,
                public readonly restrictionAdditions: Array<Address | NamespaceId>,
                public readonly restrictionDeletions: Array<Address | NamespaceId>,
                signature?: string,
                signer?: PublicAccount,
                transactionInfo?: TransactionInfo) {
        super(TransactionType.ACCOUNT_ADDRESS_RESTRICTION,
              networkType, version, deadline, maxFee, signature, signer, transactionInfo);
    }

    /**
     * Creates a transaction from catbuffer body builders.
     * @internal
     * @param builder the body builder
     * @param networkType the preloaded network type
     * @param deadline the preloaded deadline
     * @param maxFee the preloaded max fee
     * @returns {Transaction}
     */
    public static createFromBodyBuilder(builder: AccountAddressRestrictionTransactionBuilder |
                                                 EmbeddedAccountAddressRestrictionTransactionBuilder,
                                        networkType: NetworkType,
                                        deadline: Deadline,
                                        maxFee: UInt64): Transaction {
        return AccountAddressRestrictionTransaction.create(
            deadline,
            builder.getRestrictionFlags().valueOf(),
            builder.getRestrictionAdditions().map((addition) => {
                return UnresolvedMapping.toUnresolvedAddress(Convert.uint8ToHex(addition.unresolvedAddress));
            }),
            builder.getRestrictionDeletions().map((deletion) => {
                return UnresolvedMapping.toUnresolvedAddress(Convert.uint8ToHex(deletion.unresolvedAddress));
            }),
            networkType,
            maxFee,
        );
    }

    /**
     * @override Transaction.size()
     * @description get the byte size of a AccountAddressRestrictionTransaction
     * @returns {number}
     * @memberof AccountAddressRestrictionTransaction
     */
    public get size(): number {
        const byteSize = super.size;

        // set static byte size fields
        const byteRestrictionType = 2;
        const byteAdditionCount = 1;
        const byteDeletionCount = 1;
        const byteAccountRestrictionTransactionBody_Reserved1 = 4;
        const byteRestrictionAdditions = 25 * this.restrictionAdditions.length;
        const byteRestrictionDeletions = 25 * this.restrictionDeletions.length;

        return byteSize + byteRestrictionType + byteAdditionCount + byteDeletionCount +
            byteRestrictionAdditions + byteRestrictionDeletions +
            byteAccountRestrictionTransactionBody_Reserved1;
    }

    /**
     * @internal
     * @returns {Uint8Array}
     */
    protected generateBytes(): Uint8Array {
        const signerBuffer = new Uint8Array(32);
        const signatureBuffer = new Uint8Array(64);

        const transactionBuilder = new AccountAddressRestrictionTransactionBuilder(
            new SignatureDto(signatureBuffer),
            new KeyDto(signerBuffer),
            this.versionToDTO(),
            this.networkType.valueOf(),
            TransactionType.ACCOUNT_ADDRESS_RESTRICTION.valueOf(),
            new AmountDto(this.maxFee.toDTO()),
            new TimestampDto(this.deadline.toDTO()),
            this.restrictionFlags.valueOf(),
            this.restrictionAdditions.map((addition) => {
                return new UnresolvedAddressDto(UnresolvedMapping.toUnresolvedAddressBytes(addition, this.networkType));
            }),
            this.restrictionDeletions.map((deletion) => {
                return new UnresolvedAddressDto(UnresolvedMapping.toUnresolvedAddressBytes(deletion, this.networkType));
            }),
        );
        return transactionBuilder.serialize();
    }

    /**
     * @internal
     * @returns {EmbeddedTransactionBuilder}
     */
    public toEmbeddedTransaction(): EmbeddedTransactionBuilder {
        return new EmbeddedAccountAddressRestrictionTransactionBuilder(
            new KeyDto(Convert.hexToUint8(this.signer!.publicKey)),
            this.versionToDTO(),
            this.networkType.valueOf(),
            TransactionType.ACCOUNT_ADDRESS_RESTRICTION.valueOf(),
            this.restrictionFlags.valueOf(),
            this.restrictionAdditions.map((addition) => {
                return new UnresolvedAddressDto(UnresolvedMapping.toUnresolvedAddressBytes(addition, this.networkType));
            }),
            this.restrictionDeletions.map((deletion) => {
                return new UnresolvedAddressDto(UnresolvedMapping.toUnresolvedAddressBytes(deletion, this.networkType));
            }),
        );
    }

    /**
     * @internal
     * @param statement Block receipt statement
     * @param aggregateTransactionIndex Transaction index for aggregated transaction
     * @returns {AccountAddressRestrictionTransaction}
     */
    resolveAliases(statement: Statement, aggregateTransactionIndex: number = 0): AccountAddressRestrictionTransaction {
        const transactionInfo = this.checkTransactionHeightAndIndex();
        return DtoMapping.assign(this, {
            restrictionAdditions:
                this.restrictionAdditions.map((addition) => statement.resolveAddress(addition, transactionInfo.height.toString(),
                    transactionInfo.index, aggregateTransactionIndex)),
            restrictionDeletions:
                this.restrictionDeletions.map((deletion) => statement.resolveAddress(deletion, transactionInfo.height.toString(),
                    transactionInfo.index, aggregateTransactionIndex)),
        });
    }
}
