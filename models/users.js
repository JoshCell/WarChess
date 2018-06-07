'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
    displayName: String,
    email: { type: String, lowercase: true},
    password: { type: String, select: false },
    signupDate: { type: Date, default: Date.now() },
    lastLogin: Date
});

UserSchema.pre('save', (next) => {
    let user = this
    if (!user.isModified('password')) return next()
    
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)
        
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err)
            
            user.password = hash
            next()
        })
    })
})

module.exports = mongoose.model('User', UserSchema);