<div style="font-family: 'Arial', sans-serif; line-height: 1.6; background-color: #f0f4f8; margin: 0; padding: 0;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f0f4f8; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);">
                    <!-- Header with diagonal background -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #4a90e2 0%, #5cb6e4 100%); padding: 40px 40px 60px 40px; text-align: center;">
                            <img src="https://pramanit.co/logo.jpg" alt="Pramanit Logo" style="width: 70%; height: auto; display: block; margin: 0 auto 20px;">
                            <h1 style="color: #ffffff; font-size: 28px; margin: 0; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">Your OTP Code</h1>
                        </td>
                    </tr>
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 40px 20px; position: relative;">
                            <!-- OTP Box (overlapping header and content) -->
                            <div style="background-color: #ffffff; border-radius: 12px; padding: 25px; margin-top: -50px; box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1); text-align: center; margin-bottom: 30px;">
                                <p style="color: #555; font-size: 18px; margin: 0 0 15px;">Your One-Time Password is:</p>
                                <div style="background-color: #f0f4f8; border-radius: 8px; padding: 15px; display: inline-block;">
                                    <span style="font-size: 32px; font-weight: bold; color: #4a90e2; letter-spacing: 5px;">${verificationId}</span>
                                </div>
                                <p style="color: #888; font-size: 14px; margin: 15px 0 0;">This code will expire in <strong style="color: #4a90e2;">10 minutes</strong>.</p>
                            </div>
                            <p style="color: #555; font-size: 16px; margin-bottom: 20px;">Hello <strong style="color: #333;">${email}</strong>,</p>
                            <p style="color: #555; font-size: 16px; margin-bottom: 20px;">You've requested to verify your identity on Pramanit. Please use the OTP code above to complete your verification process.</p>
                            <p style="color: #555; font-size: 16px; margin-bottom: 20px;">For security reasons, please do not share this code with anyone.</p>
                        </td>
                    </tr>
                    <!-- Security Notice -->
                    <tr>
                        <td style="padding: 0 40px 40px;">
                            <div style="background-color: #f9f9f9; border-left: 4px solid #4a90e2; padding: 15px; border-radius: 4px;">
                                <p style="color: #666; font-size: 14px; margin: 0;"><strong style="color: #333;">Security Notice:</strong> If you didn't request this OTP, please ignore this email and contact our support team immediately.</p>
                            </div>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #333; color: #ffffff; padding: 30px 40px; text-align: center;">
                            <p style="margin: 0 0 10px; font-size: 14px;">© 2024 Pramanit. All rights reserved.</p>
                            <p style="margin: 0; font-size: 14px;">
                                <a href="https://pramanit.co" style="color: #5cb6e4; text-decoration: none;">Visit our website</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
   </div>



   <div style="width: 600px; height: auto; border: 1px solid #000; padding: 20px; box-sizing: border-box; position: relative;">
        <!-- Space for logo at the top -->
        <div style="height: 60px; padding:10px 10px 10px 0px ">
        <img src="https://pramanit.co/logo.jpg" alt="logo of Pramanit" style="border-radius: 15px; padding: 5px; width: 60px; height: auto;">
        </div>
                <!-- Horizontal line for separation -->
            <hr style="border: 1px solid #ccc; margin: 20px 0;">
        <div>
            <div style="font-weight: bold; font-size: 1.6em; line-height: 1.2em; margin-botton: 10px">
                <p style="margin: 0;">Heyy</p>
                <p style="margin: 0;">(${email})</p>
                <p style="margin: 0;">Your OTP is ${verificationId}</p>
            </div>

            <p>Please do not share with anybody</p>
           
        </div>
    </div>