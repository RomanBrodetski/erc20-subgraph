import { BigInt } from "@graphprotocol/graph-ts"
import {Transfer} from "../generated/Contract/Contract"
import { User } from "../generated/schema"
export function handleTransfer(event: Transfer): void {
    let user = User.load(event.params.from.toHexString());

    if (user == null) {
        user = new User(event.params.from.toHexString());
        user.totalTransfers = BigInt.fromI32(0);
        user.totalAmount = BigInt.fromI32(0);
    }

    user.totalTransfers = user.totalTransfers.plus(BigInt.fromI32(1));
    user.totalAmount = user.totalAmount.plus(event.params.value);

    user.save();
}