import User, {IUserDocument} from '../../../src/models/user.model'

describe('User', () => {
  it('should return fullName', () => {
    // Arrange
    const user: any = new User({
      email: 'abc',
      firstName: 'Fred',
      lastName: 'Flintstone'
    })

    // Act
    const fullName: IUserDocument = user.fullName;

    // Assert
    expect(fullName).toEqual('Fred Flintstone')
  })

  it('should return reverseName', () => {
    // Arrange
    const user: any = new User({
      email: 'abc',
      firstName: 'Fred',
      lastName: 'Flintstone'
    })

    // Act
    const fullName: IUserDocument = user.reverseName;

    // Assert
    expect(fullName).toEqual('Flintstone, Fred')
  })

})
