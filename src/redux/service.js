import AuthService from "../api/user/auth";

const handleUserNotAuthorized = async () => {
    await AuthService.logoutUser();
    window.location.href = "/login"
}

export {
    handleUserNotAuthorized
}