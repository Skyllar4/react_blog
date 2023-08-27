import React from 'react';
import '@fontsource/roboto/300.css';
import './style/App.scss';
import { checkAuth } from './services/auth-service';
import { useAppDispatch } from './hooks/redux';
import { authSlice } from './store/reducers/auth';

function App() {

  /*
      При запуске приложения проверяем наличие токена в куках, 
      если есть, то логиним пользователя
  */

  /* 
      Пишем функцию, посылаем запрос на сервер и проверяем наличие токена, если токен есть
      Даем данные пользователя с сервера, На клиенте меняем стэйт в редакс, и логиним пользователя
  */

    const {setAuth, setUsername, setUserSurname, setUserId} = authSlice.actions;
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        const fetchAuth = async () => { // Проверка наличия токена, если токен есть, логиним пользователя на клиенте
            const user = await checkAuth();
            if (user.data) {
                dispatch(setAuth(true));
                dispatch(setUserId(user.data.id));
                dispatch(setUsername(user.data.userName)); // Будет отображаться вместо кнопки входа
                dispatch(setUserSurname(user.data.userSurname));
            }
        }
        fetchAuth();
    });

  return (
      <></>
  );
}

export default App;
