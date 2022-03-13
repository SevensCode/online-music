import request from '@/utils/request';

interface requstParms {
    phone: string;
    password: string;
}

export class UserApi {
    static phoneLogin = (data: requstParms): Promise<{ name: string }> =>
        request.post('/login/cellphone', { data });
}
