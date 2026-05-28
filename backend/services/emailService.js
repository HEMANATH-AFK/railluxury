import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Since it's a test/demo, we can use an ethereal email account if no SMTP provided,
// but for production, you need real SMTP credentials.
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: process.env.SMTP_PORT || 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const emailQueue = [];

export const sendBookingConfirmationEmail = (userEmail, bookingDetails) => {
  emailQueue.push({ userEmail, bookingDetails, retryCount: 0 });
};

const processEmailQueue = async () => {
  if (emailQueue.length === 0) return;
  const task = emailQueue.shift();
  
  try {
    const { 
      passengerName, 
      source, 
      destination, 
      travelDate, 
      seatNumber, 
      ticketId, 
      status,
      transportName,
      transportNumber,
      travelClass,
      totalAmount
    } = task.bookingDetails;
    
    const mailOptions = {
      from: '"Ticketer Reservations" <reservations@ticketer.com>',
      to: task.userEmail,
      subject: `🎫 Your Ticket is Confirmed: ${transportName} (${ticketId})`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; background-color: #f4f4f7; padding: 20px;">
          <div style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <!-- Header -->
            <div style="background-color: #4F46E5; padding: 30px; text-align: center; color: white;">
              <div style="font-size: 40px; margin-bottom: 10px;">🎫</div>
              <h1 style="margin: 0; font-size: 24px; letter-spacing: 1px;">Booking Confirmed</h1>
              <p style="margin: 10px 0 0; opacity: 0.8; font-size: 14px;">Ticket ID: ${ticketId}</p>
            </div>

            <!-- Main Body -->
            <div style="padding: 30px;">
              <p style="font-size: 16px; color: #374151;">Hi <strong>${passengerName.split(',')[0]}</strong>,</p>
              <p style="font-size: 14px; color: #6b7280; line-height: 1.5;">Your reservation is successful! Pack your bags and get ready for your journey.</p>

              <!-- Journey Card -->
              <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; margin: 25px 0;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                  <div style="flex: 1;">
                    <p style="margin: 0; font-size: 12px; color: #9ca3af; font-weight: bold; text-transform: uppercase;">From</p>
                    <p style="margin: 4px 0 0; font-size: 18px; font-weight: bold; color: #111827;">${source}</p>
                  </div>
                  <div style="flex: 1; text-align: right;">
                    <p style="margin: 0; font-size: 12px; color: #9ca3af; font-weight: bold; text-transform: uppercase;">To</p>
                    <p style="margin: 4px 0 0; font-size: 18px; font-weight: bold; color: #111827;">${destination}</p>
                  </div>
                </div>

                <div style="border-top: 1px dashed #d1d5db; margin: 15px 0; padding-top: 15px;">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 4px 0; font-size: 13px; color: #6b7280;">Transport</td>
                      <td style="padding: 4px 0; font-size: 13px; color: #111827; text-align: right; font-weight: 600;">${transportName} (#${transportNumber})</td>
                    </tr>
                    <tr>
                      <td style="padding: 4px 0; font-size: 13px; color: #6b7280;">Date</td>
                      <td style="padding: 4px 0; font-size: 13px; color: #111827; text-align: right; font-weight: 600;">${travelDate}</td>
                    </tr>
                    <tr>
                      <td style="padding: 4px 0; font-size: 13px; color: #6b7280;">Class & Seats</td>
                      <td style="padding: 4px 0; font-size: 13px; color: #111827; text-align: right; font-weight: 600;">${travelClass} | ${seatNumber}</td>
                    </tr>
                  </table>
                </div>
              </div>

              <!-- Footer Details -->
              <div style="text-align: center; border-top: 1px solid #e5e7eb; padding-top: 20px;">
                <p style="margin: 0; font-size: 12px; color: #9ca3af;">Total Amount Paid</p>
                <p style="margin: 5px 0 0; font-size: 24px; font-weight: 800; color: #111827;">₹${totalAmount}</p>
              </div>
            </div>

            <div style="background-color: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #9ca3af;">
              <p style="margin: 0;">This is an automated message. Please do not reply.</p>
              <p style="margin: 5px 0 0;">&copy; 2024 Ticketer Reservation Platform</p>
            </div>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error.message);
    if (task.retryCount < 3) {
      task.retryCount++;
      emailQueue.push(task); // Retry
    } else {
      console.error('Failed to send email after 3 retries for ticket:', task.bookingDetails.ticketId);
    }
  }
};

// Process the queue every 5 seconds
setInterval(processEmailQueue, 5000);
