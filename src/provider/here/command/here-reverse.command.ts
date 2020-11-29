import { AxiosInstance } from 'axios';
import { ReverseCommand } from '../../../command';
import { ReverseQuery } from '../../../model';
import { HereResponseType, HereReverseQueryInterface } from '../interface';
import { HereCommonCommandMixin } from './mixin';

/**
 * @link {https://developer.here.com/documentation/geocoder/topics/resource-reverse-geocode.html}
 */
export class HereReverseCommand extends HereCommonCommandMixin(ReverseCommand)<HereReverseQueryInterface, HereResponseType> {
    constructor(httpClient: AxiosInstance, private readonly appId: string, private readonly appCode: string) {
        // @ts-ignore
        super(httpClient, appId, appCode);
    }

    static getUrl(): string {
        return 'https://reverse.geocoder.api.here.com/6.2/reversegeocode.json';
    }

    protected async buildQuery(query: ReverseQuery): Promise<HereReverseQueryInterface> {
        return {
            app_id: this.appId,
            apiKey: this.appCode,
            language: query.language,
            maxresults: query.limit,
            gen: 9,
            prox: `${query.lat},${query.lon},100`,
            mode: 'retrieveAddresses',
            additionaldata: 'Country2,true;NormalizeNames,true',
        };
    }
}
