function generatePDF() {
	html2pdf()
		.from(document.getElementById('body-content'))
		.save("report.pdf");

}