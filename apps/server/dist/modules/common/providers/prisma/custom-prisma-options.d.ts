import { ModuleMetadata, Type } from '@nestjs/common';
export type PrismaClientLike = {
    $on(eventType: string, callback: () => Promise<void>): void;
    $connect(): Promise<void>;
    $disconnect(): Promise<void>;
};
export interface CustomPrismaModuleOptions<Client extends PrismaClientLike> {
    isGlobal?: boolean;
    name: string;
    client: Client;
}
export interface CustomPrismaClientFactory<Client extends PrismaClientLike> {
    createPrismaClient(): Promise<Client> | Client;
}
export interface CustomPrismaModuleAsyncOptions<Client extends PrismaClientLike> extends Pick<ModuleMetadata, 'imports'> {
    isGlobal?: boolean;
    name: string;
    useClass?: Type<CustomPrismaClientFactory<Client>>;
    useFactory?: (...args: any[]) => Promise<Client> | Client;
    inject?: any[];
}
