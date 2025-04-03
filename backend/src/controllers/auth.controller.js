import { User } from '../models/user.model.js';
export const signup = async (req, res) => {
    const { name, email, password, phone } = req.body;

    try {
        if (!name || !name.trim()) {
            return res.status(400).json({ success: false, message: 'Name is required' });
        }
        if (!email || !email.trim()) {
            return res.status(400).json({ success: false, message: 'Email is required' });
        }
        if (!password || !password.trim()) {
            return res.status(400).json({ success: false, message: 'Password is required' });
        }
        if (!phone) {
            return res.status(400).json({ success: false, message: 'Phone is required' });
        }

        const existingUser = await User.findOne({ 
            $or: [{ email }, { phone }] 
        });

        if (existingUser) {
            if (!existingUser.isVerified) {
                
                if (existingUser.verificationTokenExpiresAt < Date.now()) {
                    await User.deleteOne({ _id: existingUser._id });
                    console.log(`Deleted unverified user: ${existingUser.email}`);
                } else {
                    return res.status(400).json({ success: false, message: "Please verify your email before signing up again." });
                }
            } else {
                return res.status(400).json({ success: false, message: "User already exists" });
            }
        }

        
        const hashedPassword = await bcryptjs.hash(password, 10);
        const generateVerificationToken = () => Math.floor(100000 + Math.random() * 900000).toString();

    
        const user = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            verificationToken: generateVerificationToken(),
            verificationTokenExpiresAt: Date.now() + 20 * 60 * 1000, // 20 minutes 
        });

        await user.save();
        res.status(201).json({ success: true, message: 'User created successfully' });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const login= (req, res) => {
    res.send('login controller');
}
export const logout = (req, res) => {
    res.send('logout controller');
}