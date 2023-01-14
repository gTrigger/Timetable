import axios from 'axios';
import Utils from "@/common/utils";
import { BusStop } from "@/common/types";

export default class ApiService {
    static async getBusStops(): Promise<BusStop[]> {
        const { data } = await axios.get<BusStop[]>(
            Utils.getAPIUrl('stops'),
        );

        return data;
    }
}
