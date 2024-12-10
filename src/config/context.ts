import path from "path";
import fs from "fs-extra";
import yaml from "js-yaml";
type ContextSetting = {
  environment: string;
  awsAccountName: string;
  domainName: string;
  siteSubDomain: string;
};
export class Context {
  get serviceName(): string {
    return "NestJs101";
  }
  get environment(): string {
    return this.#settings.environment;
  }
  get projectName(): string {
    return `${this.serviceName}-${this.environment}`;
  }
  get serviceNameShort(): string {
    return "NestJs101";
  }
  get projectNameShort(): string {
    return `${this.serviceNameShort}-${this.environment}`;
  }

  get awsAccount() {
    switch (this.#settings.awsAccountName) {
      case "pham-van":
        return {
          accountName: "pham-van",
          accountId: "727646477609",
          region: "ap-northeast-1",
        };
      case "phu-aws":
        return {
          accountName: "phu-aws",
          accountId: "128223905239",
          region: "ap-northeast-1",
        };
      case "test":
      return {
        accountName: "test",
        accountId: "000000000000",
        region: "ap-northeast-1",
      };
      default:
        throw new Error(
          `awsAccountName[${this.#settings.awsAccountName}] invalid.`
        );
    }
  }

  get domainName(): string {
    return this.#settings.domainName;
  }
  get siteSubDomain(): string {
    return this.#settings.siteSubDomain;
  }
  get siteDomain(): string {
    if (this.siteSubDomain.length > 0) {
      return `${this.siteSubDomain}.${this.domainName}`;
    } else {
      return `${this.domainName}`;
    }
  }

  get stackDescription() {
    return "NestJs101";
  }

  static async createContext(env: string): Promise<Context> {
    const filename = path.join(__dirname, `setting/${env}.yaml`);
    if (!(await fs.pathExists(filename))) {
      throw new Error(`khong tim thay env`);
    }
    const obj = yaml.load(await fs.readFile(filename, "utf8")) as any;
    return new Context({
      environment: obj.environment,
      awsAccountName: obj.awsAccountName,
      domainName: obj.domainName,
      siteSubDomain: obj.siteSubDomain,
    });
  }

  #settings: ContextSetting;

  constructor(settings: ContextSetting) {
    this.#settings = settings;
  }
}
