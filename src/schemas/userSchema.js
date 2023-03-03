import joi from 'joi';

const userSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,15}$')).required(),
    confirmPassword: joi.ref('password')
});

export default userSchema;
