import JSModel from "./JSModel";

export default class Examination extends JSModel {
    id?: number;
    name?: string;
    constructor(json: any) {
		super(json);
	}
}