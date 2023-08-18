import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { XE } from 'xtal-element/XE.js';
import { register } from 'be-hive/register.js';
import { lispToCamel } from 'trans-render/lib/lispToCamel.js';
export class BePromising extends BE {
    static get beConfig() {
        return {
            parse: true,
            primaryProp: 'be'
        };
    }
    async onBe(self) {
        const { be, enhancedElement } = self;
        for (const instruction of be) {
            await this.doInstruction(enhancedElement, instruction);
        }
        return {
            resolved: true,
        };
    }
    async doInstruction(enhancedElement, instruction) {
        switch (typeof instruction) {
            case 'string':
                await enhancedElement.beEnhanced.whenResolved('be-' + instruction);
                return;
            case 'object':
                if (instruction instanceof Array) {
                    for (const childInstruction of instruction) {
                        await this.doInstruction(enhancedElement, childInstruction);
                    }
                }
                else {
                    for (const key in instruction) {
                        const enh = 'be-' + key;
                        const enhancement = lispToCamel(enh);
                        Object.assign(enhancedElement.beEnhanced.by[enhancement], instruction[key]);
                        await enhancedElement.beEnhanced.whenResolved(enh);
                    }
                }
        }
    }
    async onResolved(self) {
        const { enhancedElement } = self;
        await enhancedElement.beEnhanced.whenDetached('be-promising');
    }
}
const tagName = 'be-promising';
const ifWantsToBe = 'promising';
const upgrade = '*';
const xe = new XE({
    config: {
        tagName,
        propDefaults: {
            ...propDefaults,
        },
        propInfo: {
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
