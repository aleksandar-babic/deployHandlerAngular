export class App {
  constructor(public name: string,
              public entryPoint: string,
              public port: number,
              public status?: string,
              public userId?: string,
              public appId?: string
  ) {}
}
