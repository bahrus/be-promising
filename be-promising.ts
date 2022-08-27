import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {register} from "be-hive/register.js";
import {BePromisingActions, BePromisingProps, BePromisingVirtualProps, Instruction} from './types';
import {camelToLisp} from 'trans-render/lib/camelToLisp.js';

export class BePromising implements BePromisingActions{
    async onBe({be, proxy}: this){
        for(const instruction of be){
            await this.doInstruction(proxy, instruction);
        }
    }

    doInstruction(proxy: BePromisingVirtualProps & Element, instruction: Instruction): Promise<void>{
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
                proxy.addEventListener(key, e => {
                    eventsToWaitFor = eventsToWaitFor.filter(x => x !== key);
                    if(eventsToWaitFor.length === 0){
                        resolve();
                    }
                }, {once: true});
            }
            switch(typeof instruction){
                case 'string':
                    proxy.setAttribute(camelToLisp(instruction), '');
                    break;
                case 'object':
                    for(const key in instruction){
                        const val = instruction[key];
                        const ltc = camelToLisp(key);
                        proxy.setAttribute(ltc, JSON.stringify(val));
                    }
                    break;
            }
        });

    }
}

export interface BePromising extends BePromisingProps{}

const tagName = 'be-promising';

const ifWantsToBe = 'promising';

const upgrade = '*';

define<BePromisingProps & BeDecoratedProps<BePromisingProps, BePromisingActions>, BePromisingActions>({
    config:{
        tagName,
        propDefaults:{
            ifWantsToBe,
            upgrade,
            forceVisible: ['template', 'script', 'style'],
            virtualProps: ['be']
        },
        actions:{
            onBe: 'be'
        }
    },
    complexPropDefaults:{
        controller: BePromising
    }
});

register(ifWantsToBe, upgrade, tagName);