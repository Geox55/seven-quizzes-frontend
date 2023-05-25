import React, { ChangeEventHandler, useState } from "react";

import "./PasswordInput.css";

export type Props = {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  className?: string;
}

const PasswordInput = ({ onChange, value, className }: Props): JSX.Element => {
  const [isShown, setIsShown] = useState(false);

  const togglePassword = (): void => {
    setIsShown((isShown) => !isShown);
  };

  return (
    <div className="form__input_password">
      <label className="label__password" htmlFor="password">Password</label>
      <div className="password__window">
        <input className={`${className} input__password`} value={value} onChange={onChange} type={isShown ? "text" : "password"} />
        {isShown && <button className="password__icon"
                            onClick={togglePassword}></button>}
        {!isShown && <button className="password__iconIsShow"
                             onClick={togglePassword}></button>}
      </div>
    </div>
  );
};

export default PasswordInput;
