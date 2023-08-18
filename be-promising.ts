import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA, Instruction} from './types';
import {register} from 'be-hive/register.js';
import {camelToLisp} from 'trans-render/lib/camelToLisp.js';
import { lispToCamel } from 'trans-render/lib/lispToCamel.js';

export class BePromising extends BE<AP, Actions> implements Actions{
    static override get beConfig(){
        return {
            parse: true,
            primaryProp: 'be'
        } as BEConfig;
    }

    async onBe(self: this) {
        const {be, enhancedElement} = self;
        for(const instruction of be){
            await this.doInstruction(enhancedElement, instruction);
        }
        return {
            resolved: true,
        }
    }

    async doInstruction(enhancedElement: Element, instruction: Instruction){
        switch(typeof instruction){
            case 'string':
                await (<any>enhancedElement).beEnhanced.whenResolved('be-' + instruction);
                return;
            case 'object':
                if(instruction instanceof Array){
                    for(const childInstruction of instruction){
                        await this.doInstruction(enhancedElement, childInstruction);
                    }
                }else{
                    
                    for(const key in instruction){
                        const enh = 'be-' + key;
                        const enhancement = lispToCamel(enh);
                        const val = instruction[key];
                        switch(typeof val){
                            case 'string':
                                (<any>enhancedElement).beEnhanced.by[enhancement] = val;
                                break;
                            case 'object':
                                if(Array.isArray(val)) throw 'NI';
                                Object.assign((<any>enhancedElement).beEnhanced.by[enhancement], val);
                                break;
                            default:
                                throw 'NI';
                        }
                        await (<any>enhancedElement).beEnhanced.whenResolved(enh);
                    }
                }

        }

    }

    async onResolved(self: this){
        const {enhancedElement} = self;
        await (<any>enhancedElement).beEnhanced.whenDetached('be-promising');
    }
}

export interface BePromising extends AllProps{}

const tagName = 'be-promising';
const ifWantsToBe = 'promising';
const upgrade = '*';

const xe = new XE<AP, Actions>({
    config:{
        tagName,
        propDefaults:{
            ...propDefaults,
        },
        propInfo:{
            ...propInfo,
        },
        actions: {
            onBe: 'be',
            onResolved: 'resolved'
        }
    },
    superclass: BePromising
});

register(ifWantsToBe, upgrade, tagName);