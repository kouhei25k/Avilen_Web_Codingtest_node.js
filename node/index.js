const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
	const endpoint = req.url;
	if (endpoint === "/start") {
		fs.readFile("./index.html", (err, data) => {
			res.writeHead(200, { "Content-Type": "text/html" });
			res.write(data);
			res.end();
		});
	}
	if (endpoint === "/api") {
		// ここに処理を記述してください。

		if (req.method == "POST") {
			var data = [];
			req.on("data", function (chunk) {
				data.push(chunk);
			});
			req.on("end", function () {
				const output_list = fizebuzz(data);
				const output_str = output_list.toString();
				res.writeHead(200);
				const output_json = {
					data: output_str,
				};
				const output_data = JSON.stringify(output_json);
				res.write(output_data);
				res.end();
			});
		}
	}
});
server.listen(8080);

function fizebuzz(data) {
	var events = Buffer.concat(data);
	var r = JSON.parse(events);
	var obj = r["obj"];
	var output_list = [];
	for (var i = 1; i <= 30; i++) {
		var output = i;

		for (var k = 0; k < obj.length; k++) {
			if (i % obj[k]["num"] === 0) {
				if (typeof output === "number") {
					output = "";
				}
				output = output + ` ${obj[k]["text"]}`;
			}
		}
		output_list.push(output);
	}

	return output_list;
}
