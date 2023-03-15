import Cookie from 'js-cookie';

const SetCookie = (cookiename, usrin) => {
    Cookie.set(cookiename, usrin, {
        expires: 1, // 1 day
        secure: true,
        sameSite: 'strict',
        path: '/'
    });
};

export default SetCookie;