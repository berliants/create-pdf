const express = require('express')
const app = express()
const pdf = require('html-pdf')
const options = {format:'A4'}
const fs = require('fs')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/public', express.static('public'))

app.set('view engine', 'ejs')



app.get('/', (request, response) => {
    response.render('home.ejs')
})
app.post('/', (request, response) => {
    const nomor = 123
    response.render('template_pdf.ejs', {data: 'halo'}, (err, html) => {
        pdf.create(html, options).toFile('./public/output/' + nomor + '.pdf', (err, result) => {
            if(err) console.log(err)

            const datafile = fs.readFileSync('./public/output/' + nomor + '.pdf')
            response.header('content-type', 'application/pdf')
            response.send(datafile)
        })
    })
})


app.listen(process.env.PORT || 3000, () => {
    console.log('server running!')
})