export const usernameValidate={
    required:{
        value:true,
        message:'Please enter the username',
    },
    minLength:{
        value:6,
        message:'Username must be atleast 6 characters Long',
    },
    pattern:{
        value:/^[a-zA-Z0-9]+$/,
        message:'Username must be alphanumeric',
    },
};


export const emailValidate={
    required:{
        value:true,
        message:'Please Enter the email Address',
    },
};

export const passwordValidate={
    required:{
        value:true,
        message:'Please enter password',
    },
    minLength:{
        value:6,
        message:'Password must be at least 6 characters long',
    },
};