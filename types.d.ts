import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';


export type Instruction = (string | {[key: string]: any});

export interface EndUserProps{
    be: Instruction[];
}
export interface VirtualProps extends EndUserProps, MinimalProxy{
    
}

export type Proxy = Element & VirtualProps;

export interface ProxyProps extends VirtualProps{
    proxy: Proxy
}

export type PP = ProxyProps;

export interface Actions{
    onBe(pp: PP): void;
}