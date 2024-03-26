import { User } from "../../domain/models/user";
import { EventConsumer } from "../../domain/ports/eventConsumer";
import { NotificationService } from "../../domain/ports/notificationService";
import { ForgotPasswordTokenService } from "../../domain/ports/forgotPasswordService";
import { MailService, MailDataRequired } from "@sendgrid/mail/src/mail";
import crypto from "crypto";

export class MailerService implements NotificationService {
  constructor(
    private readonly sgMail: MailService,
    private readonly eventConsumer: EventConsumer,
    private readonly forgotPasswordTokenService: ForgotPasswordTokenService,
    private readonly FRONTEND_URL: string,
    private readonly SENDGRID_SENDER_EMAIL: string
  ) {}

  public async run(): Promise<void> {
    await this.eventConsumer.onForgotPassword(async(user: User) => await this.notifyUserForgotPassword(user));
  }

  async notifyUserForgotPassword(user: User): Promise<void> {
    const resetToken = crypto.randomBytes(20).toString("hex");

    const forgotPasswordPayload = {
      sub: user.id,
    };

    const forgotPasswordToken = await this.forgotPasswordTokenService.createForgotPasswordToken(forgotPasswordPayload);

    const resetPasswordLink = `${this.FRONTEND_URL}/reset-password/${resetToken}`;
    console.log("resetToken: ", resetToken);

    const options: MailDataRequired = {
      to: user.email,
      from: this.SENDGRID_SENDER_EMAIL,
      subject: "Reset your password",
      html: `
      <p>Your token to reset your password: ${forgotPasswordToken}</p>
      <p>And your link to reset your password: ${resetPasswordLink}</p>
      `,
    };

    await this.sgMail.send(options);
  }
}
