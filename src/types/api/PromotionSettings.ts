/* eslint-disable */
/* @ts-ignore */
/**
 * DO NOT MODIFY IT BY HAND.
 * This file was automatically generated.
 */

import { Network } from "./Network";
import { PromotionOptions } from "./PromotionOptions";
import { PromotionType } from "./enums";


export interface PromotionSettings {
    network: Network;
    options: PromotionOptions[];
    slots: number;
    type?: PromotionType;
    availableSlots: number;
}