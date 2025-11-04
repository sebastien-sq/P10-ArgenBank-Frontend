

export const isValid = (type: "email" | "password" | "firstName" | "lastName", value: string) => {
    let regex: RegExp | null = null;
    let errorMessage: string | null = null;
    switch (type) {
        case "email":
             regex = /^\S+@\S+\.\S+$/;
             errorMessage = "Invalid email format";
             break;
        case "password":
             regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,}$/;
             errorMessage = "Password must be at least 3 characters long, contain at least one letter and one number and must includes only letters and numbers.";
             break;
        case "firstName":
             regex = /^[A-Za-z]{3,}$/;
             errorMessage = "First name must be at least 3 characters long and contains only letters.";
             break;
        case "lastName":
             regex = /^[A-Za-z]{3,}$/;
             errorMessage = "Last name must be at least 3 characters long and contains only letters.";
             break;
    }
    if(regex?.test(value) ?? false) {
        return { isValid: true , errorMessage: null };
    } else {
        return { isValid: false , errorMessage: errorMessage };
    }
};