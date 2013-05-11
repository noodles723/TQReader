
app: doc page

page: html css

watch:
	watch -n 3 "jade --pretty --out ./ ./jade/*.jade -p ./jade/; scss -g ./styles/scss/main.scss:./styles/main.css ./styles/scss/widget.scss:./styles/widget.css"

html:
	jade --pretty --out ./ ./jade/*.jade -p ./jade/

css: 
	scss -g ./styles/scss/main.scss:./styles/main.css ./styles/scss/widget.scss:./styles/widget.css

doc:
	yuidoc -c yuidoc.json ./application

doc-server:
	yuidoc -c yuidoc.json --server ./application
