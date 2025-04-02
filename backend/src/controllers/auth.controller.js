export const signup = async (req, res) => {
    const { name, email, password, phone } = req.body;

    try {
        if (!name || !name.trim()) {
            return res.status(400).send('Name is required');
        }
        if (!email || !email.trim()) {
            return res.status(400).send('Email is required');
        }
        if (!password || !password.trim()) {
            return res.status(400).send('Password is required');
        }
        if (!phone) {
            return res.status(400).send('Phone is required');
        }

        const user = new User({
            name,
            email,
            password,
            phone,
        });

        await user.save();
        res.send('User created successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const login= (req, res) => {
    res.send('login controller');
}
export const logout = (req, res) => {
    res.send('logout controller');
}