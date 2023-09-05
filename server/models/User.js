const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
            },
            message: props => `${props.value} is not a valid email`
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Orders',
        },
    ],
    payments: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Payment'
        }
      ]

})

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
});
  
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
