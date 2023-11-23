import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/jwt.utils';

export class AuthService {
  generateToken(user) {
    console.log(JWT_SECRET,'jere');
    
    const token = sign(
      { userId: user.id, email: user.email },
      JWT_SECRET || '',
      { expiresIn: '1h' } // Token expiration time
    );
    console.log(JWT_SECRET,'-jsddsdsxdsdsdswt-');
    
    return token;
  }

  comparePasswords(inputPassword: string, storedPassword: string) {
    // Logic to compare passwords (e.g., using bcrypt)
    return inputPassword === storedPassword;
  }

}
