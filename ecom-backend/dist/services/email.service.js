"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOrderConfirmationEmail = exports.sendResetEmail = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const nodemailer_1 = __importDefault(require("nodemailer"));
const types_1 = require("../types/types");
// Send reset email
const sendResetEmail = (email, resetToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resetLink = `http://localhost:5000/reset-password/${resetToken}`;
        // Create a transporter for sending emails
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.ADMIN_EMAIL_SRV,
                pass: process.env.PASS,
            },
        });
        const mailOptions = {
            from: process.env.ADMIN_EMAIL_SRV,
            to: email,
            subject: "Password Reset",
            text: `You are receiving this email because you (or someone else) has requested the reset of the password for your account.\n\n`,
            html: `<p>Click the following link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
        };
        // Send the email
        yield transporter.sendMail(mailOptions);
    }
    catch (error) {
        throw new Error("Error sending reset email");
    }
});
exports.sendResetEmail = sendResetEmail;
const sendOrderConfirmationEmail = (email, address, order, products) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Products:", products);
        // Create a transporter for sending emails
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.ADMIN_EMAIL_SRV,
                pass: process.env.PASS,
            },
        });
        let emailSubject = "";
        let emailHtml = "";
        const styles = `

    <style>
    body {
      font-family: Arial, sans-serif;
    }

    h1, h2 {
      color: #333;
    }

    table {
      border-collapse: collapse;
      width: 100%;
    }

    img {
      width: 40px;
      height: 40px;
    }

    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }

    th {
      background-color: #f2f2f2;
    }

    </style>
    `;
        // Set email content based on the order status
        switch (order.status) {
            case types_1.OrderStatus.Pending:
                emailSubject = "Order Confirmation - Pending";
                emailHtml = `<!DOCTYPE html>
          <html>
          <head>
            <style>
              ${styles}
            </style>
          </head>
          <body>
            <h1>Thank you for your order!</h1>
            <h2>Order Details</h2>
            <p>Order ID: ${order._id}</p>
            <p>Order Status: ${order.status}</p>
            
            <h2>Shipping Address</h2>
            <p>Address: ${address.street}, ${address.state}, ${address.zipCode}, ${address.country}</p>
            
            <h2>Ordered Products</h2>
            <table>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
              ${products === null || products === void 0 ? void 0 : products.map((product) => {
                    return `
                <tr>
                  <td>${product.productInDb.title}</td>
                  <td>${product.quantity}</td>
                  <td>${product.quantity} X ${product.productInDb.price} = ${product.quantity * product.productInDb.price}</td>
                </tr>`;
                })}
            </table>
            
            <h2>Order Summary</h2>
            <p>Total: ${order.totalPrice}</p>
            
            <h2>Thank you for shopping with us!</h2>
          </body>
          </html>`;
                break;
            case types_1.OrderStatus.Processing:
                // Add CSS styling for processing status
                emailSubject = "Order Confirmation - Processing";
                emailHtml = `<!DOCTYPE html>
          <html>
          <head>
            <style>
             ${styles}
            </style>
          </head>
          <body>
            <>Your order is being processed.</p>
            <h2>Shipping Address</h2>
              <p>Address: ${address.street}, ${address.state}, ${address.zipCode}, ${address.country}</p>
            <h2>Order Details</h2>
             <p>Order Status: ${order.status}</p>
            <h2>Thank you for shopping with us!</h2>
          </body>
          </html>`;
                break;
            case types_1.OrderStatus.Shipped:
                // Add CSS styling for shipped status
                emailSubject = "Order Confirmation - Shipped";
                emailHtml = `<!DOCTYPE html>
          <html>
          <head>
            <style>
            ${styles}
            </style>
          </head>
          <body>
            <h1>Your order has been shipped!</h1>
            <h2>Shipping Address</h2>
              <p>Address: ${address.street}, ${address.state}, ${address.zipCode}, ${address.country}</p>
            <h2>Order Details</h2>
             <p>Order Status: ${order.status}</p>
            <h2>Thank you for shopping with us!</h2>
          </body>
          </html>`;
                break;
            case types_1.OrderStatus.Delivered:
                // Add CSS styling for delivered status
                emailSubject = "Order Confirmation - Delivered";
                emailHtml = `<!DOCTYPE html>
          <html>
          <head>
            <style>
            ${styles}
            </style>
          </head>
          <body>
            <h1>Your order has been delivered!</h1>
            <h2>Shipping Address</h2>
              <p>Address: ${address.street}, ${address.state}, ${address.zipCode}, ${address.country}</p>
            <h2>Order Details</h2>
              <p>Order Status: ${order.status}</p>
            <h2>Thank you for shopping with us!</h2>
          </body>
          </html>`;
                break;
            case types_1.OrderStatus.Cancelled:
                // Add CSS styling for cancelled status
                emailSubject = "Order Confirmation - Cancelled";
                emailHtml = `<!DOCTYPE html>
          <html>
          <head>
            <style>
            ${styles}
            </style>
          </head>
          <body>
            <h1>Your order has been cancelled!</h1>
            <h2>Order Details</h2>
              <p>Order Status: ${order.status}</p>
            <h2>Please contact us if you have any questions.</h2>
            <h2>Here is our contact information:</h2>
             <p>Phone: 123-456-7890</p>
             <p>Email: ${process.env.ADMIN_EMAIL_SRV}</p>
            <h2>Thank you for shopping with us!</h2>
          </body>
          </html>`;
                break;
            case types_1.OrderStatus.Returned:
                // Add CSS styling for returned status
                emailSubject = "Order Confirmation - Returned";
                emailHtml = `<!DOCTYPE html>
          <html>
          <head>
            <style>
            ${styles}
            </style>
          </head>
          <body>
            <h1>Your order has been returned!</h1>
            <h2>Order Details</h2>
              <p>Order Status: ${order.status}</p>
            <h2>Please contact us if you have any questions.</h2>
            <h2>Here is our contact information:</h2>
              <p>Phone: 123-456-7890</p>
              <p>Email: ${process.env.ADMIN_EMAIL_SRV}</p>
            <h2>We will be happy to help you!</h2>
          </body>
          </html>`;
                break;
            case types_1.OrderStatus.Refunded:
                // Add CSS styling for refunded status
                emailSubject = "Order Confirmation - Refunded";
                emailHtml = `<!DOCTYPE html>
          <html>
          <head>
           <style>
           ${styles}
           </style>
          </head>
          <body>
            <h1>Your order has been refunded!</h1>
            <h2>Order Details</h2>
              <p>Order Status: ${order.status}</p>
            <h2>Please contact us if you have any questions.</h2>
            <h2>A refund will be issued to your original payment method.</h2>
            <h2>Here is our contact information:</h2>
              <p>Phone: 123-456-7890</p>
              <p>Email: ${process.env.ADMIN_EMAIL_SRV}</p>
            <h2>We will be happy to help you!</h2>
          </body>
          </html>`;
                break;
            default:
                // Add default CSS styling for other order statuses
                emailSubject = "Order Confirmation";
                emailHtml = `<!DOCTYPE html>
          <html>
          <head>
            <style>
            ${styles}
            </style>
          </head>
          <body>
            <h1>Thank you for your order!</h1>
            <h2>Shipping Address</h2>
              <p>Address: ${address.street}, ${address.state}, ${address.zipCode}, ${address.country}</p>
            <h2>Order Details</h2>
              <p>Order Status: ${order.status}</p>
            <h2>Thank you for shopping with us!</h2>
          </body>
          </html>`;
                break;
        }
        const mailOptions = {
            from: process.env.ADMIN_EMAIL_SRV,
            to: email,
            subject: emailSubject,
            html: emailHtml,
        };
        // Send the email
        yield transporter.sendMail(mailOptions);
    }
    catch (error) {
        throw new Error("Error sending order confirmation email: " + error);
    }
});
exports.sendOrderConfirmationEmail = sendOrderConfirmationEmail;
