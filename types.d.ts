import {BeDecoratedProps} from 'be-decorated/types';


export type Instruction = (string | {[key: string]: any});
export interface BePromisingVirtualProps{
    be: Instruction[];
}

export interface BePromisingProps extends BePromisingVirtualProps{
    proxy: Element & BePromisingVirtualProps;
}

export interface BePromisingActions{
    onBe(self: this): void;
}