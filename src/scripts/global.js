class Global {
	constructor() {
		this.ga = new GoogleAnalytics();
		this.expired = true;
	}

	init() {
		this.ga.init();
	}
}

const global = new Global();
global.init();