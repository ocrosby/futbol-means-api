/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-spread */
/* tslint:disable */
import {
  Controller,
  ValidationService,
  FieldErrors,
  ValidateError,
  TsoaRoute,
} from 'tsoa';
import { AuthorizationsController } from './../../service-layer/controllers/authorization.controller';
import { UsersController } from '../../service-layer/controllers/UsersController';
import { expressAuthentication } from './../../business-layer/security/Authentication';
import express, { Request, Response, NextFunction } from 'express';

const models: TsoaRoute.Models = {
  IUserResponse: {
    dataType: 'refObject',
    properties: {
      id: { dataType: 'string' },
      username: { dataType: 'string' },
      firstName: { dataType: 'string' },
      lastName: { dataType: 'string' },
      email: { dataType: 'string' },
    },
  },
  IUserLoginRequest: {
    dataType: 'refObject',
    properties: {
      username: { dataType: 'string', required: true },
      password: { dataType: 'string', required: true },
    },
  },
  IMessageResponse: {
    dataType: 'refObject',
    properties: {
      success: { dataType: 'boolean', required: true },
      message: { dataType: 'string', required: true },
    },
  },
  IUserCreateRequest: {
    dataType: 'refObject',
    properties: {
      username: { dataType: 'string', required: true },
      firstName: { dataType: 'string', required: true },
      lastName: { dataType: 'string', required: true },
      password: { dataType: 'string', required: true },
      email: { dataType: 'string', required: true },
    },
  },
  IErrorResponse: {
    dataType: 'refObject',
    properties: {
      status: { dataType: 'double', required: true },
      message: { dataType: 'string', required: true },
    },
  },
  IUserUpdateRequest: {
    dataType: 'refObject',
    properties: {
      id: { dataType: 'string' },
      username: { dataType: 'string' },
      firstName: { dataType: 'string' },
      lastName: { dataType: 'string' },
      email: { dataType: 'string' },
      admin: { dataType: 'boolean' },
    },
  },
};

const validationService = new ValidationService(models);

export function RegisterRoutes(app: express.Application) {
  app.post(
    '/api/Authorizations/Login',
    function (request: Request, response: Response, next: NextFunction) {
      const args = {
        request: {
          in: 'body',
          name: 'request',
          required: true,
          ref: 'IUserLoginRequest',
        },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new AuthorizationsController();

      const promise = controller.login.apply(controller, validatedArgs as any);
      promiseHandler(controller, promise, response, next);
    }
  );

  app.post(
    '/api/Authorizations/Logout',
    function (request: Request, response: Response, next: NextFunction) {
      const args = {
        authentication: {
          in: 'header',
          name: 'x-access-token',
          required: true,
          dataType: 'string',
        },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new AuthorizationsController();

      const promise = controller.logout.apply(controller, validatedArgs as any);
      promiseHandler(controller, promise, response, next);
    }
  );

  app.post(
    '/api/Users',
    function (request: Request, response: Response, next: NextFunction) {
      const args = {
        request: {
          in: 'body',
          name: 'request',
          required: true,
          ref: 'IUserCreateRequest',
        },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new UsersController();

      const promise = controller.RegisterNewUser.apply(
        controller,
        validatedArgs as any
      );
      promiseHandler(controller, promise, response, next);
    }
  );

  app.get(
    '/api/Users/:userId',
    authenticateMiddleware([{ api_key: [] }]),
    function (request: Request, response: Response, next: NextFunction) {
      const args = {
        userId: {
          in: 'path',
          name: 'userId',
          required: true,
          dataType: 'string',
        },
        authentication: {
          in: 'header',
          name: 'x-access-token',
          required: true,
          dataType: 'string',
        },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new UsersController();

      const promise = controller.GetUserById.apply(
        controller,
        validatedArgs as any
      );
      promiseHandler(controller, promise, response, next);
    }
  );

  app.get(
    '/api/Users/username/:username',
    function (request: Request, response: Response, next: NextFunction) {
      const args = {
        username: {
          in: 'path',
          name: 'username',
          required: true,
          dataType: 'string',
        },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new UsersController();

      const promise = controller.GetUserByUsername.apply(
        controller,
        validatedArgs as any
      );
      promiseHandler(controller, promise, response, next);
    }
  );

  app.patch(
    '/api/Users',
    function (request: Request, response: Response, next: NextFunction) {
      const args = {
        request: {
          in: 'body',
          name: 'request',
          required: true,
          ref: 'IUserUpdateRequest',
        },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new UsersController();

      const promise = controller.Update.apply(controller, validatedArgs as any);
      promiseHandler(controller, promise, response, next);
    }
  );

  function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
    return (request: Request, _response: Response, next: NextFunction) => {
      let responded = 0;
      let success = false;

      const succeed = function (user: any) {
        if (!success) {
          success = true;
          responded++;
          request.params['user'] = user;
          next();
        }
      };

      const fail = function (error: any) {
        responded++;
        if (responded == security.length && !success) {
          error.status = 401;
          next(error);
        }
      };

      for (const secMethod of security) {
        if (Object.keys(secMethod).length > 1) {
          const promises: Promise<any>[] = [];

          for (const name in secMethod) {
            promises.push(
              expressAuthentication(request, name, secMethod[name])
            );
          }

          Promise.all(promises)
            .then((users) => {
              succeed(users[0]);
            })
            .catch(fail);
        } else {
          for (const name in secMethod) {
            expressAuthentication(request, name, secMethod[name])
              .then(succeed)
              .catch(fail);
          }
        }
      }
    };
  }

  function isController(object: any): object is Controller {
    return (
      'getHeaders' in object && 'getStatus' in object && 'setStatus' in object
    );
  }

  function promiseHandler(
    controllerObj: any,
    promise: any,
    response: any,
    next: any
  ) {
    return Promise.resolve(promise)
      .then((data: any) => {
        let statusCode;
        if (isController(controllerObj)) {
          const headers = controllerObj.getHeaders();
          Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
          });

          statusCode = controllerObj.getStatus();
        }

        if (data || data === false) {
          // === false allows boolean result
          response.status(statusCode || 200).json(data);
        } else {
          response.status(statusCode || 204).end();
        }
      })
      .catch((error: any) => next(error));
  }

  function getValidatedArgs(args: any, request: any): any[] {
    const fieldErrors: FieldErrors = {};

    const values = Object.keys(args).map((key) => {
      const name = args[key].name;
      const additionalProperties = args[key].additionalProperties;

      switch (args[key].in) {
        case 'request':
          return request;
        case 'query':
          return validationService.ValidateParam(
            args[key],
            request.query[name],
            name,
            fieldErrors,
            'query.',
            args[key].additionalProperties
          );
        case 'path':
          return validationService.ValidateParam(
            args[key],
            request.params[name],
            name,
            fieldErrors,
            'path.',
            args[key].additionalProperties
          );
        case 'header':
          return validationService.ValidateParam(
            args[key],
            request.header(name),
            name,
            fieldErrors,
            'header.',
            args[key].additionalProperties
          );
        case 'body':
          return validationService.ValidateParam(
            args[key],
            request.body,
            name,
            fieldErrors,
            name + '.',
            args[key].additionalProperties
          );
        case 'body-prop':
          return validationService.ValidateParam(
            args[key],
            request.body[name],
            name,
            fieldErrors,
            'body.',
            args[key].additionalProperties
          );
      }
    });

    if (Object.keys(fieldErrors).length > 0) {
      throw new ValidateError(fieldErrors, '');
    }

    return values;
  }
}
