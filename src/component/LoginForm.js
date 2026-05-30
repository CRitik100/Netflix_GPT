import { useEffect, useRef, useState } from "react";
import {
  nameValidation,
  emailValidation,
  passwordValidation,
} from "../utils/validation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const [signInStatus, setSignInStatus] = useState(true);
  const [errorName, setErrorName] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null);
  const emailId = useRef(null);
  const password = useRef(null);

  const validationForm = () => {
    const nameStatus = nameValidation(name.current.value);
    const emailStatus = emailValidation(emailId.current.value);
    const passwordStatus = passwordValidation(password.current.value);
    nameStatus != null ? setErrorName(nameStatus) : setErrorName(null);
    emailStatus != null ? setErrorEmail(emailStatus) : setErrorEmail(null);
    passwordStatus != null
      ? setErrorPassword(passwordStatus)
      : setErrorPassword(null);

    if (!signInStatus) {
      // For Sign up.
      if (nameStatus == null && emailStatus == null && passwordStatus == null) {
        createUserWithEmailAndPassword(
          auth,
          emailId.current.value,
          password.current.value,
        )
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;

            updateProfile(user, {
              displayName: name.current.value,
            })
              .then(() => {
                // Profile updated!
                console.log(user);
                const { uid, email, displayName } = user;
                dispatch(
                  addUser({ uid: uid, email: email, displayName: displayName }),
                );
                navigate("/browse");
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorPassword(errorCode + ": " + errorMessage);
            // ..
          });
      }
    } else {
      // For Sign in.
      if (emailStatus == null && passwordStatus == null) {
        signInWithEmailAndPassword(
          auth,
          emailId.current.value,
          password.current.value,
        )
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            navigate("/browse");
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorPassword(errorCode + ": " + errorMessage);
          });
      }
    }
  };

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white p-10 bg-black opacity-70 rounded-2xl flex flex-col justify-center items-center gap-3 transition-transform duration-500">
      <span className="text-xl font-semibold">
        Enter your info to {signInStatus ? "Sign in" : "Sign up"}
      </span>
      <form className="w-80 flex flex-col" onSubmit={(e) => e.preventDefault()}>
        <div
          className={`overflow-hidden transition-all duration-500 mb-4 p-1 ${!signInStatus ? "max-h-20 opacity-100 " : "max-h-0 opacity-0"}`}
        >
          <input
            id="userName"
            type="text"
            ref={name}
            placeholder="Enter your Name"
            className="p-4 rounded bg-gray-900 focus:outline-none focus:ring-3 focus:ring-red-600 w-full text-white placeholder-white/80"
          />
          <span
            className={`overflow-hidden transition-all duration-500 text-red-600 ${errorName != null ? "max-h-20" : "max-h-0"}`}
          >
            {errorName}
          </span>
        </div>
        <input
          id="userId"
          type="text"
          ref={emailId}
          placeholder="Email or phone number "
          className="p-4 rounded bg-gray-900 focus:outline-none focus:ring-3 focus:ring-red-600 w-full text-white placeholder-white/80"
        />
        <span
          className={`overflow-hidden transition-all duration-500 mb-4 text-red-600 ${errorEmail != null ? "max-h-20" : "max-h-0"}`}
        >
          {errorEmail}
        </span>
        <input
          id="password"
          type="password"
          ref={password}
          placeholder="Password"
          className="p-4 rounded bg-gray-900 focus:outline-none focus:ring-3 focus:ring-red-600 w-full text-white placeholder-white/80"
        />
        <span
          className={`overflow-hidden transition-all duration-500 mb-4 text-red-600 ${errorPassword != null ? "max-h-20" : "max-h-0"}`}
        >
          {errorPassword}
        </span>
        <button
          className="bg-red-700 text-white px-4 py-2 rounded cursor-pointer font-bold hover:bg-red-700"
          onClick={() => {
            validationForm();
          }}
        >
          {signInStatus ? "Sign in" : "Sign up"}
        </button>
      </form>
      <div>
        <span>
          {signInStatus ? "New to Netflix? " : "Already have the account? "}
        </span>
        <span
          className="cursor-pointer text-red-600 font-bold"
          onClick={() => {
            setSignInStatus(!signInStatus);
          }}
        >
          {signInStatus ? "Sign up" : "Sign in"}
        </span>
        <span> now.</span>
      </div>
    </div>
  );
};
export default LoginForm;
