import type { InjectionKey } from "vue";
import PocketBase from 'pocketbase';

export const pocketBaseSymbol: InjectionKey<PocketBase> = Symbol("PBClient");