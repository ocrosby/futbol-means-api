import { fluentProvide } from 'inversify-binding-decorators'
import { type interfaces } from 'inversify'

export const provideSingleton = function <T>(
  identifier: interfaces.ServiceIdentifier<T>
): any {
  return fluentProvide(identifier).inSingletonScope().done()
}
