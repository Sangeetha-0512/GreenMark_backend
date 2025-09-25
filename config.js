const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/GreenMark').then(()=>console.log('connected!!!'));
//connect express and mongodb
