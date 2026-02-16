export const emailTemplates = {
  otpVerification: (code: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
      <h2 style="color: #0056b3; text-align: center;">Verify Your Email</h2>
      <p style="font-size: 16px; color: #333;">Hello,</p>
      <p style="font-size: 16px; color: #333;">Please use the verification code below to complete your registration:</p>
      
      <div style="background-color: #f4f4f4; padding: 15px; text-align: center; border-radius: 5px; margin: 20px 0;">
        <span style="font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #333;">${code}</span>
      </div>

      <p style="font-size: 14px; color: #666;">This code will expire in 10 minutes.</p>
      <p style="font-size: 14px; color: #666;">If you didn't request this, please ignore this email.</p>
      
      <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
      <p style="font-size: 12px; color: #999; text-align: center;">&copy; ${new Date().getFullYear()} Quiz Tournament</p>
    </div>
  `,

  passwordReset: (code: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
      <h2 style="color: #d9534f; text-align: center;">Reset Your Password</h2>
      <p style="font-size: 16px; color: #333;">Hello,</p>
      <p style="font-size: 16px; color: #333;">We received a request to reset your password. Enter the code below to proceed:</p>
      
      <div style="background-color: #fff5f5; padding: 15px; text-align: center; border-radius: 5px; margin: 20px 0; border: 1px solid #ffcccc;">
        <span style="font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #d9534f;">${code}</span>
      </div>

      <p style="font-size: 14px; color: #666;">This code expires in 10 minutes.</p>
      <p style="font-size: 14px; color: #666;">If you didn't ask to change your password, <strong>please ignore this email</strong>. Your account is safe.</p>
      
      <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
      <p style="font-size: 12px; color: #999; text-align: center;">&copy; ${new Date().getFullYear()} Quiz Tournament</p>
    </div>
  `
};