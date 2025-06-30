"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Password = void 0;
const crypto_1 = __importDefault(require("crypto"));
class Password {
    /**
     *This function takes a plain text password and creates a salt and hash out of it.  Instead of storing
     *the plaintext password in the database, the salt and hash are stored for security
     */
    static genPasswordHash(password) {
        const salt = crypto_1.default.randomBytes(32).toString("hex");
        const genHash = crypto_1.default
            .pbkdf2Sync(password, salt, 10000, 64, "sha256")
            .toString("hex");
        return `${genHash}.${salt}`;
    }
    /**
     * This function uses the crypto library to decrypt the hash using the salt and then compares
     * the decrypted hash/salt with the password that the user provided at login
     */
    static validatePassowrd(storedPassword, password) {
        const [hashedPassword, salt] = storedPassword.split(".");
        const hashVerify = crypto_1.default
            .pbkdf2Sync(password, salt, 10000, 64, "sha256")
            .toString("hex");
        return hashVerify === hashedPassword;
    }
    // generateResetToken
    /**
     * This function generates a random token for the user to use to reset their password
     */
    static generateResetToken() {
        return crypto_1.default.randomBytes(32).toString("hex");
    }
}
exports.Password = Password;
