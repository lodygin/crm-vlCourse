const app = require('./app')
const post = process.env.PORT || 5000

app.listen(post, () => console.log(`Server has been started on ${post}`))
