import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {register} from "be-hive/register.js";
import {Actions, PP, Proxy, VirtualProps, Instruction} from './types';
import {camelToLisp} from 'trans-render/lib/camelToLisp.js';

export class BePromising extends EventTarget implements Actions{
    async onBe({be, proxy}: PP){
        for(const instruction of be){
            await this.doInstruction(proxy, instruction);
        }
        proxy.resolved = true;
    }

    doInstruction(proxy: Proxy, instruction: Instruction): Promise<void>{
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


const tagName = 'be-promising';

const ifWantsToBe = 'promising';

const upgrade = '*';

define<VirtualProps & BeDecoratedProps<VirtualProps, Actions>, Actions>({
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