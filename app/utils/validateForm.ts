export const isValidEmail = (email : string) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
};

export const isValidPassword = (password : string) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,}$/;
    return regex.test(password);
};

export const isValidFirstName = (firstName : string) => {
    const regex = /^[A-Za-z]{3,}$/;
    return regex.test(firstName);
}
export const isValidLastName = (lastName : string) => {
    const regex = /^[A-Za-z]{3,}$/;
    return regex.test(lastName);
}