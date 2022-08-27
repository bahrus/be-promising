import {BeDecoratedProps} from 'be-decorated/types';

export interface BePromisingVirtualProps{

}

export interface BePromisingProps extends BePromisingVirtualProps{
    proxy: Element & BePromisingVirtualProps;
}

export interface BePromisingActions{}