import React from "react";
import { Layout } from '../Components/Layout/Layout';
import { PostList } from "../Components/Layout/PostList/PostList";

export function MainPage() {

    // const store = setupStore();

    return    <Layout>
                    <PostList />
                </Layout>

}
