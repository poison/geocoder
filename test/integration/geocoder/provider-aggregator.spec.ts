import Axios, { AxiosInstance } from 'axios';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { ProviderAggregator } from '../../../src/geocoder';
import { GeocodeQueryInterface, ReverseQueryInterface } from '../../../src/interface';
import { Query } from '../../../src/model';
import { HereProvider } from '../../../src/provider';
import { plainFullFilledGeocodeQueryObject, plainFullFilledReverseQueryObject } from '../../fixture/model/query.fixture';

chai.use(chaiAsPromised);
chai.should();

describe('ProviderAggregator (integration)', () => {
    let geocoder: ProviderAggregator;
    let geocodeQueryFixture: GeocodeQueryInterface;
    let reverseQueryFixture: ReverseQueryInterface;

    beforeEach(() => {
        geocodeQueryFixture = { ...plainFullFilledGeocodeQueryObject };
        reverseQueryFixture = { ...plainFullFilledReverseQueryObject };

        const client: AxiosInstance = Axios.create();

        const provider: HereProvider = new HereProvider(client, `${process.env.HERE_APP_ID}`, `${process.env.HERE_APP_CODE}`, true);

        geocoder = new ProviderAggregator();
        geocoder.registerProvider(provider);
    });

    describe('#geocode', () => {
        it('should return expected response', async () => {
            return geocoder
                .geocode(geocodeQueryFixture)
                .should.eventually.be.an('array')
                .with.lengthOf(1);
        });
    });

    describe('#reverse', () => {
        it('should return expected response', async () => {
            return geocoder
                .reverse(reverseQueryFixture)
                .should.eventually.be.an('array')
                .with.lengthOf(Query.DEFAULT_RESULT_LIMIT);
        });
    });
});