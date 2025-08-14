import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

export default function LoginModal({
  onClose,
  isOpen,
  onLoginModalSubmit,
  onSwitchToRegister,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const isFormValid = email && password;

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginModalSubmit({ email, password });
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      isOpen={isOpen}
      onClose={onClose}
      isButtonDisabled={!isFormValid}
      onSubmit={handleSubmit}
      modalContentClassName="modal__login-content"
      switchButton={
        <button
          type="button"
          className="modal__switch-btn"
          onClick={onSwitchToRegister}
        >
          or Sign Up
        </button>
      }
    >
      <label htmlFor="login-email" className="email__label">
        Email
        <input
          id="login-email"
          type="email"
          className="email__input"
          placeholder="Email"
          required
          minLength="5"
          maxLength="50"
          onChange={handleEmailChange}
          value={email}
        />
      </label>

      <label htmlFor="login-password" className="password__label">
        Password
        <input
          id="login-password"
          type="password"
          className="password__input"
          placeholder="Password"
          required
          minLength="5"
          maxLength="50"
          onChange={handlePasswordChange}
          value={password}
        ></input>
      </label>
    </ModalWithForm>
  );
}
