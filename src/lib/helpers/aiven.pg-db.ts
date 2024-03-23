import fs from "fs";
import pg from "pg";
import url from "url";

const config = {
	user: "avnadmin",
	password: "AVNS_8wzXx8xwEjm3-q8wKDJ",
	host: "ecommerce-website-db-ecommerce-website.a.aivencloud.com",
	port: 25963,
	database: "defaultdb",
	ssl: {
		rejectUnauthorized: true,
		ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUWiGAFrm+ElV2qTPqStGELiqYxFwwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvODE2YWY4ZWItODQ4OC00MTczLWI0OWEtOWI2YWZjNDlm
ZTY3IFByb2plY3QgQ0EwHhcNMjQwMzIwMjIwOTM5WhcNMzQwMzE4MjIwOTM5WjA6
MTgwNgYDVQQDDC84MTZhZjhlYi04NDg4LTQxNzMtYjQ5YS05YjZhZmM0OWZlNjcg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAOs63vDZ
d6Ulkvej3ejLSzAgM2X86pE5SQdlF1k6cis+VaFy5U2rRKtP3+ApY5cSRXzIzkDV
wN2xPbfMhH5j6oriVJjeWspAGzdUjdSv3FaXKCfkQY4Go2EZXZQwndtpfLD08x4H
V/Z+9X915m3q/pDW1DOhsN41wch9nNvbfd37DbJI6ywETf7QeixaP+0nJoDdruzA
hPpgY/l/cyRgxqfDv9OjkM88tWMJtGIfYlzpR/CEFMnUDC6lbRpNgTkSQVE0npMw
TvgTnemgl8Z2hwXGbNDsPp4i6hRR1juP4yR4J7mzDFfpA0zqCUcHpaDfn0ov5Vyo
Q5xkW6DURpQ/c5daVqsX7QEYa17QePCH82lj8kN2oj6Y7wqKblP04O7mNHnK3v9w
rdjLWAaTON7H4cRyrri8l8EpXYsNzZKNcFoHUBvRzcoyAFD7gWsiytf5vQPFRsfB
5RdAUahxCcGMOY5soQ/aOxQeu/ftpBJcZEtd0W4Teg1k3hhbnYpkuyi6cwIDAQAB
oz8wPTAdBgNVHQ4EFgQUXilHp+inPZuVfd5U5rHALBOTNGwwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAHKXkFCDlGQbUW0x
O7AaHX85hoewqHgof25jq7qc2E0AebAYx/hAa5IknKFGtuwe10mEonaCo/WXkpXN
3TCigsAI/yf/nqAFWM+1tDJp/iC73J5KaL7tN1fcbNn+t5bkfK/vV312ldThN99d
767UF4RQhEfCEb2+1REEAl7b2yUibEeFlsANNu9yhgZin/XnTfb0D6ozD6DmWGGu
xWTm28VPKAwB/04+u+NvKvg0NI6o7iVu7hExP2QhMPU5yQs9s2N59QaOH525+hcj
qkgqcEXyrQOigRE7Fo4ygy56dvNuKI0bvXnMb1yZoBbt8emvbHHKQInMCwo6AgPT
EROCN4MjHGkQVD3EX1QuKj2J8qHPEK4kgcoAVmk4BmEXlV5tJWO5w9fvWdAyRrkP
giXNl3TUE6Iu2UJzViF5axTuIJHR7BfFV+qdZ/5d3WTOuHYP9cge7yhwF3HYv6ED
nE7pfqH4klmAaVGDgrWXvHh8l/87SGjpMV7bjxce33lQpuL4nQ==
-----END CERTIFICATE-----`,
	},
};

const client = new pg.Client(config);
client.connect((err) => {
	if (err) throw err;
	client.query("SELECT VERSION()", [], (err, result) => {
		if (err) throw err;

		console.log(result.rows[0].version);
		client.end((err) => {
			if (err) throw err;
		});
	});
});
