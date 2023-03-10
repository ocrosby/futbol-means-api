import { nullable } from '../types/nullable'

import { IPatchOperation } from "../interfaces/patch.interface";

export enum PatchOperationTypes {
  Add = 'add',
  Remove = 'remove',
  Replace = 'replace',
  Move = 'move',
  Copy = 'copy',
  Test = 'test'
}

export interface IPatchOperationBuilder {
  build(): void;
  buildOpStr(type: string): void;
  buildOp(type: PatchOperationTypes): void;
  buildPath(s: string): void;
  buildFrom(s: string): void;
  buildValue(s: any): void;
  getInstance(): nullable<IPatchOperation>;
}

export class PatchOperationBuilder implements IPatchOperationBuilder {
  private instance?: IPatchOperation

  constructor() {
    this.instance = undefined;
  }

  build(): void {
    this.instance = {
      op: undefined,
      path: undefined,
      value: undefined,
      from: undefined
    }
  }

  buildOpStr(type: string): void {
    if (!this.instance) {
      throw new Error('The instance is undefined!');
    }

    this.instance.op = type;
  }

  buildOp(type: PatchOperationTypes): void {
    this.buildOpStr(type.toString())
  }

  buildPath(path: string): void {
    if (!this.instance) {
      throw new Error('The instance is undefined!');
    }

    this.instance.path = path;
  }

  buildFrom(path: string): void {
    if (!this.instance) {
      throw new Error('The instance is undefined!');
    }

    this.instance.from = path;
  }

  buildValue(value: any): void {
    if (!this.instance) {
      throw new Error('The instance is undefined!');
    }

    this.instance.value = value;
  }

  getInstance(): nullable<IPatchOperation> {
    return this.instance
  }
}

export class PatchOperationFactory {
  protected _builder: PatchOperationBuilder;

  constructor(builder: nullable<PatchOperationBuilder>) {
    if (!builder) {
      builder = new PatchOperationBuilder();
    }

    this._builder = builder;
  }

  createTest(path: string, value: string): nullable<IPatchOperation> {
    this._builder.build();
    this._builder.buildOp(PatchOperationTypes.Test);
    this._builder.buildPath(path);
    this._builder.buildValue(value);

    return this._builder.getInstance()
  }

  createRemove(path: string): nullable<IPatchOperation> {
    this._builder.build();
    this._builder.buildOp(PatchOperationTypes.Remove);
    this._builder.buildPath(path);

    return this._builder.getInstance();
  }

  createAdd(path: string, value: any): nullable<IPatchOperation> {
    this._builder.build();
    this._builder.buildOp(PatchOperationTypes.Add);
    this._builder.buildPath(path);
    this._builder.buildValue(value);

    return this._builder.getInstance()
  }

  createReplace(path: string, value: any): nullable<IPatchOperation> {
    this._builder.build();
    this._builder.buildOp(PatchOperationTypes.Replace);
    this._builder.buildPath(path);
    this._builder.buildValue(value);

    return this._builder.getInstance();
  }

  createMove(from: string, path: string): nullable<IPatchOperation> {
    this._builder.build();
    this._builder.buildOp(PatchOperationTypes.Move);
    this._builder.buildFrom(from);
    this._builder.buildPath(path);

    return this._builder.getInstance();
  }

  createCopy(from: string, path: string): nullable<IPatchOperation> {
    this._builder.build();
    this._builder.buildOp(PatchOperationTypes.Copy);
    this._builder.buildPath(path);

    return this._builder.getInstance();
  }
}
