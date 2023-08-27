import React from 'react'
import { MyButton } from '../../UI/button/MyButton';
import cl from './createPost.module.scss';
import { TextField } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useAppSelector } from '../../../hooks/redux';
import { createPost } from '../../../services/post-service';

export function CreatePost() {

    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [category, setCategory] = React.useState('');

    const {userId} = useAppSelector(state => state.authReducer);

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const handleChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    }

    const handleChangeCategory = (e: SelectChangeEvent) => {
        setCategory(e.target.value);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createPost(userId, category, title, content);
        setTitle('');
        setContent('');
        setCategory('');
    }

    return     <form action="#" method='POST' className={cl.create_post_container} onSubmit={handleSubmit}>
                    <h2 className={cl.create_post_container__title}>Напишите, чем хотите поделиться</h2>
                    {/* <label className={cl.create_post_container__text_title}>
                        Заголовок статьи
                    </label>
                    <textarea className={cl.create_post_container__text_elements} name="title" /> */}
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-helper-label">Категория</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={category}
                            label="Категория"
                            onChange={handleChangeCategory}
                            >
                            <MenuItem value="">
                                <em>Не выбрано</em>
                            </MenuItem>
                            <MenuItem value='Наука'>Наука</MenuItem>
                            <MenuItem value='Техника'>Техника</MenuItem>
                        </Select>
                </FormControl>
                    <TextField 
                    onChange={handleChangeTitle}
                    autoFocus={true} 
                    fullWidth={true}
                    value={title}
                    label="Введите заголовок статьи" 
                    margin='normal' 
                    multiline={true}
                    required={true}
                    color='secondary'
                    className={cl.create_post_container__text_elements}
                    />
                    <TextField 
                    onChange={handleChangeContent}
                    autoFocus={true} 
                    fullWidth={true} 
                    value={content}
                    label="О чем хотите написать?" 
                    margin='normal' 
                    multiline={true}
                    required={true}
                    color='secondary'
                    className={cl.create_post_container__text_elements}
                    />
                    {/* <label className={cl.create_post_container__text_title}>
                        Содержание
                    </label>
                        <textarea className={cl.create_post_container__text_elements} name="content" /> */}
                        <MyButton type='submit' buttonValue='Опубликовать' />
                </form>

}
