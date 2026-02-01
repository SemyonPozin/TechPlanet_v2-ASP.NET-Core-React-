import { useForm, Register } from "react-hook-form";
import styles from "./Authorization.module.css";
import { useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  updatePhoneNumber,
  PhoneAuthProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged, 
  signOut
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setAuthorized } from "./store/AuthorizedSlice";
import { useUserStatus } from "./hooks/hooks";
import { setShowLog } from "./store/logMenuSlice";
import { ref, set, getDatabase } from "firebase/database";

export default function AuthorizationForm(props) {
  const dispatch = useDispatch();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [logging, setLogging] = useState(true);  
  const [regging, setRegging] = useState(false);
  const authorized = useSelector((state) => state.authorized.authorized);
  // useUserStatus();//кастомный хук

  const showPass = () => {
    let pass = document.getElementsByName("password")[0];
    if (pass.getAttribute("type") === "text") {
      pass.setAttribute("type", "password");
    } else {
      pass.setAttribute("type", "text");
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  function close() {
    reset();
    dispatch(setShowLog(false));
  }

  async function submit(data) {
    if (!isValid) return;
    close();
    if (data.phone) {
      dispatch(//const result =  
        await userRegister(
          data.email,
          data.password,
          data.phone,
          data.username
        )
      );
    }
  }

  function logIn(data) {
    if (!isValid) return;

    // console.log(data);
    fetch(`${apiUrl}/Users/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((res) => {
      if(!res.ok) throw new Error("login failed");
      return res.text()
    }).then((token) => {
      token = token.replace(/"/g, '');
      localStorage.setItem("token", token);
      console.log(token);
      return fetch(`${apiUrl}/Users/me`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
    }).then(res =>{ 
      if(!res.ok) throw new Error("failed to load user");
      return res.json()
    }).then((userData) => {
      console.log(userData);
      dispatch(setAuthorized(userData))
    })
    .catch(error => alert(error.message));

    close();
  }

  async function logout(){
    try{
      // const res = await fetch(`${apiUrl}/Users/logout`, {
      //   credentials: "include",
      //   method: "POST"
      // });

      // if(!res.ok) throw new Error("logout failed")
      localStorage.removeItem("token");
      dispatch(setAuthorized(null))
      close();
    } catch(error){
      alert(error.message);
    }
  }

  async function userRegister(email, password, phone, username) {
  try{
    const res = await fetch(`${apiUrl}/Users/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password, phone, name: username, roleId : 1
      })
    })

    if(!res.ok)
      throw new Error("registration failed");
    logIn({password, email})
    } catch(error){
      alert(error.message);
    }
  }

  return (
    <div className={styles.abs}>
      {regging && !authorized && (
        <form className={styles.autForm} onSubmit={handleSubmit(submit)}>
          <div className={styles.absol} onClick={() => close()}>
            &#x2715;
          </div>
          <div className={styles.forInput}>
            <input
              className={styles.input}
              {...register("username", { required: "Заполните поле!" })}
              style={{
                border: errors.username
                  ? "solid red 1px"
                  : "1px solid rgb(138, 211, 230)",
              }}
              placeholder="Логин"
            ></input>
            <div className={styles.err}>{errors?.username?.message}</div>
          </div>
          <div className={styles.forInput}>
            <input
              className={styles.input}
              {...register("phone", {
                required: "Заполните поле!",
                pattern: {
                  value: /^(\+375)?(29|25|44|33|17)\d{7}$/,
                  message: "Введите корректный номер",
                },
              })}
              style={{
                border: errors.phone
                  ? "solid red 1px"
                  : "1px solid rgb(138, 211, 230)",
              }}
              placeholder="Номер телефона"
            ></input>
            <div className={styles.err}>{errors?.phone?.message}</div>
          </div>
          <div className={styles.forInput}>
            <input
              className={styles.input}
              {...register("email", {
                required: "Заполните поле!",
                pattern: {
                  value:
                    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                  message: "Введите корректную почту!",
                },
              })}
              style={{
                border: errors.email
                  ? "solid red 1px"
                  : "1px solid rgb(138, 211, 230)",
              }}
              placeholder="Эл. почта"
            ></input>
            <div className={styles.err}>{errors?.email?.message}</div>
          </div>
          <div className={styles.forInput}>
            <input
              type="password"
              className={styles.input}
              {...register("password", {
                required: "Заполните поле!",
                pattern: {
                  value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                  message:
                    "Пароль должен содежать заглавные буквы, цифры и спец. символы!",
                },
              })}
              style={{
                border: errors.password
                  ? "solid red 1px"
                  : "1px solid rgb(138, 211, 230)",
              }}
              placeholder={
                errors.password ? "Обязательно к заполнению" : "Пароль"
              }
            ></input>
            <div className={styles.err}>{errors?.password?.message}</div>
          </div>
          <div className={styles.eyeContainer}>
            <svg
              fill="gray"
              width="20px"
              height="20px"
              viewBox="0 0 20 11"
              xmlns="http://www.w3.org/2000/svg"
              style={{ paddingTop: "134px" }}
              className={styles.eye}
              onClick={() => showPass()}
            >
              <path d="M10 4.4C3.439 4.4 0 9.232 0 10c0 .766 3.439 5.6 10 5.6 6.56 0 10-4.834 10-5.6 0-.768-3.44-5.6-10-5.6zm0 9.907c-2.455 0-4.445-1.928-4.445-4.307S7.545 5.691 10 5.691s4.444 1.93 4.444 4.309-1.989 4.307-4.444 4.307zM10 10c-.407-.447.663-2.154 0-2.154-1.228 0-2.223.965-2.223 2.154s.995 2.154 2.223 2.154c1.227 0 2.223-.965 2.223-2.154 0-.547-1.877.379-2.223 0z" />
            </svg>
          </div>
          <div className={styles.forInput}>
            <input type="Submit" className={styles.submit}></input>
          </div>
        </form>
      )}

      {logging && !authorized && (
        <form className={styles.logForm} onSubmit={handleSubmit(logIn)}>
          <div className={styles.absol} onClick={() => close()}>
            &#x2715;
          </div>
          <div className={styles.forInput}>
            <input
              className={styles.input}
              {...register("email", {
                required: "Заполните поле!",
                pattern: {
                  value:
                    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                  message: "Введите корректную почту!",
                },
              })}
              style={{
                border: errors.email
                  ? "solid red 1px"
                  : "1px solid rgb(138, 211, 230)",
              }}
              placeholder="Эл. почта"
            ></input>
            <div className={styles.err}>{errors?.email?.message}</div>
          </div>
          <div className={styles.eyeContainer}>
            <svg
              fill="gray"
              width="20px"
              height="20px"
              viewBox="0 0 20 11"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.eye}
              onClick={() => showPass()}
            >
              <path d="M10 4.4C3.439 4.4 0 9.232 0 10c0 .766 3.439 5.6 10 5.6 6.56 0 10-4.834 10-5.6 0-.768-3.44-5.6-10-5.6zm0 9.907c-2.455 0-4.445-1.928-4.445-4.307S7.545 5.691 10 5.691s4.444 1.93 4.444 4.309-1.989 4.307-4.444 4.307zM10 10c-.407-.447.663-2.154 0-2.154-1.228 0-2.223.965-2.223 2.154s.995 2.154 2.223 2.154c1.227 0 2.223-.965 2.223-2.154 0-.547-1.877.379-2.223 0z" />
            </svg>
          </div>
          <div className={styles.forInput}>
            <input
              type="password"
              className={styles.input}
              {...register("password", {
                required: "Заполните поле!"
              })}
              style={{
                border: errors.password
                  ? "solid red 1px"
                  : "1px solid rgb(138, 211, 230)",
              }}
              placeholder={
                errors.password ? "Обязательно к заполнению" : "Пароль"
              }
            ></input>
            <div className={styles.err}>{errors?.password?.message}</div>
          </div>
          <div className={styles.forInput}>
            <input
              type="Submit"
              className={styles.submit}
              value={"Войти"}
            ></input>
          </div>
          <div className={styles.forLinks}>
            <div className={styles.link} style={{ paddingRight: "30px" }}>
              Забыли пароль?
            </div>
            <div
              className={styles.link}
              onClick={() => {
                reset();
                setLogging(false);
                // dispatch(setShowLog(false))
                setRegging(true);
              }}
            >
              Зарегистрироваться
            </div>
          </div>
        </form>
      )}
      {authorized && <div className={styles.quit} style={{backgroundColor: "black"}}>
      <div className={styles.absol} onClick={() => close()}>&#x2715;</div>
      <div className={styles.hello}>
        <img className={styles.userPic} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6mklexP7IGYmTrZKIdXlhd9D6PxkRV2PQvnfTYkJE82kWRam-89TfZ0mx1I_U3JCVPgQ&usqp=CAU"></img>
      </div>
        <div className={styles.hello}>{`Здравствуйте, ${authorized.name}!`}</div>  
        <div  className={styles.leave} onClick={()=>logout()}>Выйти</div>
      </div>}
    </div>
  );
}
