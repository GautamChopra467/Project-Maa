
module.exports = {
    AUTH: {
        REGISTER: "/signup",
        LOGIN: "/login",
        VERIFYEMAIL:"/verifyemail",
        VERIFYOTP:"/verifyotp",
        NEWPASSWORD:"/newpassword"
    },
    USER:{
        CHECKUSER:"/checkuser",
        GETUSER:"/getuser/:id",
        POSTDETAILS:"/postdetails/:id"
    },
    ROUTES: {
        AUTH: "/auth",
        USER:"/user"
    },
    MODELS: {
        USER: "Users",
        BABY: "Baby",
        OTP: "Otp"
    }
}