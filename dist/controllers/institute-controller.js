import User from "../models/User.js";
export const getAllUsers = async (req, res, next) => {
    //aqui tenemos todos los usuarios
    try {
        const users = await User.find();
        //response
        return res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        console.log(error);
        //response
        return res.status(400).json({ message: "Error", cause: error.message });
    }
};
//# sourceMappingURL=institute-controller.js.map