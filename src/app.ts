class App {
  private currentPath: string;

  constructor(homeDir: string) {
    this.currentPath = homeDir;
  }

  hello() {
    console.log(this.currentPath);
  }
}

export { App };
