import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA, Instruction} from './types';
import {register} from 'be-hive/register.js';
import {camelToLisp} from 'trans-render/lib/camelToLisp.js';

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

    doInstruction(enhancedElement: Element, instruction: Instruction): Promise<void>{
        return new Promise<void>(resolve => {
            let eventsToWaitFor: string[] = [];
            switch(typeof instruction){
                case 'string':
                    eventsToWaitFor.push('be-decorated.' + camelToLisp(instruction) + '.resolved');
                    break;
                case 'object':
                    if(Array.isArray(instruction)){
                        throw 'be-promising.NI1'; //Not implemented
                    }
                    for(const key in instruction){
                        eventsToWaitFor.push('be-decorated.' + camelToLisp(key) + '.resolved');
                    }
                    break;
            }
            for(const key of eventsToWaitFor){
                self.addEventListener(key, e => {
                    eventsToWaitFor = eventsToWaitFor.filter(x => x !== key);
                    if(eventsToWaitFor.length === 0){
                        resolve();
                    }
                }, {once: true});
            }
            switch(typeof instruction){
                case 'string':
                    proxy.setAttribute('be-' + camelToLisp(instruction), '');
                    break;
                case 'object':
                    for(const key in instruction){
                        const val = instruction[key];
                        const ltc = 'be-' + camelToLisp(key);
                        proxy.setAttribute(ltc, JSON.stringify(val));
                    }
                    break;
            }
        });

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
            onBe: 'be'
        }
    },
    superclass: BePromising
});

register(ifWantsToBe, upgrade, tagName);