import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthUserService from '@modules/users/services/AuthUserService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const authUser = container.resolve(AuthUserService);

    const { user, token } = await authUser.execute({
      email,
      password,
    });

    delete user.password;

    return res.json({ user, token });
  }
}
