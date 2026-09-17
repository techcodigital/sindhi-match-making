import { RecaptchaVerifier, signInWithPhoneNumber, type ConfirmationResult } from 'firebase/auth';
import { firebaseAuth } from './firebase';

export class AuthService {
  private static verifier: RecaptchaVerifier | null = null;

  static async sendOtp(phone: string, elementId: string): Promise<ConfirmationResult> {
    if (!firebaseAuth) throw new Error('Firebase is not configured. Add your public keys to .env.local.');

    if (!this.verifier) {
      this.verifier = new RecaptchaVerifier(firebaseAuth, elementId, { size: 'invisible' });
    }

    return signInWithPhoneNumber(firebaseAuth, phone, this.verifier);
  }

  static clearRecaptcha() {
    this.verifier?.clear();
    this.verifier = null;
  }

  static verifyOtp = (confirmation: ConfirmationResult, code: string) => confirmation.confirm(code);
}
