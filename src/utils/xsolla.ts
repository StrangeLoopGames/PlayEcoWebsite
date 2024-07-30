import {PaymentSdk} from "@xsolla/pay-station-sdk";

const xsollaService = {
	init: async (token: string) => {
		await PaymentSdk.init({
			isWebview: false,
			sandbox: true,
		});
		await PaymentSdk.setToken(token);
	},
	getPaymentMethods: async () => {
		return await PaymentSdk.getRegularMethods();
	},
};

export default xsollaService;
