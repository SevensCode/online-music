import request from '@/utils/request';

interface phoneLogin {
    phone: string;
    password: string;
}

export const phoneLogin = (data: phoneLogin) =>
    request.post('/login/cellphone', { data });
