import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import LinksPage from './pages/links/LinksPage';
import CreatePage from './pages/create/CreatePage';
import DetailPage from './pages/detail/DetailPage';
import AuthPage from './pages/auth/AuthPage';
import RegisterPage from './pages/register/RegisterPage';
import ChatPage from './pages/chat/ChatPage';
import GiftsPage from './pages/gifts/GiftsPage';
import GiftView from './pages/gifts/pages/GiftView/index';

export const useRoutes = isAuth => {
  if (isAuth) {
    return (
        <Switch>
            <Route path="/links" exact>
                <LinksPage />
            </Route>
            <Route path="/create" exact>
                <CreatePage />
            </Route>
            <Route path="/detail">
                <DetailPage />
            </Route>
            <Route path="/chat">
                <ChatPage />
            </Route>
            <Route path="/gifts" exact>
                <GiftsPage />
            </Route>
            <Route path="/gifts/view/:id" exact>
                <GiftView />
            </Route>
            <Redirect to="/create"/>
        </Switch>
    );
  }
  return (
    <Switch>
        <Route path="/" exact>
            <AuthPage />
        </Route>
        <Route path="/register" exact>
            <RegisterPage />
        </Route>
        <Redirect to="/"/>
    </Switch>
  );
}