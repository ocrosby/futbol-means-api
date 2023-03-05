// import { IPatchOperation } from "../../../src/interfaces/patch.interface";
import { PatchOperationBuilder } from "../../../src/utils/patch";
import {IPatchOperation} from "../../../src/interfaces/patch.interface";
import {nullable} from "../../../src/types/nullable";


describe('PatchOperationBuilder', () => {
  it('should have an undefined instance initially', () => {
    const builder = new PatchOperationBuilder();

    expect(builder.getInstance()).toBeUndefined();
  })

  describe('build', () => {
    let builder: nullable<PatchOperationBuilder>;
    let operation: nullable<IPatchOperation>;

    beforeEach(() => {
      builder = new PatchOperationBuilder();
      builder.build();

      operation = builder.getInstance();
    })

    afterEach(() => {
      operation = null;
      builder = null;
    })

    it('should create an instance', () => {
      expect(operation).toBeDefined();
    })

    it('should have an undefined op', () => {
      expect(operation?.op).toBeUndefined();
    })

    it('should have an undefined path', () => {
      expect(operation?.path).toBeUndefined();
    })

    it('should have an undefined value', () => {
      expect(operation?.value).toBeUndefined();
    })

    it('should have an undefined from', () => {
      expect(operation?.from).toBeUndefined();
    })
  })

  describe('buildOpStr', () => {
    let builder: PatchOperationBuilder;

    beforeEach(() => {
      builder = new PatchOperationBuilder();
    })

    it('should throw an error when called before build()', () => {
      const t = () => builder.buildOpStr('something');

      expect(t).toThrow('The instance is undefined!')
    })

    it('should save a string operation', () => {
      // Arrange
      builder.build();

      // Act
      builder.buildOpStr('something');

      // Assert
      const operation = builder.getInstance();

      expect(operation?.op).toEqual('something')
    })
  })
})
