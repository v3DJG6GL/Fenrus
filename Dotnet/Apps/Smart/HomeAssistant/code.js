class HomeAssistant {
    doFetch(args, template, isTest) {
        if (isTest) {
            return args.fetch({
                url: `api/`,
                timeout: 10,
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + args.properties['apikey']
                }
            });
        } else {
            return args.fetch({
                url: `api/template`,
                timeout: 10,
                method: 'POST',
                body: "{\"template\": \"" + template + "\"}",
                headers: {
                    "Accept": "text/html",
                    'Authorization': 'Bearer ' + args.properties['apikey']
                }
            });
        }
    }
    async status(args) {

        let firstTemplate = args.properties['firstStatTemplate'];
        let secondTemplate = args.properties['secStatTemplate'];

        let firstTemplateRespText = await this.doFetch(args, firstTemplate, false);
        let secondTemplateRespText = await this.doFetch(args, secondTemplate, false);

        let firstTitle = args.properties['firstStatTitle'];
        let secondTitle = args.properties['secStatTitle'];
		
        return args.liveStats([
            [firstTitle, firstTemplateRespText],
            [secondTitle, secondTemplateRespText]
        ]);
    }

    async test(args) {
        let data = await this.doFetch(args, "", true);
        return data?.message == 'API running.';
    }
}

