import {API_GATEWAY_URL} from "@/common/apiConstants";
import {BusStop} from "@/common/types";

export default class Utils {
    static compareOrder = (a: BusStop, b: BusStop) => a.order - b.order;

    static compareTime = (a: BusStop, b: BusStop) => Date.parse('1970/01/01 ' + a.time) - Date.parse('1970/01/01 ' + b.time);

    static getAPIUrl(path: string): string {
        return `${API_GATEWAY_URL}/${path}`;
    }
}
