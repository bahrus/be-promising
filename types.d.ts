import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';


export type Instruction = (string | {[key: string]: any});
export interface BePromisingVirtualProps extends MinimalProxy{
    be: Instruction[];
}

export interface BePromisingProps extends BePromisingVirtualProps{
    proxy: Element & BePromisingVirtualProps;
}

export interface BePromisingActions{
    onBe(self: this): void;
}