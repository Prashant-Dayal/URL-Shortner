import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config({ path: "./.env" });

const email = process.argv[2];

if (!email) {
  console.log("Usage: node src/scripts/makeAdmin.js <user_email>");
  process.exit(1);
}

const promoteUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const user = await User.findOneAndUpdate(
      { email: email.trim().toLowerCase() },
      { role: "admin" },
      { new: true }
    );

    if (!user) {
      console.log(`User with email "${email}" not found.`);
    } else {
      console.log(`Success! User "${user.name}" (${user.email}) is now an ADMIN.`);
    }
  } catch (error) {
    console.error("Error updating user role:", error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

promoteUser();
