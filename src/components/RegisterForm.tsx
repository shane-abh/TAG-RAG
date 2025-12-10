import { useState } from 'react';
import './RegisterForm.css';

interface RegisterFormProps {
  onRegister: (name: string) => Promise<void>;
  error: string | null;
}

function RegisterForm({ onRegister, error }: RegisterFormProps) {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onRegister(name.trim());
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      {/* Header Section */}
      <div className="register-header">
        <div className="emoji">🍁</div>
        <h1>Access Portal</h1>
        <p>Enter your credentials to access the Budget 2025 Navigator</p>
        <div className="access-badge">Secure Connection</div>
      </div>

      {/* Error Message */}
      {error && <div className="register-error">{error}</div>}

      {/* Registration Form */}
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="userName">Identification</label>
          <input
            id="userName"
            type="text"
            placeholder="Enter your name"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting || !name.trim()}
          className={isSubmitting ? 'loading' : ''}
        >
          {isSubmitting ? 'Initializing' : 'Enter System'}
        </button>
      </form>

      {/* Security Notice */}
      <div className="security-notice">
        Encrypted Session • Budget 2025 Database
      </div>
    </div>
  );
}

export default RegisterForm;
