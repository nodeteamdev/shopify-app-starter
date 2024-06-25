import { logger } from '../lib/logger/index.mjs';

function loadRestResources({ resources, config, RestClient, }) {
    const firstResource = Object.keys(resources)[0];
    if (config.apiVersion !== resources[firstResource].apiVersion) {
        logger(config).warning(`Loading REST resources for API version ${resources[firstResource].apiVersion}, which doesn't match the default ${config.apiVersion}`);
    }
    return Object.fromEntries(Object.entries(resources).map(([name, resource]) => {
        class NewResource extends resource {
        }
        NewResource.setClassProperties({
            Client: RestClient,
            config,
        });
        Object.entries(NewResource.hasOne).map(([_attribute, klass]) => {
            klass.setClassProperties({
                Client: RestClient,
                config,
            });
        });
        Object.entries(NewResource.hasMany).map(([_attribute, klass]) => {
            klass.setClassProperties({
                Client: RestClient,
                config,
            });
        });
        Reflect.defineProperty(NewResource, 'name', {
            value: name,
        });
        return [name, NewResource];
    }));
}

export { loadRestResources };
//# sourceMappingURL=load-rest-resources.mjs.map
