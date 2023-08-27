import React from 'react'
import Avatar from '@mui/material/Avatar';
import { MyButton } from '../UI/button/MyButton';
import cl from './profile.module.scss';
import { checkAuth } from '../../services/auth-service';
import { User } from '../../models/response/AuthResponse';
import { logout } from '../../services/auth-service';
import { useAppSelector } from '../../hooks/redux';
import { Navigate, Link } from 'react-router-dom';
import { Modal } from '../UI/modal/Modal';

export function Profile() {

    const [userData, setUserData] = React.useState<User>();
    const [modalActive, setModalActive] = React.useState(false);
    const {isAuth} = useAppSelector(state => state.authReducer);

    React.useEffect(() => {
        const fetchUser = async () => {
            const user = await checkAuth();
            if (user.data !== undefined) {
                setUserData(user.data);
            }
        }
        fetchUser();
    }, []);

    if (!isAuth) {
        return <Navigate to={'/'} />
    }

    const exit = async () => {

        await logout();
        return window.location.reload();

    }

    if (userData) {
        return  <div className={cl.profile_container}>
                <div>
                    <Avatar sx={{ bgcolor: 'orange' }} className={cl.profile_container__avatar}>
                        {userData.userName[0]}  {/* src={props.authorAvatar} alt="authorAvatar" */}
                    </Avatar>
                    <h2 className={cl.profile_container__username}>{userData.userName + ' ' + userData.userSurname}</h2>
                    <p className={cl.profile_container__info_text}>Дата регистрации: {userData.date_register}</p>
                    <p className={cl.profile_container__info_text}>Cтатей: 7</p>
                    <p className={cl.profile_container__info_text}>Комментариев: 6</p>
                </div>
                <div className={cl.profile_container__left_side_conainer}>
                    <Link to={'/createPost'}>  {/* Кнопки обернуты в div для упрощения работы с кастомными элементами */}
                        <MyButton buttonValue='Написать статью' />
                    </Link>
                    <div className={cl.profile_container__logout_btn} onClick={() => setModalActive(!modalActive)}>
                        <MyButton buttonValue='Выйти' />
                    </div>
                </div>
                <Modal active={modalActive} setActive={setModalActive}>
                        <h2>Вы Действительно хотите выйти?</h2>
                        <button onClick={() => exit()}>Да</button>
                        <button>Нет</button>
                </Modal>
            </div>
    } else {
        return <></>
    }

}
