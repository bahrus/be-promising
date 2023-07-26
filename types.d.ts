import { ActionOnEventConfigs } from "trans-render/froop/types";
import {IBE} from 'be-enhanced/types';


export type Instruction = (string | {[key: string]: any} | Instruction[]);

export interface EndUserProps extends IBE{
    be: Instruction[];
}
export interface AllProps extends EndUserProps{
    
}

export type AP = AllProps;

export type PAP = Partial<AP>;

export type ProPAP = Promise<PAP>;

export type POA = [PAP | undefined, ActionOnEventConfigs<PAP, Actions>];

export interface Actions{
    onBe(self: this): ProPAP;
}